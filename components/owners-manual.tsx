import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useS3Upload } from 'next-s3-upload';

import { ownersManualModalAtom } from '~/atoms';

import { Modal } from '~/components/modal';
import { Button } from '~/components/simple-button';
import Spinner from '~/components/spinner';

const DOCUSIGN_POWERFORM_URL =
  'https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=684d57c6-9d91-42ac-a8e7-3ad254dfde98&env=na4&acct=3bffb2a0-aa54-4f2e-80e8-7a09da3587b1&v=2';

const STRIPE_PAYMENT_LINK_URL = 'https://buy.stripe.com/fZeg1W3XnebN93y289';

type Step =
  | 'ACKNOWLEDGE_REQUIREMENTS'
  | 'START'
  | 'SIGN_LICENSE_AGREEMENT'
  | 'UPLOAD_CERTIFICATE_OF_INSURANCE'
  | 'PAYMENT'
  | 'PENDING';

const loadingAtom = atom<boolean>(false);
const stepAtom = atomWithStorage<Step>('ownersManualStep', 'ACKNOWLEDGE_REQUIREMENTS');
const notificationAtom = atomWithStorage<boolean>('ownersManualNotification', false);

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
    <div className="absolute top-0 left-0 z-[1000] inline-flex gap-8 p-4 !text-xs">
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
      <div className="mx-auto w-full max-w-2xl bg-darkestGray p-10 text-center text-white">
        <div className="text-xl font-bold">In order to complete this process you will need:</div>
        <div className="mt-5 text-lg">
          1) Certificate of Insurance from a product liability insurance company with PeopleForBikes
          listed as additional insured
        </div>
        <div className="mt-2 text-lg">2) A form of payment</div>
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleAcknowledgeRequirements}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white text-2xl font-bold text-white"
          >
            X
          </button>
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
      <h2 className="font-dharma text-6xl sm:text-8xl">License the Owner’s Manual</h2>
      <p className="text-base !leading-relaxed sm:text-3xl">
        PeopleForBikes Owner’s Manual can be licensed by member companies for $2,000/year. If your
        company is not a PeopleForBikss Member, please contact Scarlet at
        scarlet@peopleforbikes.org.
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
        <div className="mt-5 text-base font-bold !leading-relaxed sm:text-3xl">STEP 1:</div>
        <p className="text-base !leading-relaxed sm:text-3xl">
          Sign the Owner’s Manual License Agreement
        </p>
        <div className="flex gap-8">
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
    async (file: any) => {
      setIsUploaded(true);
      const { url } = await uploadToS3(file);
      setImageUrl(url as any);
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
      <div className="mt-5 text-base font-bold !leading-relaxed sm:text-3xl">STEP 2:</div>
      <p className="text-base !leading-relaxed sm:text-3xl">
        Upload Certificate of Insurance from a product liability insurance company with
        PeopleForBikes listed as additional insured
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
        <div className="mt-5 text-base font-bold !leading-relaxed sm:text-3xl">STEP 3:</div>
        <p className="text-base !leading-relaxed sm:text-3xl">
          Complete your licensing request by submitting your payment in the amount of $2,000 for the
          year. You will be redirected to Stripe.
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
      <h2 className="text-center font-dharma text-6xl sm:text-8xl">Success!</h2>
      <p className="text-center text-base !leading-relaxed sm:text-3xl">
        Thank you for your purchase. Your license is being processed. When approved our membership
        team will reach out to you with instructions for downloading the Owner’s Manual. Please
        contact Kerri Salazar at kerri@peopleforbikes.org with any questions.
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
          'relative inline-flex h-20 w-20 items-center justify-center rounded-full',
          step === 1 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        1
      </li>
      <li
        onClick={() => setStep('UPLOAD_CERTIFICATE_OF_INSURANCE')}
        className={cx(
          'relative inline-flex h-20 w-20 items-center justify-center rounded-full',
          step === 2 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        2
      </li>
      <li
        onClick={() => setStep('PAYMENT')}
        className={cx(
          'relative inline-flex h-20 w-20 items-center justify-center rounded-full',
          step === 3 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        3
      </li>
    </ol>
  );
};
