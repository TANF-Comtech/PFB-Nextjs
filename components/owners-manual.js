import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import cx from 'classnames';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useS3Upload } from 'next-s3-upload';
import Select from 'react-select';
// import updateOwnersManualData from '~/lib/salesforce/updateOwnersManualData';
// import checkEmailInSalesforce from '~/lib/salesforce/checkEmailInSalesforce';


import { ownersManualModalAtom, corporateMembersAtom } from '~/atoms';

import { Button } from '~/components/simple-button';
import Spinner from '~/components/spinner';

// const DOCUSIGN_POWERFORM_URL =
//   'https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=7622cce8-6228-438b-a47f-8be66fd846b3&env=na4&acct=3bffb2a0-aa54-4f2e-80e8-7a09da3587b1&v=2';
const DOCUSIGN_POWERFORM_URL =
  'https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=00947782-84ab-4e28-9f94-91863bcef751&env=demo&acct=1bc6ecc2-8ac0-488d-a145-0bc9b033854f&v=2';
const STRIPE_PAYMENT_LINK_URL = 'https://buy.stripe.com/test_8wM9Dm85z9NFfVm3cc';
// const STRIPE_PAYMENT_LINK_URL = 'https://buy.stripe.com/9AQ2b6gK9aZB3JedR0';

const loadingAtom = atom(false);
const stepAtom = atomWithStorage('ownersManualStep', 'ACKNOWLEDGE_REQUIREMENTS');
const notificationAtom = atomWithStorage('ownersManualNotification', false);

// Data Storage for each step in the OM process (with Jotai atoms)
const purchaserMemberAtom = atomWithStorage('ownersManualPurchaserMember', {
  value: null,
  label: null,
});
const contactInfoAtom = atomWithStorage('ownersManualContactInfo', {
  email: '',
  name: '',
  phone: '',
});
const agreementAtom = atomWithStorage('ownersManualAgreement', {});
const insuranceAtom = atomWithStorage('ownersManualInsurance', {});
const purchaseAtom = atomWithStorage('ownersManualPurchase', {});

export const OwnersManual = () => {  
  return (
    <>
      <Debug />
      <Notice />
      <Step />
      <LoadingSpinner />
    </>
  );
};

// DEBUGGING HEADER
const Debug = () => {
  const [step, setStep] = useAtom(stepAtom);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="absolute left-0 top-0 z-[1000] inline-flex gap-8 p-4 !text-xs">
      <div className="inline-flex items-center gap-4">
        <button onClick={() => setStep('ACKNOWLEDGE_REQUIREMENTS')}>[requirements]</button>
        <button onClick={() => setStep('START')}>[start]</button>
        <button onClick={() => setStep('CONTACT_INFORMATION')}>[contact info]</button>
        <button onClick={() => setStep('SIGN_LICENSE_AGREEMENT')}>[sign agreement]</button>
        <button onClick={() => setStep('UPLOAD_CERTIFICATE_OF_INSURANCE')}>
          [upload certificate]
        </button>
        <button onClick={() => setStep('PAYMENT')}>[make payment]</button>
        <button onClick={() => setStep('PENDING')}>[pending]</button>
      </div>
      <div className="text-xs font-bold uppercase">step: {step}</div>
    </div>
  );
};

// STEP 0 - POPUP FOR DOCS
const Notice = () => {
  const [step, setStep] = useAtom(stepAtom);

  const handleAcknowledgeRequirements = useCallback(() => {
    setStep('START');
  }, [setStep]);

  if (step !== 'ACKNOWLEDGE_REQUIREMENTS') return null;

  return (
    <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center p-10">
      <div className="mx-auto w-full max-w-2xl bg-darkestGray p-10 text-white">
        <div className="text-xl font-bold">In order to complete this process you will need:</div>
        <div className="mt-5 text-lg">
          1) <span className="font-bold">Certificate of Insurance</span> from a product liability
          insurance company with PeopleForBikes listed as additional insured party
        </div>
        <div className="mt-2 text-lg">
          2) A <span className="font-bold">valid credit card</span> (We can accept checks and direct
          deposits but you will have to do this process manually. Contact{' '}
          <a
            href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20-%20Payment%20By%20Check%20Questions"
            className="underline"
          >
            Mimi
          </a>{' '}
          for further guidance.)
        </div>
        <div className="mt-5 flex justify-center">
          <Button
            label="Acknowledge Before Proceeding"
            size="large"
            onClick={handleAcknowledgeRequirements}
          />
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => {
  const isLoading = useAtomValue(loadingAtom);

  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-white">
      <Spinner bgColor="transparent" minHeight="100%" />
    </div>
  );
};

