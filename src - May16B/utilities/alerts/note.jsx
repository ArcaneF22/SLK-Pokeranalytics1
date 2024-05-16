
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Transition,Message } from "semantic-ui-react";
import useInterval from 'use-interval'

export const Error = (i) => {

    const [display, setDisplay]     = useState("hidden")

    useEffect(() => {
        if(i.Note['Note'] == "true"){
            
            if(i.Note['Type'] == "success"){
                setDisplay("green")
            } else if(i.Note['Type'] == "warning"){
                setDisplay("red")
            }

            const t = setTimeout(() => ( setDisplay("hidden"), i.Note['Note'] = "false") , 6000);
            return () => clearTimeout(t);
        }
      }, [i.Note['Note']]);


    return (
        <>
          <div className={"ui icon message "+display} >

                <i class="warning icon circular mini"></i>
                <div className='content'>
                <h2 className="header">
                    {i.Note['Title']}
                </h2>
                <p>
                    {i.Note['Message']}
                </p>

                </div>

          </div>

        </>
          );
  };

  export const Success = (i) => {
    return (
        <>
          <div className="ui message green">
                <i className="close icon"></i>
                <div className="header">
                    There were some errors with your submission
                </div>
                <ul className="list">
                    <li>You must include both a upper and lower case letters in your password.</li>
                    <li>You need to select your home country.</li>
                </ul>
          </div>

        </>
          );
  };