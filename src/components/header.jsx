import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Protect } from '../protection/protect';
import { Modal_Logout, Modal_SessionExpire } from "../utilities/modals/alerts";

export const Header = () => {
  const navigate = useNavigate();
  const Auth = localStorage.getItem('Auth')
  const [Logout, setLogout] = useState(false);

  function navigateTo(path){
    if(Auth == 'true'){
      navigate(path)
    } else {
      Protect.logOut()
    }
  }

  return (
    <>
    <Modal_Logout key="Modal_Logout" open={Logout} onClose={() => { setLogout(false); }} />
    <div className="ui top fixed menu large inverted dark1 ">

    <div class="item">
      <img src="/images/logo/poker.png" />
    </div>


        <a className="item" onClick={() => navigateTo('/home')}>
            <div>
              <i className="university icon"></i>
              Home
            </div>
          </a>

        <a className="item" onClick={() => navigateTo('/applications')}>
            <div>
              <i className="university icon"></i>
              Applications
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/clubs')}>
            <div>
            <i className="layer group icon"></i>
              Clubs
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/users')}>
            <div>
            <i className="users icon"></i>
              Users
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/accounts')}>
            <div>
              <i className="user secret icon"></i>
              Accounts
            </div>
          </a>

          <a className="item" onClick={() => navigateTo('/history')}>
            <div>
            <i className="history icon"></i>
              History
            </div>
          </a>



      <div className="right menu">


          <a className="item" onClick={() => navigateTo('/notification')}>
          <i className="bell outline icon"></i>
              Notification
              <div className="ui red circular label">2</div>
          </a>
        <a className="item " onClick={() => { setLogout(true); }}>
          <i className="sign out alternate icon"></i>
          Log Out
        </a>
      </div>

    </div>
    <br/><br/><br/>
    </>

  );
};
