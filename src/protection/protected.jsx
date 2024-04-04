import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Protect } from './protect';

export const Protected = ({ children }) => {
  const [accessible, setAccessible] = useState(null);

  const [proceed, setProceed] = useState(null);
  const isLogged = localStorage.getItem('Auth')
  const isNum = isNumeric(JSON.parse(localStorage.getItem('Token'))["id"])

  if (isLogged === 'true' && !isNaN(isNum)) {
    setProceed(true);
  } else {
    setProceed(false);
  }

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
      return <div className="expand-centered">Loading...</div>;
  }
};
