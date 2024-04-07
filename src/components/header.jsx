import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Protect } from '../protection/protect';

export const Header = () => {
  const location = useLocation();
  const Logged = localStorage.getItem('Auth')

  const submitLogout = () => {
    Protect.logOut()
  };

  function getRoute(routeName) {
    return `item ${location.pathname === routeName && `selected`}`;
  }

  return (
    <>
    <div className="ui top fixed menu inverted purple">

      <Link to="/home" className={getRoute('/home')}>
        Home Page
      </Link>

      <Link to="/applications" className={getRoute('/applications')}>
        Applications Page
      </Link>

      <Link to="/clubs" className={getRoute('/clubs')}>
        Clubs Page
      </Link>

      <Link to="/users" className={getRoute('/users')}>
        Users Page
      </Link>

      <Link to="/accounts" className={getRoute('/accounts')}>
        Accounts Page
      </Link>

      <Link to="/notification" className={getRoute('/notification')}>
        Notification Page
      </Link>

      <Link to="/history" className={getRoute('/history')}>
        History Page
      </Link>

      <div className="right item">
        <button className='ui button red' onClick={ submitLogout }>Logout</button>
      </div>

    </div>
    <br/><br/><br/>
    </>

  );
};
