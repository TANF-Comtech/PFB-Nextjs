import React, { useCallback } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

import { loginModalAtom } from '~/atoms';
import { loggedInAtom, userAtom } from '~/lib/auth';

import { Modal } from '~/components/modal';
import { Button } from '~/components/simple-button';
import Spinner from '~/components/spinner';

const loadingAtom = atom(false);
const stepAtom = atom('EMAIL_LOGIN');
const emailAtom = atom('');
const phoneAtom = atom('');
const accessCodeAtom = atom('');
const nameAtom = atom('');
const organizationAtom = atom('');
const messageAtom = atom('');
const errorAtom = atom('');

export const Login = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useAtom(loginModalAtom);
  const setStep = useSetAtom(stepAtom);

  const handleClose = useCallback(() => {
    setIsLoginModalOpen(false);
    setTimeout(() => {
      setStep('EMAIL_LOGIN');
    }, 400);
  }, [setStep, setIsLoginModalOpen]);

  return (
    <Modal show={isLoginModalOpen} onClose={handleClose}>
      <LoadingSpinner />
      <Step />
    </Modal>
  );
};

export const LoadingSpinner = () => {
  const isLoading = useAtomValue(loadingAtom);

  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-white">
      <Spinner bgColor="transparent" minHeight="100%" />
    </div>
  );
};

export const Step = () => {
  const step = useAtomValue(stepAtom);

  switch (step) {
    case 'EMAIL_LOGIN':
      return <EmailLogin />;
    case 'ENTER_ACCESS_CODE_FROM_EMAIL':
      return <EnterAccessCodeFromEmail />;
    case 'PHONE_LOGIN':
      return <PhoneLogin />;
    case 'ENTER_ACCESS_CODE_FROM_SMS':
      return <EnterAccessCodeFromSms />;
    case 'MEMBER_LOOKUP':
      return <MemberLookup />;
    case 'MEMBER_LOOKUP_SUCCESS':
      return <MemberLookupSuccess />;
    case 'MEMBER_LOOKUP_FAILURE':
      return <MemberLookupFailure />;
    case 'TROUBLE_LOGGING_IN':
      return <TroubleLoggingIn />;
    case 'REQUEST_SUPPORT':
      return <RequestSupport />;
    case 'REQUEST_SUPPORT_SUCCESS':
      return <RequestSupportSuccess />;
    case 'ERROR':
      return <Error />;
  }
};

export const EmailLogin = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const setIsLoading = useSetAtom(loadingAtom);
  const setStep = useSetAtom(stepAtom);
  const setAccessCode = useSetAtom(accessCodeAtom);
  const setError = useSetAtom(errorAtom);

  const handleEmailAccessCode = useCallback(
    async (event) => {
      event.preventDefault();
      setIsLoading(true);

      const response = await fetch(`/api/auth/member_center/login`, {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data?.status === true) {
        setAccessCode('');
        setStep('ENTER_ACCESS_CODE_FROM_EMAIL');
        setIsLoading(false);
      } else {
        setError(data?.error);
        setStep('ERROR');
        setIsLoading(false);
      }
    },
    [email, setStep, setAccessCode, setIsLoading, setError],
  );

  const handleMemberLookup = useCallback(() => {
    setStep('MEMBER_LOOKUP');
  }, [setStep]);

  return (
    <div>
      <Headline>Corporate Member Log-in</Headline>
      <Body className="text-center">
        If you are employed by a coalition member company, enter your company email to be sent an
        access code to sign in.
      </Body>
      <form
        onSubmit={handleEmailAccessCode}
        className="mt-10 flex items-center justify-center gap-5"
      >
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          className="form-input"
          placeholder="Email Address"
          required
        />
        <Button type="submit" size="small" label="Send" />
      </form>
      <div className="flex w-full justify-center">
        <button onClick={handleMemberLookup}>
          <Body className="text-center underline">Aren't Sure If You're a Member?</Body>
        </button>
      </div>
    </div>
  );
};

