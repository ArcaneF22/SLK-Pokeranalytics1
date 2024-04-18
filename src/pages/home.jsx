
import { isNumeric } from '../utilities/tools'
import { FetchNotificationPending } from '../utilities/fetch/items/notifications'
import { useGlobalOutside  } from '../utilities/context/global';
import React, { useState, useLayoutEffect } from 'react';
import { RawProfile } from '../utilities/fetch/raw/profile'

export const HomePage = () => {

  const { countNotif } = useGlobalOutside();
  const isToken = JSON.parse(localStorage.getItem('Token'))["id"]
  const getUser = JSON.parse(localStorage.getItem('User'))
  const isNum = isNumeric(isToken)

  const User =    JSON.parse( localStorage.getItem('User') );

  return (
    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="home big icon"></i>
              <div className="content">
                  Home Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
      
    <div className="">
      


      <div className='ui segment middle aligned stackable grid container'>
        <div className="row">
            <div className="sixteen wide wide column">
              <h3>Welcome back {getUser["rolename"]}: {getUser["nickname"]}!</h3>
              <p>You have some work to do! </p>
            </div>
            <div className="sixteen wide wide column">
              <h3>Welcome back {getUser["rolename"]}: {getUser["nickname"]}!</h3>
              <p>You have some work to do! </p>
            </div>
            <div className="sixteen wide wide column">
              <h3>Welcome back {getUser["rolename"]}: {getUser["nickname"]}!</h3>
              <p>You have some work to do! </p>
            </div>
        </div>
        <div className='row'>

        </div>
      </div>
      <div class="ui vertical stripe quote segment">
    <div class="ui equal width stackable internally celled grid">
      <div class="center aligned row">
        <div class="column">
          <h3>"What a Company"</h3>
          <p>That is what they all say about us</p>
        </div>
        <div class="column">
          <h3>"I shouldn't have gone with their competitor."</h3>
          <p>
           <b>Nan</b> Chief Fun Officer Acme Toys
          </p>
        </div>
      </div>
    </div>
  </div>

      <div className="ui vertical stripe quote segment">
        <div className="ui middle aligned stackable grid container">
          <div className="row">
            <div className="six wide right floated column">
              <h3>Welcome back {getUser["rolename"]}: {getUser["nickname"]}!</h3>
              <p>You have some work to do! </p>
            </div>
            <div className="eight wide left floated column">
              <FetchNotificationPending />
            </div>
          </div>
        </div>
      </div>

    </div>

</>

  );
};
