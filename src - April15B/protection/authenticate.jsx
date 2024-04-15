import { useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useInterval from 'use-interval'

export const Authenticate = () => {

    const isToken = JSON.parse(localStorage.getItem('Token'))["id"]

    const proceedLogin = async () => {
        try{
            setMessage("Loading...");
            setMessageicon("notched circle loading icon purple")
            const response = await fetch(import.meta.env.VITE_GO_LOGIN,{
                                        method: "POST",
                                        headers: { "Accept": "application/json", "Content-type": "application/json" },
                                        body: JSON.stringify({
                                            username,
                                            password,
                                            timezone
                                            })
                                        }).then((response) => {
                                            return response.json()
                                        }).then((response) => {
                                            if(response[0]=="Incomplete"){
                                                setMessage("Incomplete details!")
                                            } else if (response[0]=="None"){
                                                setMessage("Account not found!")
                                            } else {
                                                const feedback = response[0].toString();
                                                const feed = feedback.split("|");
    
                                                const Token = {
                                                  id:         feed[0],
                                                  gadget:     feed[3],
                                                  token:      feed[4]
                                                }
    
                                                const User = {
                                                  rolename:   feed[2],
                                                  nickname:   feed[7],
                                                  avatar:     feed[6]
                                                }
    
                                                console.log("Account found! Logging in...")
                                                setMessage("Account found! Logging in...")
    
                                                localStorage.setItem('Token', JSON.stringify(Token));
                                                localStorage.setItem('User', JSON.stringify(User));
    
                                                exitLogin()
                                            }
                                        }).catch((error) => {
                                            console.log(error)
                                        })
    
        } catch (err){
            console.log(err)
        }
    };
    

    return (
      <div className="expand-centered">
        <h1>HomePage</h1>
  
      </div>
    );
  };
  