export const EnterAccessCodeFromEmail = () => {
  const setIsLoginModalOpen = useSetAtom(loginModalAtom);
  const email = useAtomValue(emailAtom);
  const [accessCode, setAccessCode] = useAtom(accessCodeAtom);
  const setIsLoggedIn = useSetAtom(loggedInAtom);
  const setUser = useSetAtom(userAtom);
  const setIsLoading = useSetAtom(loadingAtom);
  const setStep = useSetAtom(stepAtom);
  const setError = useSetAtom(errorAtom);

  const router = useRouter();

  const handleValidateAccessCode = useCallback(
    async (event) => {
      event.preventDefault();
      setIsLoading(true);

      const response = await fetch(`/api/auth/member_center/login`, {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: accessCode, email }),
      });
      const data = await response.json();

      const redirect = router.query['redirect'] || '';
      const destination = !redirect ? '/members/member-home' : `/members/${redirect}`;

      if (data?.status === true) {
        setIsLoggedIn(true);
        setUser({
          email: data?.email,
          name: data?.name,
          affiliation: data?.affiliation,
        });
        setIsLoginModalOpen(false);
        setIsLoading(false);
        setTimeout(() => {
          setStep('EMAIL_LOGIN');
          router.push(destination);
        }, 400);
      } else {
        setError(data?.error);
        setStep('ERROR');
        setIsLoading(false);
      }
    },
    [
      accessCode,
      email,
      router,
      setError,
      setIsLoading,
      setIsLoggedIn,
      setIsLoginModalOpen,
      setStep,
      setUser,
    ],
  );

  const handlePhoneLogin = useCallback(() => {
    setStep('PHONE_LOGIN');
  }, [setStep]);

  const handleTroubleLoggingIn = useCallback(() => {
    setStep('TROUBLE_LOGGING_IN');
  }, [setStep]);

  return (
    <div>
      <Headline>Check Email for Access Code</Headline>
      <Body className="text-center">Input the six digit code you received via email below:</Body>
      <form onSubmit={handleValidateAccessCode} className="mt-10 flex justify-center gap-5">
        <input
          type="text"
          value={accessCode}
          onChange={(event) => setAccessCode(event.currentTarget.value)}
          className="form-input"
          placeholder="######"
          required
        />
        <Button type="submit" size="small" label="Login" />
      </form>
      <div className="text-center">
        <button onClick={handlePhoneLogin}>
          <Body className="underline">Can&apos;t find the email? Get a code texted to you.</Body>
        </button>
      </div>
      <div className="absolute -bottom-10 left-0 right-0 mt-10 flex w-full translate-y-full justify-center">
        <Button
          variant="blue"
          size="small"
          label="Trouble Logging In?"
          onClick={handleTroubleLoggingIn}
        />
      </div>
    </div>
  );
};

export const PhoneLogin = () => {
  const email = useAtomValue(emailAtom);
  const [phone, setPhone] = useAtom(phoneAtom);
  const setIsLoading = useSetAtom(loadingAtom);
  const setStep = useSetAtom(stepAtom);
  const setAccessCode = useSetAtom(accessCodeAtom);
  const setError = useSetAtom(errorAtom);

  const handleTextAccessCode = useCallback(
    async (event) => {
      event.preventDefault();
      setIsLoading(true);

      const response = await fetch(`/api/auth/member_center/login`, {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
      });
      const data = await response.json();

      if (data?.status === true) {
        setAccessCode('');
        setStep('ENTER_ACCESS_CODE_FROM_SMS');
        setIsLoading(false);
      } else {
        setError(data?.error);
        setStep('ERROR');
        setIsLoading(false);
      }
    },
    [email, phone, setError, setIsLoading, setStep, setAccessCode],
  );

  const handleMemberLookup = useCallback(() => {
    setStep('MEMBER_LOOKUP');
  }, [setStep]);

  return (
    <div>
      <Headline>Corporate Member Log-in</Headline>
      <Body className="text-center">
        If you are employed by a coalition member company, enter your phone number to be sent an
        access code to sign in.
      </Body>
      <form
        onSubmit={handleTextAccessCode}
        className="mt-10 flex items-center justify-center gap-5"
      >
        <input
          type="text"
          value={phone}
          onChange={(event) => setPhone(event.currentTarget.value)}
          className="form-input"
          placeholder="Phone Number"
          required
        />
        <Button type="submit" size="small" label="Send" />
      </form>
      <div className="absolute -bottom-10 left-0 right-0 mt-10 flex w-full translate-y-full justify-center">
        <Button
          variant="blue"
          size="small"
          label="Aren't Sure If You're a Member?"
          onClick={handleMemberLookup}
        />
      </div>
    </div>
  );
};

