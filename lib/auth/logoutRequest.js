import { useContext } from 'react';

import AuthContext from '~/context/auth/auth-context';

const logoutRequest = async () => {
  const response = await fetch(`/api/auth/member_center/logout`, {
    method: 'POST',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export default logoutRequest;
