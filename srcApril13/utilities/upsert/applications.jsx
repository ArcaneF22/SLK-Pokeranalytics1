import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const UpsertApplications = ({selectedApplication}) => {

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
    setButton("Add New Application")
    setCancels(false)
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

  useEffect(() => {
    setappID(selectedApplication.id)
    setappName(selectedApplication.name)
    setappCompany("1")
    setappDetails(selectedApplication.details)
    setappImage("2")
    if(selectedApplication.status=="Active"){
      setappStatus("0")
    } else if(selectedApplication.status=="Pending"){
      setappStatus("1")
    } else {
      setappStatus("2")
    }

    if(selectedApplication.id == 0) {
      setButton("Add New Application")
      setCancels(false)
    } else {
      setButton("Proceed to Update")
      setCancels(true)
    }
    
  }, [selectedApplication.clicked]);

  const changeStatus = () => {
    if(appStatus=="0" || appStatus=="Active"){
      setappStatus("1")
    } else {
      setappStatus("0")
    }
  }

  async function submitApplications() {
    console.log("Submit:"+appID+"/"+appName+"/"+appCompany+"/"+appDetails+"/"+appImage+"/"+appStatus)
    setLoading(true)
    try {
      const response = await axios.post(Set.Upsert['applications'], Upsert);
      console.log(response.data)

      if(response.data.includes("Duplicate")){
          const number = parseFloat( response.data.match(/[\d.]+/) );
          setappID( number )
          setButton("Proceed to Update")
          setMessage("Duplicate found! Would you like to update existing data? Application ID#"+ number);
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


    return (
      <div className="ui segment">
        <h1>Insert / Update Application</h1>

        <div className="ui form">

          <div className='five fields'>
            <div className="field">
              <label>Name</label>
              <input type="text" value={appName} onChange={(e) => setappName(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Image</label>
              <input type="text" value={appImage} onChange={(e) => setappImage(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Company</label>
              <input type="text" value={appCompany} onChange={(e) => setappCompany(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Details</label>
              <input type="text" value={appDetails} onChange={(e) => setappDetails(e.currentTarget.value)}/>
            </div>

            <div className="field">
            <label>Status</label>
              { appStatus === "0" ? 
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
            <div className="ui button purple" onClick={validate}>{button}</div>

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
  