// STEPS FOR THE PROCESS
const Step = () => {
  const step = useAtomValue(stepAtom);

  switch (step) {
    case 'ACKNOWLEDGE_REQUIREMENTS':
    case 'START':
      return <Start />;
    case 'CONTACT_INFORMATION':
      return <ContactInformation />;
    case 'SIGN_LICENSE_AGREEMENT':
      return <SignLicenseAgreement />;
    case 'UPLOAD_CERTIFICATE_OF_INSURANCE':
      return <UploadCertificateOfInsurance />;
    case 'PAYMENT':
      return <Payment />;
    case 'PENDING':
      return <Pending />;
  }
};

// Styles for react-select
const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    fontWeight: 700,
    margin: '0 20px 10px 0',
    padding: '10px',
    textTransform: 'uppercase',
    minWidth: '250px',
  }),
};

// STEP 1 - MEMBER CHECK
const Start = () => {

  const setStep = useSetAtom(stepAtom);
  const [corporateMembersData] = useAtom(corporateMembersAtom);
  const corporateOption = useRef(null);

  const [purchaserMemberData, setPurchaserMemberData] = useAtom(purchaserMemberAtom);

  const handleStart = useCallback(() => {
    setStep('CONTACT_INFORMATION');
  }, [setStep]);

  const handleSelectReset = () => {
    setPurchaserMemberData(corporateMembersData[0]);
  };

  return (
    <div>
      <Progress step={10} />
      <div className="mb-5 mt-5 text-base !leading-relaxed sm:text-3xl">
        <span className="font-bold">STEP 1:</span> Member Determination
      </div>
      <p className="mb-5 text-base !leading-relaxed sm:text-xl">
        See if your organization is a PeopleForBikes member with this{' '}
        <span className="font-bold">lookup tool</span> (look through the dropdown list or start
        typing the name of your organization into this input field):
      </p>
      <Select
        aria-label="Find Your Organization"
        value={purchaserMemberData}
        onChange={(event) => setPurchaserMemberData(event)}
        options={corporateMembersData}
        ref={corporateOption}
        styles={selectStyles}
      />
      <p
        className="sm:text-md mb-5 cursor-pointer text-base !leading-relaxed underline"
        onClick={handleSelectReset}
      >
        Reset the lookup field
      </p>

      <p className="mb-5 text-base !leading-relaxed sm:text-xl">
        If your company is{' '}
        <span className="font-bold">not a member and would like to join PeopleForBikes</span> before
        licensing the Owner's Manual, please contact{' '}
        <a
          href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20-%20Becoming%20a%20Member"
          className="underline"
        >
          Mimi
        </a>{' '}
        to learn how to join.
      </p>
      <div>
        {purchaserMemberData.value !== null ? (
          <Button
            label="Continue at Member Rate of $4,000/year"
            size="small"
            onClick={handleStart}
          />
        ) : (
          <Button
            label="Continue at the Non-Member Rate of $8,000/year"
            size="small"
            onClick={handleStart}
          />
        )}
      </div>
    </div>
  );
};

// STEP 2 - CONTACT INFO
const ContactInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: contactInfo });
  const [contactInfo, setContactInfo] = useAtom(contactInfoAtom);
  const [isSaving, setIsSaving] = useState(false);
  const setStep = useSetAtom(stepAtom);

  const onSubmit = (data) => {
    setIsSaving(true);

    setContactInfo(data);

    setTimeout(() => {
      setIsSaving(false);
      setStep('SIGN_LICENSE_AGREEMENT');
    }, 2000);
  };

  // This looks back at the defaultValues array, which is connected to contactInfo
  // This is defined in the shape of the atomStorage at the top of this file (see contactInfoAtom)
  // This is confusing like everything else in programming
  useEffect(() => {
    Object.entries(contactInfo).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [contactInfo, setValue]);

  return (
    <div>
      <Progress step={20} />
      <div className="mb-5 mt-5 text-base !leading-relaxed sm:text-3xl">
        <span className="font-bold">STEP 2:</span> Contact Information
      </div>
      <p className="mb-5 text-base !leading-relaxed sm:text-xl">
        PeopleForBikes will{' '}
        <span className="font-bold">manually confirm details from this process with you</span> in
        the near future. Provide your contact information below:
      </p>
      <div className="flex flex-col">
        <label htmlFor="name">
          <span className="font-bold">First and Last Name </span>
          {errors.name && <span className="font-bold text-red">(Name is required)</span>}
        </label>
        <input
          {...register('name', { required: true })}
          placeholder="Name"
          className="mb-5 block"
        />

        <label htmlFor="name">
          <span className="font-bold">Email</span>{' '}
          {errors.email && <span className="font-bold text-red">(Email is required!)</span>}
        </label>
        <input
          {...register('email', { required: true })}
          placeholder="Email"
          className="mb-5 block"
        />

        <label htmlFor="name">
          <span className="font-bold">Phone Number, include country code if outside US </span>
          {errors.phone && <span className="font-bold text-red">(Phone number is required!)</span>}
        </label>
        <input
          {...register('phone', { required: true })}
          placeholder="Phone Number"
          className="mb-5 block"
        />

        <div
          onClick={handleSubmit(onSubmit)}
          className="w-[100%] max-w-[450px] cursor-pointer rounded-lg bg-blue px-8 py-4 text-base font-bold uppercase text-white sm:text-xl"
        >
          {isSaving ? 'Saving...' : 'Save Information and Proceed'}
        </div>
      </div>
    </div>
  );
};

