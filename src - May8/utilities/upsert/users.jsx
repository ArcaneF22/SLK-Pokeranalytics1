import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Alert from "../alerts/alerts"

import { ImagesAvatars } from '../fetch/raw/images'
import { Roles } from '../fetch/raw/roles'
import { Users } from '../fetch/raw/users'
import { Accounts } from '../fetch/raw/accounts'

import * as Set from '../constants';

export const UpsertUsers = ({selectedData,recallData}) => {

  const imgDD = ImagesAvatars().data
  const roleDD = Roles().data
  const usersDD = Users().data
  const acctDD = Accounts().data
  const [AlertMessage, setAlertMessage] =   useState([{Alert:"", Title:"", Message:"",}]);

  const Token = JSON.parse( localStorage.getItem('Token') );
  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");
  const [button, setButton] =           useState("Add New Data");
  const [cancels, setCancels] =         useState(false);
  const [requestTo, setrequestTo] =     useState("0");

  const [newuserID, setnewuserID] =                         useState("0");
  const [newuserRole, setnewuserRole] =                     useState("");
  const [newuserNickname, setnewuserNickname] =             useState("");
  const [newuserAvatar, setnewuserAvatar] =                 useState("");
  const [newuserUsername, setnewuserUsername] =             useState("");
  const [newuserRePassword, setnewuserRePassword] =         useState("");
  const [newuserPassword, setnewuserPassword] =             useState("");
  const [newuserEmail, setnewuserEmail] =                   useState("");
  const [newuserTelegram, setnewuserTelegram] =             useState("");
  const [newuserStatus, setnewuserStatus] =                 useState("0");

  
  let Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  D: Set.TimeZoned,
                  requestTo,
                  newuserID,
                  newuserRole,
                  newuserNickname,
                  newuserTelegram,
                  newuserEmail,
                  newuserUsername,
                  newuserPassword,
                  newuserAvatar,
                  newuserStatus,
              };

  const Upserted = () => {
    Upsert = Object.fromEntries(
        Object.entries(Upsert).map( ([key, value]) => (
              (value != undefined || value != null ? [key, value.toString().trim()] : [key,""])
            )
        )
    );
}

  const AllGotValues = [newuserRole,newuserNickname,newuserAvatar,newuserUsername,newuserPassword,newuserStatus]
  const YesWithvalues = AllGotValues.every(value => Boolean(value));

  const ValidateForm = (e) => {
    e.preventDefault()
    Upserted()
    setLoading(true)
      if( !YesWithvalues ){
          setAlertMessage({
              Alert: "warning",
              Title: "Incomplete!",
              Message: "Please complete details",
          });
      } else if (newuserPassword != newuserRePassword){
          setAlertMessage({
              Alert: "warning",
              Title: "Oops!",
              Message: "Password doesn't match!",
          });
      } else {
        if(newuserEmail=="" || newuserEmail==null){
            setnewuserEmail("Null")
        } else if(newuserTelegram=="" || newuserTelegram==null){
            setnewuserTelegram("Null")
        }
        reCheckValues()
        console.log(JSON.stringify(Upsert))
        SubmitForm()
      }
  }

  const cancel = () => {
    setnewuserID("0")
    setMessage("")
    setButton("Add New Data")
    setCancels(false)
  }

  const resetForm = () => {
    setnewuserID("0")
    setnewuserRole("")
    setnewuserNickname("")
    setnewuserAvatar("")
    setnewuserUsername("")
    setnewuserPassword("")
    setnewuserRePassword("")
    setnewuserEmail("")
    setnewuserTelegram("")
    setnewuserStatus("0")

    setButton("Add New Data")
    setLoading(false)
    setCancels(false)
  }

  const reCheckValues = () => {
    if(Upsert.requestTo === null || Upsert.requestTo === undefined || Upsert.requestTo === "" ){
        Upsert["requestTo"] = "0";
    }
}

  const fromTable = () => {

        setnewuserID(selectedData.id === null || selectedData.id === undefined ? "0" : selectedData.id)
        setnewuserRole(selectedData.role === null || selectedData.role === undefined ? "" : selectedData.role)
        setnewuserNickname(selectedData.nickname === null || selectedData.nickname === undefined ? "" : selectedData.nickname)
        setnewuserAvatar(selectedData.avatar === null || selectedData.avatar === undefined ? "" : selectedData.avatar)
        setnewuserUsername(selectedData.username === null || selectedData.username === undefined ? "" : selectedData.username)
        setnewuserPassword(selectedData.password === null || selectedData.password === undefined ? "" : selectedData.password)
        setnewuserRePassword(selectedData.password === null || selectedData.password === undefined ? "" : selectedData.password)
        setnewuserEmail(selectedData.email === null || selectedData.email === undefined ? "" : selectedData.email)
        setnewuserTelegram(selectedData.telegram === null || selectedData.telegram === undefined ? "" : selectedData.telegram)

        if(selectedData.status=="0"){
            setnewuserStatus("0")
        } else if(selectedData.status=="1"){
            setnewuserStatus("1")
        } else {
            setnewuserStatus("2")
        }

        if(selectedData.id == 0 || selectedData.id == null) {
            setButton("Add New Data")
            setnewuserStatus("0")
            setCancels(false)
        } else {
            setButton("Proceed to Update")
            setCancels(true)
        }
  }

    useLayoutEffect(() => {
        fromTable()
    }, [selectedData.clicked]);

  const changeStatus = () => {
    if(newuserStatus=="0"){
        setnewuserStatus("1")
    } else if(newuserStatus=="1"){
        setnewuserStatus("2")
    } else {
        setnewuserStatus("0")
    }
  }

  async function SubmitForm() {
    //setLoading(true)
    try {
      const response = await axios.post(Set.Upsert['users'], Upsert);
      console.log(response.data)

        if(response.data.includes("Duplicate")){
            const number = parseFloat( response.data.match(/[\d.]+/) );
            setnewuserID( number )
            setButton("Proceed to Update ID#"+ number)
            setAlertMessage({
                Alert: "warning",
                Title: "Duplicate!",
                Message: "Check user ID#"+ number,
            });
            setCancels(true)
        } else if(response.data.includes("Added")){
            setAlertMessage({
                Alert: "success",
                Title: "Success!",
                Message: "New user successfully added!",
            });
            recallData(1)
            resetForm()
        } else if(response.data.includes("Updated")){
            setAlertMessage({
                Alert: "success",
                Title: "Success!",
                Message: "User successfully updated!",
            });
            recallData(1)
            resetForm()
        } else {
            setAlertMessage({
                Alert: "warning",
                Title: "Something went wrong!",
                Message: "Please retry",
            });
            resetForm()
        }
        
    } catch (error) {
      setAlertMessage({
        Alert: "warning",
        Title: "Something went wrong!",
        Message: "Please retry",
    });
      console.error("Error fetching data: ", error);
    }
  }


    return (
        <>

      { AlertMessage['Alert'] == "success" ? 
          <Alert.Success
                key="Success" 
                AlertMessage={AlertMessage} 
                open={AlertMessage['Alert'] == "success" ? true : false}  
                onClose={() => { setAlertMessage([{Alert:"", Title:"", Message:"",}]) }} />
      :  AlertMessage['Alert'] == "warning" ? 
          <Alert.Warning 
                key="Warning" 
                AlertMessage={AlertMessage} 
                open={AlertMessage['Alert'] == "warning" ? true : false} 
                onClose={() => { setAlertMessage([{Alert:"", Title:"", Message:"",}]) }} />
      : null
      }

<div className="ui segment basic left aligned">
        <h3 className="ui horizontal divider header">
          Insert / Update Users
        </h3>
        <br />

        <div className="ui form">

        <div className='three fields'>
              <div className="field">
                <label>Role</label>
                <SUI.Dropdown
                      placeholder="Select role"
                      scrolling
                      clearable
                      fluid
                      selection
                      search={false}
                      multiple={false}
                      header="Select role"
                      onChange={(event, { value }) => { setnewuserRole(value); }}
                      value={newuserRole}
                      options={roleDD.map(i => {
                        return {
                          key: i.id,
                          text: i.name,
                          value: i.id,
                        };
                      })}
                    />
              </div>

              <div className="field">
                <label>Nickname</label>
                <input type="text" placeholder='Nickname' value={newuserNickname.replace(/[^a-zA-Z0-9._-]|[_|-|.]{2,}/g, "")} onChange={(e) => setnewuserNickname(e.currentTarget.value)}/>
              </div>

          </div>

            <div className="field">
              <label>Avatar</label>
              <SUI.Dropdown
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

          <div className='three fields'>
              <div className="field">
                <label>Username</label>
                <input type="text" value={newuserUsername.replace(/\s/g, "")} onChange={(e) => setnewuserUsername(e.currentTarget.value)}/>
              </div>

              <div className="field">
                <label>Password</label>
                <input type="text" placeholder='Password' value={newuserPassword.replace(/\s/g, "")} onChange={(e) => setnewuserPassword(e.currentTarget.value) }/>
              </div>

              <div className="field">
                <label>Re-type Password</label>
                <input type="text" placeholder='Re-type Password' value={newuserRePassword.replace(/\s/g, "")} onChange={(e) => setnewuserRePassword(e.currentTarget.value)}/>
              </div>
          </div>



          <div className='two fields'>

            <div className="field">
              <label>Email</label>
              <input type="text" placeholder='Email' value={newuserEmail.replace(/\s/g, "")} onChange={(e) => setnewuserEmail(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Telegram</label>
              <input type="text" placeholder='Telegram' value={newuserTelegram.replace(/\s/g, "")} onChange={(e) => setnewuserTelegram(e.currentTarget.value)}/>
            </div>

            { newuserStatus ==="1" ? 
              (
                <div className="field">
                  <label>Request to Upline</label>
                  <SUI.Dropdown
                        placeholder="Select upline"
                        scrolling
                        clearable
                        fluid
                        selection
                        search={true}
                        multiple={false}
                        header="Select upline"
                        onChange={(event, { value }) => { setrequestTo(value); }}
                        value={requestTo}
                        options={acctDD.map(i => {
                          return {
                            key: i.accountID,
                            description: i.accountID,
                            text: i.accountRole+": "+i.accountNickname,
                            value: i.accountID,
                            image: { avatar: true, src: i.userAvatar },
                          };
                        })}
                      />
                </div>
              )
            : null }


          </div>
          <div className='two fields'>
              <div className="field">
                <label>Status</label>
                  { newuserStatus === "0" ? (
                            <button className='ui button green fluid center aligned' onClick={ changeStatus }>
                                <i className="check circle outline icon"></i>
                                Active
                            </button>
                  ) : newuserStatus === "1" ? (
                            <button className='ui button orange fluid center aligned' onClick={ changeStatus }>
                                <i className="spinner icon"></i>
                                Pending
                            </button>
                  ) : (
                          <button className='ui button red fluid center aligned' onClick={ changeStatus }>
                                <i className="times circle outline icon"></i>
                                Inactive
                            </button>
                  )} 
              </div>
          </div>


            <div className="field center aligned">
                  <div className="ui button purple" onClick={ValidateForm}>
                    <i className="plus icon"></i>
                    {button}
                  </div>

                { cancels ?  <>
                    <div className="ui button grey basic" onClick={cancel}>
                      <i className='icon times'></i>
                      Cancel
                    </div>
                    <div className="ui button grey basic" onClick={resetForm}>
                      <i className="eraser icon"></i>
                      Clear
                    </div>
                </> :  null }
          </div>

        </div>
      </div>
        </>
      
    );
  };
  