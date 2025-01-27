import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import { Container, GridRow, GridColumn, Grid, Segment, Image } from 'semantic-ui-react'
import { ImagesAvatars } from '../fetch/raw/images'
import validator from 'validator';
import * as Set from '../constants';
import * as Alert from "../alerts/alerts"
import "semantic-ui-css/semantic.min.css";

export const UpsertProfile = () => {
  
  const Prof = JSON.parse( localStorage.getItem('User') );
  const Token = JSON.parse( localStorage.getItem('Token') );
  const imgDD       = ImagesAvatars().data

  const [loading, setLoading] =             useState(false);
  const [AlertMessage, setAlertMessage] =   useState([{Alert:"", Title:"", Message:"",}]);

  const [updateButton, setUpdateButton] =                 useState(false);

  const [avatarPath, setAvatarPath] =       useState(Prof['avatar']);

  const [PWMatched, setPWMatched] =         useState(false);

  const [nickname, setNickname] =           useState(Prof['nickname']);
  const [avatar, setAvatar] =               useState(Prof['avatarID']);
  const [email, setEmail] =                 useState(Prof['email'] === null || Prof['email'] === undefined ? "" : Prof['email']);
  const [telegram, setTelegram] =           useState(Prof['telegram'] === null || Prof['telegram'] === undefined ? "" : Prof['telegram']);
  const [username, setUsername] =           useState(Prof['username']);
  const [password, setPassword] =           useState("");
  const [newpassword, setnewPassword] =     useState("");
  const [repassword, setrePassword] =       useState("");

  let Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  D: Set.TimeZoned,
                  nickname,
                  avatar,
                  email,
                  telegram,
                  username,
                  password,
                  newpassword,
              };

  Upsert = Object.fromEntries(
      Object.entries(Upsert).map( ([key, value]) => (
        (value != undefined || value != null ? [key, value.toString().trim()] : [key,""])
      )
        
      )
  );

  const AllGotValues = [nickname,avatar,username,email]
  const YesWithvalues = AllGotValues.every(value => Boolean(value));


  const ValidateForm = (e) => {
    e.preventDefault()
    setLoading(true)
      if(!YesWithvalues){
          setAlertMessage({
            Alert: "warning",
            Title: "Incomplete!",
            Message: "Please complete details",
          });
      } else {
        if(newpassword != repassword){
            setAlertMessage({
              Alert: "warning",
              Title: "Oops!",
              Message: "New password doesn't match",
            });
        } else if(!password){
            setAlertMessage({
              Alert: "warning",
              Title: "Oops!",
              Message: "Please input your current password",
            });
        } else if(!validator.isEmail(email)){
            setAlertMessage({
              Alert: "warning",
              Title: "Oops!",
              Message: "Wrong email format",
            });
        } else {
          SubmitForm()
        }
      }
  }

  const resetForm = () => {
      setPassword("")
      setnewPassword("")
      setrePassword("")
      setAvatarPath(Prof['avatar'])
      
      setLoading(false)
      setUpdateButton(false)
  }

  const inputChange = () => {
      setUpdateButton(true)
  }

  useEffect(() => {
        resetForm()
  }, []);

  async function SubmitForm() {
        //setLoading(true)
        console.log(Upsert)
    try {
        const response = await axios.post(Set.Upsert['profile'], Upsert);
        console.log(response.data)

        if(response.data.includes("Duplicate Username")){
                const number = parseFloat( response.data.match(/[\d.]+/) );
                setAlertMessage({
                  Alert: "warning",
                  Title: "Username is already taken!",
                  Message: "The same with user ID#"+ number,
                });
                setUpdateButton(true)
        } else if(response.data.includes("Duplicate Nickname")){
                  const number = parseFloat( response.data.match(/[\d.]+/) );
                  setAlertMessage({
                    Alert: "warning",
                    Title: "Nickname is already taken!",
                    Message: "The same with user ID#"+ number,
                  });
                  setUpdateButton(true)
        } else if(response.data.includes("Wrong Password")){
                setAlertMessage({
                    Alert: "warning",
                    Title: "Oops!",
                    Message: "Incorrect password",
                });
                setUpdateButton(true)
        } else if(response.data.includes("Updated")){
                setAlertMessage({
                    Alert: "success",
                    Title: "Success!",
                    Message: "Profile has been updated",
                });
                resetForm()
                setUpdateButton(false)
        } else {
                setAlertMessage({
                  Alert: "warning",
                  Title: "Something went wrong!",
                  Message: "Please retry",
                });
                resetForm()
                setUpdateButton(true)
        }
      
    } catch (error) {
        console.error("Error submission: ", error);
    }
  }