export const EnterAccessCodeFromSms = () => {
  const setIsLoginModalOpen = useSetAtom(loginModalAtom);
  const email = useAtomValue(emailAtom);
  const phone = useAtomValue(phoneAtom);
  const [accessCode, setAccessCode] = useAtom(accessCodeAtom);
  const setIsLoggedIn = useSetAtom(loggedInAtom);
  const setUser = useSetAtom(userAtom);
  const setIsLoading = useSetAtom(loadingAtom);
  const setStep = useSetAtom(stepAtom);
  const setError = useSetAtom(errorAtom);

  const router = useRouter();

  const handleValidateAccessCode = useCallback(
    async (event) => {
      event.preventDefault();

      setIsLoading(true);

      const response = await fetch(`/api/auth/member_center/login`, {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: accessCode, email, phone }),
      });
      const data = await response.json();

      const redirect = router.query['redirect'] || '';
      const destination = !redirect ? '/members/member-home' : `/members/${redirect}`;

      if (data?.status === true) {
        setIsLoggedIn(true);
        setUser({
          email: data?.email,
          name: data?.name,
          affiliation: data?.affiliation,
        });
        setIsLoginModalOpen(false);
        setIsLoading(false);
        setTimeout(() => {
          setStep('EMAIL_LOGIN');
          router.push(destination);
        }, 400);
      } else {
        setError(data?.error);
        setStep('ERROR');
        setIsLoading(false);
      }
    },
    [
      accessCode,
      email,
      phone,
      router,
      setError,
      setIsLoading,
      setIsLoggedIn,
      setIsLoginModalOpen,
      setStep,
      setUser,
    ],
  );

  const handleEmailLogin = useCallback(() => {
    setStep('EMAIL_LOGIN');
  }, [setStep]);

  const handleTroubleLoggingIn = useCallback(() => {
    setStep('TROUBLE_LOGGING_IN');
  }, [setStep]);

  return (
    <div>
      <Headline>Check Phone for Access Code</Headline>
      <Body className="text-center">Input the six digit code you received via text below:</Body>
      <form onSubmit={handleValidateAccessCode} className="mt-10 flex justify-center gap-5">
        <input
          type="text"
          value={accessCode}
          onChange={(event) => setAccessCode(event.currentTarget.value)}
          className="form-input"
          placeholder="######"
          required
        />
        <Button type="submit" size="small" label="Login" />
      </form>
      <div className="text-center">
        <button onClick={handleEmailLogin}>
          <Body className="underline">Can&apos;t find the text? Get a code emailed to you.</Body>
        </button>
      </div>
      <div className="absolute -bottom-10 left-0 right-0 mt-10 flex w-full translate-y-full justify-center">
        <Button
          variant="blue"
          size="small"
          label="Trouble Logging In?"
          onClick={handleTroubleLoggingIn}
        />
      </div>
    </div>
  );
};

export const MemberLookup = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const setStep = useSetAtom(stepAtom);

  const handleValidateEmail = useCallback(
    (event) => {
      event.preventDefault();

      const isEmailFound = false;

      if (isEmailFound) {
        setStep('MEMBER_LOOKUP_SUCCESS');
      } else {
        setStep('MEMBER_LOOKUP_FAILURE');
      }
    },
    [setStep],
  );

  return (
    <div>
      <Headline>See if your email is in our database</Headline>
      <form onSubmit={handleValidateEmail} className="mt-10 flex items-center justify-center gap-5">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          className="form-input"
          placeholder="Email Address"
          required
        />
        <Button type="submit" size="small" label="Send" />
      </form>
    </div>
  );
};

const MemberLookupSuccess = () => {
  const setStep = useSetAtom(stepAtom);

  const handleReturnToLogin = useCallback(() => {
    setStep('EMAIL_LOGIN');
  }, [setStep]);

  return (
    <div>
      <Headline>Success!</Headline>
      <Body className="text-center">You are in our system and ready to log-in!</Body>
      <div className="mt-10 flex justify-center">
        <Button onClick={handleReturnToLogin} size="small" label="Login Now" />
      </div>
    </div>
  );
};

export const MemberLookupFailure = () => {
  const setStep = useSetAtom(stepAtom);

  const handleRequestSupport = useCallback(() => {
    setStep('REQUEST_SUPPORT');
  }, [setStep]);

  return (
    <div>
      <Headline>Sorry.</Headline>
      <Body>
        There are a number of reasons you might not yet be a part of the PFB corporate member
        center.
      </Body>
      <Body>
        1) If your organization <Bold>recently joined</Bold> PeopleForBikes as a Corporate Member,
        your registration may not be processed just yet.
      </Body>
      <Body>
        2) If you recently added your email to your company&apos;s Corporate Member profile, it can
        take <Bold>up to 30 minutes for this to be reflected in our database</Bold>.
      </Body>
      <Body>
        3) If your organization&apos;s membership dues are <Bold>more than 1 month in arrears</Bold>
        , access for all members of your company will be temporarily suspended until dues have been
        paid.
      </Body>
      <div className="mt-10 flex justify-center">
        <Button
          onClick={handleRequestSupport}
          size="small"
          label="Contact Us for Additional Support"
        />
      </div>
    </div>
  );
};

