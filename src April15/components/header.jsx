import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Protect } from '../protection/protect';
import { Modal_Logout, Modal_SessionExpire } from "../utilities/modals/alerts";
import * as Set from '../utilities/constants';
import {
  SidebarPusher,
  SidebarPushable,
  Checkbox,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

export const Header = () => {
  const navigate = useNavigate();
  const Auth = localStorage.getItem('Auth')
  const Profile = JSON.parse(localStorage.getItem('User'))
  const [Logout, setLogout] = useState(false);

  function navigateTo(path){
    if(Auth == 'true'){
      navigate(path)
    } else {
      Protect.logOut()
    }
  }


  const [visible, setVisible] = useState(false)

  return (
    <>
    <Modal_Logout key="Modal_Logout" open={Logout} onClose={() => { setLogout(false); }} />
    <div className="ui vertical menu sidebar inverted visible large purplelized ">
      <a className="item ui segment center aligned"  onClick={() => navigateTo('/myprofile')}>
        <h3 className="ui center icon header purpled">
          <img className="icon medium-avatar" src={Set.Path['avatars'] + Profile["avatar"]} alt="Profile Avatar" />
          
          <div className="content header">
            {Profile["nickname"]}
            <div className="sub header">
              {Profile["rolename"]}
            </div>
          </div>
        </h3>
      </a>
      <a className="item" onClick={() => navigateTo('/myaccounts')}>
        <div>
          <i className="clock outline icon"></i>
          My Accounts
        </div>
      </a>
      <a className="item" onClick={() => navigateTo('/myhistory')}>
        <div>
          <i className="history icon"></i>
          My History
        </div>
      </a>
    </div>


    <div className="ui top fixed menu big lefted teal">

    <div class="item">
      <img src={Set.Path['logo'] + "poker.png"} />
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