//Accordion
const panels = [
    {
      key: '1',
      title: {
        content: <span className='ui teal'>Contact details</span>,
        icon: 'book',
      },
      content: {
        content: (
                            <div className="field">
                                <div className="two fields red">
                                    <div className="field">
                                        <label>Email address</label>
                                        <input type="text" placeholder="Email" value={email.replace(/\s/g, "")} onChange={(e) => (inputChange(),setEmail(e.currentTarget.value))}/>
                                    </div>
                                    <div className="field">
                                        <label>Telegram account link</label>
                                        <input type="text" placeholder="Telegram" value={telegram.replace(/\s/g, "")} onChange={(e) => (inputChange(),setTelegram(e.currentTarget.value))}/>
                                    </div>
                                </div>
                            </div>
        ),
      },
    },
    {
      key: '2',
      title: {
        content: <span className='ui teal'>Change password {PWMatched === true ? <i className='textRed'> (Password doesn't match!)</i> : null}</span>,
        icon: 'key',
      },
      content: {
        content: (
                            <div className="field">
                                <div className="two fields">
                                    <div className="field">
                                        <label> New password  </label>
                                        <input type="password" placeholder="New password" value={newpassword.replace(/\s/g, "")} maxLength={20} onChange={(e) => (inputChange(), setnewPassword(e.currentTarget.value), (repassword !=="" && e.currentTarget.value != repassword ? setPWMatched(true) : setPWMatched(false)) )}/>
                                    </div>
                                    <div className="field">
                                        <label> Re-type new password</label>
                                        <input type="password" placeholder="Re-type new password" value={repassword.replace(/\s/g, "")} maxLength={20} onChange={(e) => (setrePassword(e.currentTarget.value), (e.currentTarget.value != newpassword ? setPWMatched(true) : setPWMatched(false)) )}/>
                                    </div>
                                </div>
                            </div>
        ),
      },
    },
  ]

    return (
      <>
      { AlertMessage['Alert'] == "success" ? 
          <Alert.SuccessRefresh 
                key="SuccessRefresh" 
                AlertMessage={AlertMessage} 
                open={AlertMessage['Alert'] == "success" ? true : false}  
                onClose={() => { setAlertMessage([{Alert:"", Title:"", Message:"",}]) }} />
      :  AlertMessage['Alert'] == "warning" ? 
          <Alert.Warning 
                key="SuccessRefresh" 
                AlertMessage={AlertMessage} 
                open={AlertMessage['Alert'] == "warning" ? true : false} 
                onClose={() => { setAlertMessage([{Alert:"", Title:"", Message:"",}]) }} />
      : null
      }
        <div class="ui two cards stackable padded">
          
          <div class="ui card fluid">
              <div class="content">
                  <h2 class="ui header">
                      AVATAR
                  </h2>
              </div>
              <div className="ui image medium centered ">
                  <img className="ui medium circular image" src={avatarPath} />
              </div>
              <div className="content center aligned">
                  <div className="ui tiny images centered center aligned">
                      {imgDD.map((i,index) => {
                          return (<img className="imageAvatar" 
                                        key={index} 
                                        src={i.pathFull} 
                                        onClick={()=>( inputChange(), setAvatar(i.id), setAvatarPath(i.pathFull) ) } />);
                      })}                        
                  </div>
              </div>
          </div>

          <div class="ui card fluid">
              <div class="content">
                  <h2 class="ui header">
                      DETAILS
                  </h2>
              </div>
              <div className='content'>
                  <form className='ui form'>
                            <div className="field ui segment">
                                <div className="field">
                                    <label>Nickname</label>
                                    <input type="text" placeholder="Nickname" value={nickname.replace(/[^\w._-]/g, "")} maxLength={15} onChange={(e) => (inputChange(), setNickname(e.currentTarget.value))}/>
                                </div>
                                <div className="field">
                                      <label>Username</label>
                                      <input type="text" placeholder="Username" value={username.replace(/[\s]/g, "")} maxLength={15} onChange={(e) => (inputChange(),setUsername(e.currentTarget.value))}/>
                                </div>
                            </div>
                            <SUI.Accordion panels={panels}  exclusive={false} styled fluid />
                          
                            
                              <h4 className="ui horizontal right aligned header divider">
                                  Please confirm changes 
                              </h4>
                              <div className="field ui segment">
                                  <label>Current password</label>
                                  <input type="password" placeholder="Current password" value={password.replace(/\s/g, "")} maxLength={20} onChange={(e) => setPassword(e.currentTarget.value)}/>
                              </div>

                              <div className="field center aligned">
                                  { updateButton ? 
                                      <div className="ui button purple right labeled icon" onClick={ValidateForm}>
                                          <i className="arrow right icon"></i>
                                          Proceed to update
                                      </div>
                                    :
                                      <div className="ui button purple right labeled icon basic disabled">
                                          <i className="times icon"></i>
                                          No changes commited
                                      </div>
                                  }
                              </div>
                  </form>
              </div>

          </div>
        </div>
      </>
    );
  };
  