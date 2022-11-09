import * as React from 'react';
import { useCallback } from 'react';
import cx from 'classnames';
import Script from 'next/script';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { ownersManualModalAtom } from '~/atoms';

import { Modal } from '~/components/modal';
import { Button } from '~/components/simple-button';
import Spinner from '~/components/spinner';

type Step =
  | 'ACKNOWLEDGE_REQUIREMENTS'
  | 'START'
  | 'SIGN_LICENSE_AGREEMENT'
  | 'UPLOAD_CERTIFICATE_OF_INSURANCE'
  | 'PAYMENT'
  | 'PENDING'
  | 'VERIFIED';

const loadingAtom = atom<boolean>(false);
const stepAtom = atomWithStorage<Step>('ownersManualStep', 'ACKNOWLEDGE_REQUIREMENTS');

export const OwnersManual = () => {
  const [isOwnersManualModalOpen, setIsOwnersManualModalOpen] = useAtom(ownersManualModalAtom);

  // @TODO
  // add logic to ensure step is synchronized with Salesforce during first render

  const handleClose = useCallback(() => {
    setIsOwnersManualModalOpen(false);
  }, [setIsOwnersManualModalOpen]);

  return (
    <Modal show={isOwnersManualModalOpen} onClose={handleClose}>
      <Notice />
      <Step />
      <LoadingSpinner />
    </Modal>
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
    case 'VERIFIED':
      return <Verified />;
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
        company is not a PeopleForBieks Member, please contact Ray keenerr at
        ray@peopleforbikes.org.
      </p>
      <div>
        <Button label="License the Owner’s Manual" size="large" onClick={handleStart} />
      </div>
    </div>
  );
};

const SignLicenseAgreement = () => {
  return (
    <>
      <div>
        <Progress step={1} />
        <div className="mt-5 text-base font-bold !leading-relaxed sm:text-3xl">STEP 1:</div>
        <p className="text-base !leading-relaxed sm:text-3xl">
          Sign the Owner’s Manual Licenes Agreement
        </p>
        <div>
          <Button label="Sign now" size="large" />
        </div>
      </div>
      {/* <Script
        data-client-id="3cde1b66-4976-4aaa-b285-cbeac6d08340"
        data-account-id="5fee3185-dbaf-4848-90f8-367c3cf0ae02"
        data-document-uri="https://raw.githubusercontent.com/docusign/code-examples-node/master/demo_documents/World_Wide_Corp_lorem.pdf"
        data-signer-email="ada@example.com"
        data-signer-name="Ada Lovelace"
        data-signhere-page-number="1"
        data-signhere-x-position="100"
        data-signhere-y-position="700"
        src="//developers.docusign.com/js/docusign.js"
        strategy="afterInteractive"
      /> */}
    </>
  );
};

const UploadCertificateOfInsurance = () => {
  return <div className="p-40">upload</div>;
};

const Payment = () => {
  return <div className="p-40">pay</div>;
};

const Pending = () => {
  return <div className="p-40">pending</div>;
};

const Verified = () => {
  return <div className="p-40">verified</div>;
};

const Progress = ({ step }) => {
  return (
    <ol className="relative !m-0 inline-flex items-center gap-20 overflow-hidden font-bold text-white">
      <hr className="absolute left-0 right-0 h-0.5 bg-mediumGray" />
      <li
        className={cx(
          'relative inline-flex h-20 w-20 items-center justify-center rounded-full',
          step === 1 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        1
      </li>
      <li
        className={cx(
          'relative inline-flex h-20 w-20 items-center justify-center rounded-full',
          step === 2 ? 'bg-blue' : 'bg-mediumGray',
        )}
      >
        2
      </li>
      <li
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
