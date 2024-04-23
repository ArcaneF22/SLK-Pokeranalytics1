import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'

import { ImagesAvatars } from '../fetch/raw/images'
import { Roles } from '../fetch/raw/roles'

import * as Set from '../constants';

export const UpsertUsers = ({selectedData,recallData}) => {

  const imgDD = ImagesAvatars().data
  const roleDD = Roles().data

  const Token = JSON.parse( localStorage.getItem('Token') );
  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");
  const [button, setButton] =           useState("Add New User");
  const [cancels, setCancels] =         useState(false);

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

  const Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
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

  const AllGotValues = [newuserRole,newuserNickname,newuserAvatar,newuserUsername,newuserPassword,newuserStatus]
  const YesWithvalues = AllGotValues.every(value => Boolean(value));

  const validate = (e) => {
    e.preventDefault()
    setLoading(true)
      if( !YesWithvalues ){
        setMessage("Details incomplete!")
        console.log(JSON.stringify(Upsert))
      } else if (newuserPassword != newuserRePassword){
        setMessage("Password doesn't match!")
      } else {
        if(newuserEmail=="" || newuserEmail==null){
            setnewuserEmail("Null")
        } else if(newuserTelegram=="" || newuserTelegram==null){
            setnewuserTelegram("Null")
        }
        setMessage("Submitting data...")
        console.log(JSON.stringify(Upsert))
        SubmitData()
      }
  }

  const cancel = () => {
    setnewuserID("0")
    setMessage("")
    setButton("Add New User")
    setCancels(false)
  }

  const clearForm = () => {
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

    setButton("Add New User")
    setLoading(false)
    setCancels(false)
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

        if(selectedData.status=="0" || selectedData.status=="Active"){
            setnewuserStatus("0")
        } else if(selectedData.status=="Pending"){
            setnewuserStatus("1")
        } else {
            setnewuserStatus("2")
        }

        if(selectedData.id == 0 || selectedData.id == null) {
            setButton("Add New User")
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

  async function SubmitData() {
    //setLoading(true)
    try {
      const response = await axios.post(Set.Upsert['users'], Upsert);
      console.log(response.data)

        if(response.data.includes("Duplicate")){
            const number = parseFloat( response.data.match(/[\d.]+/) );
            setnewuserID( number )
            setButton("Proceed to Update")
            setMessage("Duplicate found! Would you like to update existing data? Check user ID#"+ number);
            setCancels(true)
        } else if(response.data.includes("Added")){
            setMessage("New user successfully added!");
            recallData(1)
            clearForm()
        } else if(response.data.includes("Updated")){
            setMessage("User successfully updated!");
            recallData(1)
            clearForm()
        } else {
        setMessage("Something went wrong! Please retry");
        clearForm()
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
              <input type="number" value={newuserID} onChange={(e) => setnewuserID(e.currentTarget.value)} />
            </div>

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
              <input type="text" value={newuserNickname} onChange={(e) => setnewuserNickname(e.currentTarget.value)}/>
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
              { newuserStatus === "0" ? (
                        <button className='ui button green' onClick={ changeStatus }>
                            <i className="check circle outline icon"></i>
                            Active
                        </button>
              ) : newuserStatus === "1" ? (
                        <button className='ui button orange' onClick={ changeStatus }>
                            <i className="spinner icon"></i>
                            Pending
                        </button>
              ) : (
                      <button className='ui button red' onClick={ changeStatus }>
                            <i className="times circle outline icon"></i>
                            Inactive
                        </button>
              )} 
            </div>

          </div>

          <div className="field">
            <div className="ui button purple" onClick={validate}>
              <i className="plus icon"></i>
              {button}
            </div>

            { cancels ?  <>
              <div className="ui button grey basic" onClick={cancel}>Cancel</div>
              <div className="ui button grey basic" onClick={clearForm}>Clear</div>
            </> :  null }
            <p>{message}</p>
          </div>

        </div>
      </div>
    );
  };
  