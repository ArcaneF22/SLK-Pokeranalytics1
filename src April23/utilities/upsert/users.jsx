import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import { Applications } from '../fetch/raw/applications'
import { ImagesAvatars } from '../fetch/raw/images'

import * as Set from '../constants';

export const UpsertUsers = ({selectedData,recallData}) => {
  const appDD = Applications().data
  const imgDD = ImagesAvatars().data

  const Token = JSON.parse( localStorage.getItem('Token') );
  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");
  const [button, setButton] =           useState("Add New User");
  const [cancels, setCancels] =         useState(false);

  const [newuserID, setnewuserID] =                         useState("");
  const [newuserApp, setnewuserApp] =                       useState("");
  const [newuserRole, setnewuserRole] =                     useState("");
  const [newuserNickname, setnewuserNickname] =             useState("");
  const [newuserAvatar, setnewuserAvatar] =                 useState("");
  const [newuserUsername, setnewuserUsername] =             useState("");
  const [newuserRePassword, setnewuserRePassword] =             useState("");
  const [newuserPassword, setnewuserPassword] =             useState("");
  const [newuserEmail, setnewuserEmail] =                   useState("");
  const [newuserTelegram, setnewuserTelegram] =             useState("");
  const [newuserStatus, setnewuserStatus] =                 useState("0");

  const Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  newuserApp,
                  newuserRole,
                  newuserNickname,
                  newuserTelegram,
                  newuserEmail,
                  newuserUsername,
                  newuserPassword,
                  newuserAvatar,
                  newuserStatus,
              };

  const AllGotValues = [newuserApp,newuserRole,newuserNickname,newuserAvatar,newuserUsername,newuserPassword,newuserStatus]
  const YesWithvalues = AllGotValues.every(value => Boolean(value));

  const validate = (e) => {
    e.preventDefault()
    setLoading(true)
      if( !YesWithvalues ){
        setMessage("Details incomplete!")
        console.log(JSON.stringify(Upsert))
      } else {
        setMessage("Submitting data...")
        console.log(JSON.stringify(Upsert))
        submitNewUser()
      }
  }

  const cancel = () => {
    setclubID("0")
    setMessage("")
    setButton("Add New Club")
    setCancels(false)
  }

  const clearInput = () => {
    setnewuserApp("0")
    setnewuserRole("")
    setnewuserNickname("")
    setnewuserAvatar("")
    setnewuserUsername("")
    setnewuserPassword("")
    setnewuserEmail("")
    setnewuserTelegram("")
    setnewuserStatus("0")
    setButton("Add New User")
    setLoading(false)
    setCancels(false)

  }

  useEffect(() => {

  }, []);

  const changeStatus = () => {
    if(newuserStatus=="0" || newuserStatus=="Active"){
        setnewuserStatus("1")
    } else {
        setnewuserStatus("0")
    }
  }

  async function submitNewUser() {
    //setLoading(true)
    try {
      const response = await axios.post(Set.Upsert['users'], Upsert);
      console.log(response.data)

        if(response.data.includes("Duplicate")){
            const number = parseFloat( response.data.match(/[\d.]+/) );
            setclubID( number )
            setButton("Proceed to Update")
            setMessage("Duplicate found! Would you like to update existing data? User ID#"+ number);
            setCancels(true)
        } else if(response.data.includes("Added")){
            setMessage("New user successfully added!");
            recallData(1)
            clearInput()
        } else if(response.data.includes("Updated")){
            setMessage("User successfully updated!");
            recallData(1)
            clearInput()
        } else {
        setMessage("Something went wrong! Please retry");
        clearInput()
        }
        
    } catch (error) {
      setMessage(error);
      console.error("Error fetching data: ", error);
    }
  }



    return (
      <div className="ui segment">
        <h1>Insert / Update User</h1>

        <div className="ui form">

          <div className='five fields'>

            <div className="field">
              <label>ID</label>
              <input type="number" value={newuserID} onChange={(e) => setnewuserID(e.currentTarget.value)} disabled />
            </div>

            <div className="field">
              <label>Role</label>
              <input type="number" value={newuserRole} onChange={(e) => setnewuserRole(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Nickname</label>
              <input type="text" value={newuserNickname} onChange={(e) => setnewuserNickname(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Avatar</label>
              <Dropdown
                    placeholder="Select image"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={false}
                    multiple={false}
                    header="Select image"
                    onChange={(event, { value }) => { setnewuserAvatar(value); }}
                    value={newuserAvatar}
                    options={imgDD.map(i => {
                      return {
                        key: i.id,
                        text: i.name,
                        value: i.id,
                        image: { avatar: true, src: i.pathFull },
                      };
                    })}
                  />
            </div>

            <div className="field">
              <label>Application</label>
              <Dropdown
                    placeholder="Select"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={false}
                    multiple={false}
                    header="Select application"
                    onChange={(event, { value }) => { setnewuserApp(value); }}
                    value={newuserApp}
                    options={appDD.map(i => {
                      return {
                        key: i.id,
                        text: i.name,
                        value: i.id,
                        image: { avatar: true, src: i.imageFull },
                      };
                    })}
                  />
            </div>

            <div className="field">
              <label>Username</label>
              <input type="text" value={newuserUsername} onChange={(e) => setnewuserUsername(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Password</label>
              <input type="text" value={newuserPassword} onChange={(e) => setnewuserPassword(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Re-type Password</label>
              <input type="text" value={newuserRePassword} onChange={(e) => setnewuserRePassword(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Email</label>
              <input type="text" value={newuserEmail} onChange={(e) => setnewuserEmail(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Telegram</label>
              <input type="text" value={newuserTelegram} onChange={(e) => setnewuserTelegram(e.currentTarget.value)}/>
            </div>

            <div className="field">
            <label>Status</label>
              { newuserStatus === "0" || newuserStatus === "Active" ? 
                <div className="ui button green fluid center aligned" onClick={changeStatus}>
                  <i className="check circle outline icon"></i>
                  Active
                </div>
              :  
                <div className="ui button red fluid center aligned" onClick={changeStatus}>
                  <i className="times circle outline icon"></i>
                  Inactive
                </div>
              } 
            </div>

          </div>

          <div className="field">
            <div className="ui button purple" onClick={validate}>
              <i className="plus icon"></i>
              {button}
            </div>

            { cancels ?  <>
              <div className="ui button grey basic" onClick={cancel}>Cancel</div>
              <div className="ui button grey basic" onClick={clearInput}>Clear</div>
            </> :  null }
            <p>{message}</p>
          </div>

        </div>
      </div>
    );
  };
  