// STEP 3 - AGREEMENT FOR LEGAL COMPLIANCE (DOCUSIGN)
const SignLicenseAgreement = () => {
  const [hasClickedSign, setHasClickedSign] = useState(false);
  const setStep = useSetAtom(stepAtom);
  const handleClickSign = useCallback(() => {    
    window.open(DOCUSIGN_POWERFORM_URL);
    setTimeout(() => {
      setHasClickedSign(true);
    }, 1000);
  }, []);

  return (
    <>
      <div>
        <Progress step={30} />
        <div className="mb-5 mt-5 text-base !leading-relaxed sm:text-3xl">
          <span className="font-bold">STEP 3:</span> Sign the Owner’s Manual License Agreement
        </div>

        <p className="mb-5 text-base !leading-relaxed sm:text-xl">
          The License Agreement has been pre-signed by PeopleForBikes' President Jenn Dice and
          requires your signature. We have loaded the document into Docusign, where you will add
          your organization and its address, as well as a signatory from your organization. After
          signing, you will receive the countersigned copy via email. Please contact{' '}
          <a
            href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20License%20Agreement%20Questions"
            className="text-blue-600 underline"
          >
            Mimi
          </a>{' '}
          with any questions.
        </p>
        <p className="mb-5 text-base !leading-relaxed sm:text-xl">
          The 'Sign Now' button below will open a new tab with the agreement. Please complete it and
          come back to this tab when you are through to complete the purchase.
        </p>
        <div className="mb-5 flex gap-8">
          <Button
            onClick={handleClickSign}
            label="Sign now"
            size="large"
            variant={!hasClickedSign ? 'blue' : 'lightGray'}
          />
          {hasClickedSign && (
            <Button
              onClick={() => setStep('UPLOAD_CERTIFICATE_OF_INSURANCE')}
              label="Next"
              variant="blue"
              size="large"
            />
          )}
        </div>
      </div>
    </>
  );
};

// STEP 4 - INSURANCE DOC (AWS)
const UploadCertificateOfInsurance = () => {
  const [hasClickedUpload, setHasClickedUpload] = useState(false);
  const setStep = useSetAtom(stepAtom);

  const [isUploaded, setIsUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleFileChange = useCallback(
    async (file) => {
      setIsUploaded(true);
      const { url } = await uploadToS3(file);      
      const response = await fetch('/api/salesforce-update', {
        method: 'POST',
        body: JSON.stringify({ awsUrl: url })
      });            
      setImageUrl(url);
      setHasClickedUpload(true);
    },
    [uploadToS3],
  );

  const uploadLabel = !isUploaded
    ? 'Upload certificate'
    : !hasClickedUpload
    ? 'Uploading...'
    : 'Upload complete';

  return (
    <div>
      <Progress step={40} />
      <div className="mb-5 mt-5 text-base !leading-relaxed sm:text-3xl">
        <span className="font-bold">STEP 4:</span> Upload Certificate of Insurance
      </div>
      <p className="mb-5 text-base !leading-relaxed sm:text-xl">
        You need to upload a valid Certificate of Insurance from a product liability insurance
        company. This certificate needs to show PeopleForBikes listed as additional insured party.
      </p>
      <p className="mb-5 text-base !leading-relaxed sm:text-xl">
        If you have questions about insurance, please reach out to{' '}
        <a
          className="text-blue-600 underline"
          href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20Certificate%20of%20Insurance%20Question"
        >
          Mimi
        </a>{' '}
        for support.
      </p>

      <FileInput onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="" className="mb-8 max-w-xs" />}
      <div className="flex gap-8">
        <Button
          onClick={openFileDialog}
          label={uploadLabel}
          variant={!hasClickedUpload ? 'blue' : 'lightGray'}
        />
        {hasClickedUpload && (
          <Button onClick={() => setStep('PAYMENT')} label="Next" variant="blue" size="large" />
        )}
      </div>
    </div>
  );
};

