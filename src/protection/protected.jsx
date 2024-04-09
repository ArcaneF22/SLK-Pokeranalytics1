import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Protect } from './protect';

export const Protected = ({ children }) => {
  const [accessible, setAccessible] = useState(null);

  useEffect(() => {
    Protect.isLoggedIn()
      .then((isLoggedIn) => {
        setAccessible(isLoggedIn);
      })
      .catch(() => setAccessible(false));
  }, []);

  switch (accessible) {
    case true:
      return children;
    case false:
      return <Navigate to="/" />;
    case null:
      return  <div class="ui segment full-screen">
                <div class="ui active dimmer">
                  <div class="ui indeterminate text loader">Loading...</div>
                </div>
                <p></p>
              </div>;
  }
};
