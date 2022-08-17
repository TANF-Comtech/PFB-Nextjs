import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const defaultAuthData = {
  user: {
    email: '',
    name: '',
    affiliation: '',
  },
  loggedIn: false,
};

const AuthProvider = (props) => {
  const [data, setData] = useState(defaultAuthData);

  const fetchLoggedInStateRequest = async () => {
    const response = await fetch('/api/auth/member_center/checkLogin', {
      method: 'GET',
      mode: 'cors',
    });
    return response.json();
  };

  const fetchLoggedInState = async () => {
    const data = await fetchLoggedInStateRequest();
    if (data.loggedIn) {
      setData(data);
    } else {
      setData(defaultAuthData);
    }
  };

  useEffect(() => {
    fetchLoggedInState();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...data,
        updateAuthContext: (d) => {
          setData(Object.assign({}, data, d));
        },
        checkLogin: () => {
          fetchLoggedInState();
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext as default, AuthProvider };