// STEP 5 - PAYMENT IN STRIPE
const Payment = () => {
  const [hasClickedPay, setHasClickedPay] = useState(false);
  const setStep = useSetAtom(stepAtom);
  const handleClickPay = useCallback(() => {
    window.open(STRIPE_PAYMENT_LINK_URL);
    setTimeout(() => {
      setHasClickedPay(true);
    }, 1000);
  }, []);

  return (
    <>
      <div>
        <Progress step={50} />
        <div className="mb-5 mt-5 text-base !leading-relaxed sm:text-3xl">
          <span className="font-bold">STEP 5:</span> Set Up Recurring Payment
        </div>
        <p className="mb-5 text-base !leading-relaxed sm:text-xl">
          Complete the Owner's Manual Licensing process by submitting your credit card and billing
          information into our payment processing partner, Stripe. This will charge your card $4,000
          now and this payment will reoccur every year on this date. If you have questions about the
          payment, please reach out to{' '}
          <a
            className="text-blue-600 underline"
            href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20Payment%20Questions"
          >
            Mimi
          </a>{' '}
          with questions.
        </p>
        <p className="mb-5 text-base !leading-relaxed sm:text-xl">
          Clicking the 'Pay Now' button below will open another tab in your browser that contains
          the payment form for Stripe. Complete the information on that page to initiate your
          Owner's Manual subscription. Come back to this screen when your payment has completed.
        </p>
        <div className="flex gap-8">
          <Button
            onClick={handleClickPay}
            label="Pay now"
            size="large"
            variant={!hasClickedPay ? 'blue' : 'lightGray'}
          />
          {hasClickedPay && (
            <Button onClick={() => setStep('PENDING')} label="Next" variant="blue" size="large" />
          )}
        </div>
      </div>
    </>
  );
};

// STEP 6 (sort of) - CONFIRMATION
const Pending = () => {
  const [hasSentNotification, setHasSentNotification] = useAtom(notificationAtom);
  const setStep = useSetAtom(stepAtom);

  const sendNotification = useCallback(async () => {
    const response = await fetch('/api/notification', {
      method: 'POST',
    });

    const result = await response.json();

    if (result.status === 'Notification sent') {
      setHasSentNotification(true);
    }
  }, [setHasSentNotification]);

  useEffect(() => {
    if (hasSentNotification) return;

    sendNotification();
  }, [hasSentNotification, sendNotification]);

  const setIsOwnersManualModalOpen = useSetAtom(ownersManualModalAtom);

  const handleClose = useCallback(() => {
    setIsOwnersManualModalOpen(false);
  }, [setIsOwnersManualModalOpen]);

  return (
    <div>
      <h2 className="mb-5 text-center font-dharma text-6xl sm:text-8xl">Success!</h2>
      <p className="mb-10 text-base !leading-relaxed sm:text-xl">
        Thank you for your purchase. Your license is currently being processed. When approved, our
        membership team will reach out to you with instructions for downloading the Owner&apos;s
        Manual. Please contact{' '}
        <a
          href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20Processing%20Questions"
          className="text-blue-600 underline"
        >
          Mimi
        </a>{' '}
        with any questions.
      </p>
      <div className="flex justify-center gap-8">
        <Button
          label="Restart"
          size="large"
          variant="lightGray"
          onClick={() => setStep('ACKNOWLEDGE_REQUIREMENTS')}
        />
        <Button label="Return to member benefits" size="large" onClick={handleClose} />
      </div>
    </div>
  );
};

// PROGRESS INDICATORS
const Progress = ({ step }) => {
  const setStep = useSetAtom(stepAtom);

  return (
    <ol className="relative !m-0 inline-flex items-center gap-20 overflow-hidden font-bold text-white">
      <hr className="absolute left-0 right-0 h-0.5 bg-mediumGray" />
      <li
        onClick={() => setStep('START')}
        className={cx(
          'relative inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-full',
          step === 10 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        1
      </li>
      <li
        onClick={() => setStep('CONTACT_INFORMATION')}
        className={cx(
          'relative inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-full',
          step === 20 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        2
      </li>
      <li
        onClick={() => setStep('SIGN_LICENSE_AGREEMENT')}
        className={cx(
          'relative inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-full',
          step === 30 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        3
      </li>
      <li
        onClick={() => setStep('UPLOAD_CERTIFICATE_OF_INSURANCE')}
        className={cx(
          'relative inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-full',
          step === 40 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        4
      </li>
      <li
        onClick={() => setStep('PAYMENT')}
        className={cx(
          'relative inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-full',
          step === 50 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        5
      </li>
    </ol>
  );
};
