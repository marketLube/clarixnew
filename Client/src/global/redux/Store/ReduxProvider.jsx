'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './Store';
import { login } from '../slices/authSlice';

function AuthHydrator() {
  useEffect(() => {
    if (localStorage.getItem("ClientToken") === "true") {
      store.dispatch(login({ user: null }));
    }
  }, []);
  return null;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthHydrator />
      {children}
    </Provider>
  );
}

