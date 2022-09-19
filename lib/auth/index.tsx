import * as React from 'react';
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { atom, useSetAtom } from 'jotai';

export const loggedInAtom = atom<boolean>(false);

type User = {
  email: string;
  name: string;
  affiliation: string;
};

const defaultUser = {
  email: '',
  name: '',
  affiliation: '',
};

export const userAtom = atom<User>(defaultUser);

const fetchLoggedInStateRequest = async () => {
  const response = await fetch('/api/auth/member_center/checkLogin', {
    method: 'GET',
    mode: 'cors',
  });

  return response.json();
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const setIsLoggedIn = useSetAtom(loggedInAtom);
  const setUser = useSetAtom(userAtom);

  const fetchLoggedInState = useCallback(async () => {
    const data = await fetchLoggedInStateRequest();

    if (data.loggedIn) {
      setIsLoggedIn(true);
      setUser(data.user);
    } else {
      setIsLoggedIn(false);
      setUser(defaultUser);
    }
  }, [setIsLoggedIn, setUser]);

  useEffect(() => {
    fetchLoggedInState();
  }, [fetchLoggedInState]);

  return <>{children}</>;
};

export const useLogout = () => {
  const router = useRouter();

  const setIsLoggedIn = useSetAtom(loggedInAtom);
  const setUser = useSetAtom(userAtom);

  const logout = async () => {
    const response = await fetch(`/api/auth/member_center/logout`, {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data?.status === true) {
      setIsLoggedIn(false);
      setUser(defaultUser);
      router.push('/');
    } else {
      setIsLoggedIn(false);
      setUser(defaultUser);
      router.push('/');
    }
  };

  return logout;
};
