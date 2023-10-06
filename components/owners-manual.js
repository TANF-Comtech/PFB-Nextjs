import React, { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useS3Upload } from 'next-s3-upload';

import { ownersManualModalAtom } from '~/atoms';

import { Modal } from '~/components/modal';
import { Button } from '~/components/simple-button';
import Spinner from '~/components/spinner';

const DOCUSIGN_POWERFORM_URL =
  'https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=7622cce8-6228-438b-a47f-8be66fd846b3&env=na4&acct=3bffb2a0-aa54-4f2e-80e8-7a09da3587b1&v=2';   
const STRIPE_PAYMENT_LINK_URL = 'https://buy.stripe.com/9AQ2b6gK9aZB3JedR0';

const loadingAtom = atom(false);
const stepAtom = atomWithStorage('ownersManualStep', 'ACKNOWLEDGE_REQUIREMENTS');
const notificationAtom = atomWithStorage('ownersManualNotification', false);

export const OwnersManual = () => {
  const [isOwnersManualModalOpen, setIsOwnersManualModalOpen] = useAtom(ownersManualModalAtom);

  // @TODO
  // add logic to ensure step is synchronized with Salesforce during first render

  const handleClose = useCallback(() => {
    setIsOwnersManualModalOpen(false);
  }, [setIsOwnersManualModalOpen]);

  return (
    <Modal
      show={isOwnersManualModalOpen}
      onClose={handleClose}
      className="aspect-video overflow-y-scroll"
    >
      <Debug />
      <Notice />
      <Step />
      <LoadingSpinner />
    </Modal>
  );
};

