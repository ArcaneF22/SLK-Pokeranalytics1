import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import { useGlobalOutside  } from '../context/global';
import * as Set from '../constants';

export const UpsertClubs = ({selectedClub}) => {

  const Token = JSON.parse( localStorage.getItem('Token') );
  const { dropdownApplication } = useGlobalOutside();
  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");
  const [button, setButton] =           useState("Add New Club");
  const [cancels, setCancels] =           useState(false);

  const [clubID, setclubID] =               useState("0");
  const [clubIDD, setclubIDD] =             useState("");
  const [clubName, setclubName] =           useState("");
  const [clubImage, setclubImage] =         useState("");
  const [clubApp, setclubApp] =             useState("");
  const [clubDetails, setclubDetails] =     useState("");
  const [clubType, setclubType] =           useState("");
  const [clubUnion, setclubUnion] =         useState("");
  const [clubStatus, setclubStatus] =       useState("0");
  const Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  clubID,
                  clubIDD,
                  clubName,
                  clubImage,
                  clubApp,
                  clubDetails,
                  clubType,
                  clubUnion,
                  clubStatus,
              };

  const validate = (e) => {
    e.preventDefault()
    setLoading(true)
      if(clubIDD == "" || clubName == "" || clubImage == "" || clubApp == "" || clubType == "" || clubStatus == ""){
        setMessage("Details incomplete!")
      } else {
        console.log(JSON.stringify(Upsert))
        submitClub()
      }
  }

  const cancel = () => {
    setclubID("0")
    setMessage("")
    setButton("Add New Club")
    setCancels(false)
  }

  const clearInput = () => {
    setclubID("0")
    setclubIDD("")
    setclubName("")
    setclubImage("")
    setclubApp("")
    setclubDetails("")
    setclubType("")
    setclubUnion("")
    setclubStatus("0")
    setButton("Add New Club")
    setLoading(false)
    setCancels(false)

  }

  const dropdownApps = (event, { value }) => {
    setappID(value);
  };

  useEffect(() => {
    setclubID(selectedClub.id)
    setclubIDD(selectedClub.idd)
    setclubName(selectedClub.name)
    setclubImage(selectedClub.image)
    setclubApp(selectedClub.app)
    setclubDetails(selectedClub.details)
    setclubType(selectedClub.type)
    setclubUnion(selectedClub.union)
    if(selectedClub.status=="0" || selectedClub.status=="Active"){
      setclubStatus("0")
    } else if(selectedClub.status=="Pending"){
      setclubStatus("1")
    } else {
      setclubStatus("2")
    }

    if(selectedClub.id == 0) {
      setButton("Add New Club")
      setCancels(false)
    } else {
      setButton("Proceed to Update")
      setCancels(true)
    }
    
  }, [selectedClub.clicked]);

  const changeStatus = () => {
    if(clubStatus=="0" || clubStatus=="Active"){
      setclubStatus("1")
    } else {
      setclubStatus("0")
    }
  }

  async function submitClub() {
    //setLoading(true)
    try {
      const response = await axios.post(Set.Upsert['clubs'], Upsert);
      console.log(response.data)

      if(response.data.includes("Duplicate")){
        const number = parseFloat( response.data.match(/[\d.]+/) );
        setclubID( number )
        setButton("Proceed to Update")
        setMessage("Duplicate found! Would you like to update existing data? Club ID#"+ number);
        setCancels(true)
    } else if(response.data.includes("Added")){
        setMessage("New poker club successfully added!");
        clearInput()
    } else if(response.data.includes("Updated")){
        setMessage("Poker club successfully updated!");
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
        <h1>Insert / Update Club</h1>

        <div className="ui form">

          <div className='five fields'>

          <div className="field">
              <label>Club IDD</label>
              <input type="text" value={clubIDD} onChange={(e) => setclubIDD(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Name</label>
              <input type="text" value={clubName} onChange={(e) => setclubName(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Image</label>
              <input type="number" value={clubImage} onChange={(e) => setclubImage(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Application</label>
              <input type="number" value={clubApp} onChange={(e) => setclubApp(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Details</label>
              <input type="text" value={clubDetails} onChange={(e) => setclubDetails(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Type</label>
              <input type="text" value={clubType} onChange={(e) => setclubType(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Union</label>
              <input type="number" value={clubUnion} onChange={(e) => setclubUnion(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>dropdown</label>
              <Dropdown
                    placeholder="Select poker app"
                    fluid
                    selection
                    options={clubApp}
                    onChange={dropdownApps}
                    value={clubApp}
                  />
            </div>

            <div className="field">
            <label>Status</label>
              { clubStatus === "0" || clubStatus === "Active" ? 
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
  