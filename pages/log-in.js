import { useSetAtom } from 'jotai';
import React, { useEffect } from 'react';

import { loginModalAtom } from '~/atoms';

import { LegacyPage } from '~/components/legacy-page';
import SiteMetaCustom from '~/components/site-meta-custom';
import Wrapper from '~/components/wrapper';

export default function LoginPage() {
  const setIsLoginModalOpen = useSetAtom(loginModalAtom);

  useEffect(() => {
    setIsLoginModalOpen(true);
  }, [setIsLoginModalOpen]);

  return (
    <LegacyPage>
      <Wrapper>
        <SiteMetaCustom title="Login | PeopleForBikes" />
      </Wrapper>
    </LegacyPage>
  );
}