const Debug = () => {
  const [step, setStep] = useAtom(stepAtom);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="absolute left-0 top-0 z-[1000] inline-flex gap-8 p-4 !text-xs">
      <div className="inline-flex items-center gap-4">
        <button onClick={() => setStep('ACKNOWLEDGE_REQUIREMENTS')}>[requirements]</button>
        <button onClick={() => setStep('START')}>[start]</button>
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

const Notice = () => {
  const [step, setStep] = useAtom(stepAtom);

  const handleAcknowledgeRequirements = useCallback(() => {
    setStep('START');
  }, [setStep]);

  if (step !== 'ACKNOWLEDGE_REQUIREMENTS') return null;

  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center p-10">
      <div className="mx-auto w-full max-w-2xl bg-darkestGray p-10 text-white">
        <div className="text-xl font-bold">In order to complete this process you will need:</div>
        <div className="mt-5 text-lg">
          1) <span className='font-bold'>Certificate of Insurance</span> from a product liability insurance company with PeopleForBikes
          listed as additional insured party
        </div>
        <div className="mt-2 text-lg">2) A <span className='font-bold'>valid credit card</span> (We can accept checks and direct deposits but you will have to do this process manually. Contact <a href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20-%20Payment%20By%20Check%20Questions" className='underline'>Mimi</a> for further guidance.)</div>
        <div className="mt-5 flex justify-center">
          <Button label="Acknowledge Before Proceeding" size="large" onClick={handleAcknowledgeRequirements} />
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

const Step = () => {
  const step = useAtomValue(stepAtom);

  switch (step) {
    case 'ACKNOWLEDGE_REQUIREMENTS':
    case 'START':
      return <Start />;
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

const Start = () => {
  const setStep = useSetAtom(stepAtom);

  const handleStart = useCallback(() => {
    setStep('SIGN_LICENSE_AGREEMENT');
  }, [setStep]);

  return (
    <div>
      <h2 className="font-dharma text-6xl sm:text-8xl mb-5">License the Owner’s Manual</h2>
      <p className="text-base !leading-relaxed sm:text-xl mb-5">
        PeopleForBikes Owner’s Manual can be licensed by member companies for <span className='font-bold'>$4,000/year</span>. If your
        company is not a PeopleForBikes Member, the cost is <span className='font-bold'>$8,000/year</span> for non-member licenses. 
      </p>
      <p className="text-base !leading-relaxed sm:text-xl mb-5">
        If your company is not a member and would like to join PeopleForBikes before licensing the Owner's Manual, please contact <a href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20-%20Becoming%20a%20Member" className='underline'>Mimi</a> to learn how to join.
      </p>
      <div>
        <Button label="License the Owner’s Manual" size="large" onClick={handleStart} />
      </div>
    </div>
  );
};

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
        <Progress step={1} />
        <div className="mt-5 text-base !leading-relaxed sm:text-3xl mb-5">
          <span className='font-bold'>STEP 1:</span> Sign the Owner’s Manual License Agreement 
        </div>
        
        <p className="text-base !leading-relaxed sm:text-xl mb-5">
          The License Agreement has been pre-signed by PeopleForBikes' President Jenn Dice and requires your signature. We have loaded the document into Docusign, where you will add your organization and its address, as well as a signatory from your organization. After signing, you will receive the countersigned copy via email. Please contact <a href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20License%20Agreement%20Questions" className="underline text-blue-600">Mimi</a> with any questions.
        </p>
        <p className="text-base !leading-relaxed sm:text-xl mb-5">
          The 'Sign Now' button below will open a new tab with the agreement. Please complete it and come back to this tab when you are through to complete the purchase.
        </p>        
        <div className="flex gap-8 mb-5">
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
      <Progress step={2} />
      <div className="mt-5 text-base !leading-relaxed sm:text-3xl mb-5">
        <span className='font-bold'>STEP 2:</span> Upload Certificate of Insurance 
      </div>
      <p className="text-base !leading-relaxed sm:text-xl mb-5">
        You need to upload a valid Certificate of Insurance from a product liability insurance company. This certificate needs to show PeopleForBikes listed as additional insured party. 
      </p>
      <p className="text-base !leading-relaxed sm:text-xl mb-5">
        If you have questions about insurance, please reach out to <a className="underline text-blue-600" href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20Certificate%20of%20Insurance%20Question">Mimi</a> for support.
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
        <Progress step={3} />
        <div className="mt-5 text-base !leading-relaxed sm:text-3xl mb-5">
          <span className='font-bold'>STEP 3:</span> Set Up Recurring Payment  
        </div>
        <p className="text-base !leading-relaxed sm:text-xl mb-5">
          Complete the Owner's Manual Licensing process by submitting your credit card and billing information into our payment processing partner, Stripe. This will charge your card $4,000 now and this payment will reoccur every year on this date. If you have questions about the payment, please reach out to <a className="underline text-blue-600" href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20Payment%20Questions">Mimi</a> with questions.
        </p>
        <p className="text-base !leading-relaxed sm:text-xl mb-5">
          Clicking the 'Pay Now' button below will open another tab in your browser that contains the payment form for Stripe. Complete the information on that page to initiate your Owner's Manual subscription. Come back to this screen when your payment has completed.
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
      <h2 className="text-center font-dharma text-6xl sm:text-8xl mb-5">Success!</h2>
      <p className="text-base !leading-relaxed sm:text-xl mb-10">
        Thank you for your purchase. Your license is currently being processed. When approved, our membership team will reach out to you with instructions for downloading the Owner&apos;s Manual. Please contact <a href="mailto:mimi@peopleforbikes.org?subject=Owner's%20Manual%20Processing%20Questions" className="underline text-blue-600">Mimi</a> with any questions.
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

const Progress = ({ step }) => {
  const setStep = useSetAtom(stepAtom);

  return (
    <ol className="relative !m-0 inline-flex items-center gap-20 overflow-hidden font-bold text-white">
      <hr className="absolute left-0 right-0 h-0.5 bg-mediumGray" />
      <li
        onClick={() => setStep('SIGN_LICENSE_AGREEMENT')}
        className={cx(
          'relative inline-flex h-20 w-20 items-center justify-center rounded-full cursor-pointer',
          step === 1 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        1
      </li>
      <li
        onClick={() => setStep('UPLOAD_CERTIFICATE_OF_INSURANCE')}
        className={cx(
          'relative inline-flex h-20 w-20 items-center justify-center rounded-full cursor-pointer',
          step === 2 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        2
      </li>
      <li
        onClick={() => setStep('PAYMENT')}
        className={cx(
          'relative inline-flex h-20 w-20 items-center justify-center rounded-full cursor-pointer',
          step === 3 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        3
      </li>
    </ol>
  );
};