export const TroubleLoggingIn = () => {
  const setStep = useSetAtom(stepAtom);

  const handleRequestSupport = useCallback(() => {
    setStep('REQUEST_SUPPORT');
  }, [setStep]);

  return (
    <div>
      <Headline>Sorry you&apos;re having trouble.</Headline>
      <Body>
        There are a number of reasons you might not be able to log into the PeopleForBikes Member
        Center:
      </Body>
      <Body>
        1) Most login issues are related to <Bold>corporate firewall policies</Bold> blocking
        PeopleForBike emails.{' '}
        <Bold>Please have your IT department whitelist info@peopleforbikes.org</Bold>.
      </Body>
      <Body>
        2) PeopleForBikes uses a passwordless authentication system that requires a new code for
        each session. Each session lasts for a week if you leave your browser window open.{' '}
        <Bold>You will be automatically denied access after this time</Bold>.
      </Body>
      <Body>
        3) <Bold>Each authentication code must be used within 2 hours of being issued</Bold>. It
        will be invalid after that. You can generate another code if necessary.
      </Body>
      <div className="mt-10 flex justify-center">
        <Button
          onClick={handleRequestSupport}
          size="small"
          label="Contact Us for Additional Support"
        />
      </div>
    </div>
  );
};

export const RequestSupport = () => {
  const [name, setName] = useAtom(nameAtom);
  const [organization, setOrganization] = useAtom(organizationAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [message, setMessage] = useAtom(messageAtom);
  const setStep = useSetAtom(stepAtom);

  const handleSubmitForm = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = {
        name,
        organization,
        email,
        message,
      };

      const response = await fetch('/api/support', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.status === 'Support request sent') {
        setStep('REQUEST_SUPPORT_SUCCESS');
      }
    },
    [setStep, name, organization, email, message],
  );

  return (
    <div>
      <Headline>Request Support</Headline>
      <Body className="text-center">Send us an email for further assistance.</Body>
      <form
        onSubmit={handleSubmitForm}
        className="mt-10 flex flex-wrap items-center justify-center gap-5"
      >
        <textarea
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          className="form-textarea w-full"
          placeholder="Your Message"
          rows={5}
          required
        />
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          className="form-input"
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={organization}
          onChange={(event) => setOrganization(event.currentTarget.value)}
          className="form-input"
          placeholder="Organization"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          className="form-input"
          placeholder="Email Address"
          required
        />

        <Button type="submit" size="small" label="Submit" />
      </form>
    </div>
  );
};

export const RequestSupportSuccess = () => {
  return (
    <div>
      <Headline>Thanks!</Headline>
      <Body className="text-center">We&apos;ll be in touch soon.</Body>
    </div>
  );
};

export const Error = () => {
  const error = useAtomValue(errorAtom);
  const setStep = useSetAtom(stepAtom);

  const handleRestart = useCallback(() => {
    setStep('EMAIL_LOGIN');
  }, [setStep]);

  const handleRequestSupport = useCallback(() => {
    setStep('REQUEST_SUPPORT');
  }, [setStep]);

  return (
    <div>
      <Headline>Error</Headline>
      <Body dangerouslySetInnerHTML={{ __html: error }} />
      <div className="mt-10 flex justify-center gap-5">
        <Button onClick={handleRestart} size="small" label="Start over" />
        <Button
          onClick={handleRequestSupport}
          size="small"
          label="Contact Us for Additional Support"
        />
      </div>
    </div>
  );
};

export const Headline = ({ className = '', children, ...rest }) => {
  return (
    <h3 className={cx('text-center font-dharma text-6xl sm:text-8xl', className)} {...rest}>
      {children}
    </h3>
  );
};

export const Body = ({ className = '', children, ...rest }) => {
  return (
    <div className={cx('mt-10 text-base !leading-normal sm:text-3xl', className)} {...rest}>
      {children}
    </div>
  );
};

export const Bold = ({ className = '', children, ...rest }) => {
  return (
    <span className={cx('text-base font-bold !leading-normal sm:text-3xl', className)} {...rest}>
      {children}
    </span>
  );
};
