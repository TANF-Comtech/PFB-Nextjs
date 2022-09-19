import { useSetAtom } from 'jotai';
import React, { useEffect } from 'react';

import { loginModalAtom } from '~/atoms';

import SiteMetaCustom from '~/components/site-meta-custom';
import Wrapper from '~/components/wrapper';

export default function LoginPage() {
  const setIsLoginModalOpen = useSetAtom(loginModalAtom);

  useEffect(() => {
    setIsLoginModalOpen(true);
  }, [setIsLoginModalOpen]);

  return (
    <Wrapper>
      <SiteMetaCustom title="Login | PeopleForBikes" />
    </Wrapper>
  );
}
