import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const UpsertApplications = () => {

  const Token = JSON.parse( localStorage.getItem('Token') );
  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");
  const [button, setButton] =           useState("Add New Application");
  const [cancels, setCancels] =           useState(false);

  const [appID, setappID] =             useState("0");
  const [appName, setappName] =         useState("");
  const [appCompany, setappCompany] =   useState("");
  const [appDetails, setappDetails] =   useState("");
  const [appImage, setappImage] =       useState("");
  const [appStatus, setappStatus] =     useState("0");
  const Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  appID,
                  appName,
                  appCompany,
                  appDetails,
                  appImage,
                  appStatus
              };

  const validate = (e) => {
    e.preventDefault()
    setLoading(true)

      if(appName == "" || appCompany == "" || appDetails == "" || appImage == ""){
        setMessage("Details incomplete!")
      } else {
        submitApplications()
      }
  }

  const cancel = () => {
    setappID("0")
    setMessage("")
  }

  const clearInput = () => {
    setappID("0")
    setappName("")
    setappCompany("")
    setappDetails("")
    setappImage("")
    setappStatus("0")
    setButton("Add New Application")
    setLoading(false)
    setCancels(false)
  }

  async function submitApplications() {
    setLoading(true)
    try {
      const response = await axios.post(Set.Upsert['applications'], Upsert);
      console.log(response.data)

      if(response.data.includes("Duplicate")){
          const number = parseFloat( response.data.match(/[\d.]+/) );
          setappID( number )
          setButton("Proceed to Update")
          setMessage("Duplicate found! Would you like to update existing data? App ID#"+ number);
          setCancels(true)
      } else if(response.data.includes("Added")){
          setMessage("New poker application successfully added!");
          clearInput()
      } else if(response.data.includes("Updated")){
          setMessage("Poker application successfully updated!");
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

  useLayoutEffect(() => {
    //sendApplications();
  }, []);

    return (
      <div className="ui segment">
        <h1>Insert / Update Applications</h1>

        <div className="ui form">

          <div className="field">
            <label>ID</label>
            <input type="text" value={appID} onChange={(e) => setappID(e.currentTarget.value)}/>
          </div>

          <div className='two fields'>
            <div className="field">
              <label>Name</label>
              <input type="text" value={appName} onChange={(e) => setappName(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Image</label>
              <input type="text" value={appImage} onChange={(e) => setappImage(e.currentTarget.value)}/>
            </div>
          </div>

          <div className='two fields'>
            <div className="field">
              <label>Company</label>
              <input type="text" value={appCompany} onChange={(e) => setappCompany(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Details</label>
              <input type="text" value={appDetails} onChange={(e) => setappDetails(e.currentTarget.value)}/>
            </div>
          </div>
          
          <div className="field">
            <label>Status</label>
            <input type="text" value={appStatus} onChange={(e) => setappStatus(e.currentTarget.value)}/>
          </div>

          <div className="field">
            <div className="ui button purple" onClick={validate}>{button}</div>
            {
              cancels ? 
                <>
                <div className="ui button grey" onClick={cancel}>Cancel</div>
                </>
              : 
                null
            }
            
            <p>{message}</p>
          </div>

        </div>
      </div>
    );
  };
  