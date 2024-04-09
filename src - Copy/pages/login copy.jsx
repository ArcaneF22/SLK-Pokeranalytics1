
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Protect } from '../protection/protect';

export const LoginPage = () => {

  const navigateTo = useNavigate();

  useEffect(() => {
    console.log("Logged out")
    localStorage.setItem('Auth', 'false');
  }, []);

  const submitLogin = () => {
    Protect.logIn()
    navigateTo('/home')
    window.location.reload()
  };

  return (
    <div className="expand-centered">
      <h1>LoginPage</h1>

      <div>
        <input type='text' />
        <button onClick={submitLogin}>Login</button>
      </div>
      <div>

    </div>
    </div>



  );
};
