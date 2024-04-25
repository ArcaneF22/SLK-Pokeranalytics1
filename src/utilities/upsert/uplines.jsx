import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import { Clubs } from '../fetch/raw/clubs'
import { Accounts } from '../fetch/raw/accounts'
import { Roles } from '../fetch/raw/roles'
import * as Set from '../constants';

export const UpsertUplines = ({selectedData,recallData}) => {
  const clubDD = Clubs().data
  const acctDD = Accounts().data
  const roleDD = Roles().data

  const Token = JSON.parse( localStorage.getItem('Token') );
  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");
  const [button, setButton] =           useState("Add New Data");
  const [cancels, setCancels] =           useState(false);

  const [id, setID] =                           useState("0");
  const [clubID, setclubID] =                   useState("");
  const [downlineID, setdownlineID] =           useState("");
  const [uplineID, setuplineID] =               useState("");
  const [percentage, setPercentage] =           useState("");
  const [status, setStatus] =                   useState("");
  const [replace, setReplace] =                 useState("F");

  let Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  D: Set.TimeZoned,
                  id,
                  clubID,
                  downlineID,
                  uplineID,
                  percentage,
                  status,
                  replace,
              };

  Upsert = Object.fromEntries(
      Object.entries(Upsert).map(([key, value]) => [key, value.toString().trim()])
  );

  const AllGotValues = [clubID,downlineID,uplineID,percentage,status]
  const YesWithvalues = AllGotValues.every(value => Boolean(value));

  const ValidateForm = (e) => {
    e.preventDefault()
    setLoading(true)
      if(!YesWithvalues){
        setMessage("Details incomplete!")
      } else {
        console.log(JSON.stringify(Upsert))
        SubmitForm()
      }
  }

  const cancel = () => {
    setID("0")
    setMessage("")
    setButton("Add New Data")
    setCancels(false)
  }

  const clearForm = () => {
    setID("0")
    setclubID("")
    setdownlineID("")
    setdownlineRole("")
    setuplineID("")
    setuplineRole("")
    setPercentage("")
    setStatus("0")
    setReplace("F")

    setButton("Add New Data")
    setLoading(false)
    setCancels(false)

  }

  const fromTable = () => {

    setID(selectedData.id === null || selectedData.id === undefined ? "0" : selectedData.id)
    setclubID(selectedData.clubIDD === null || selectedData.clubIDD === undefined ? "" : selectedData.clubIDD)
    setdownlineID(selectedData.downlineID === null || selectedData.downlineID === undefined ? "" : selectedData.downlineID)
    setuplineID(selectedData.uplineID === null || selectedData.uplineID === undefined ? "" : selectedData.uplineID)
    setPercentage(selectedData.percentage === null || selectedData.percentage === undefined ? "" : selectedData.percentage)

    if(selectedData.status=="0" || selectedData.status=="Active"){
        setStatus("0")
    } else if(selectedData.status=="Pending"){
        setStatus("1")
    } else {
        setStatus("2")
    }

    if(selectedData.id == "0" || selectedData.id == null) {
      setButton("Add New Data")
      setStatus("0")
      setCancels(false)
    } else {
      setButton("Proceed to Update")
      setCancels(true)
    }

  }

  useEffect(() => {
    fromTable()
  }, [selectedData.clicked]);

  const changeStatus = () => {
    if(status=="0"){
        setStatus("1")
    } else if(status=="1"){
        setStatus("2")
    } else {
        setStatus("0")
    }
  }

  async function SubmitForm() {
        //setLoading(true)
    console.log(Upsert)
    try {
      const response = await axios.post(Set.Upsert['uplines'], Upsert);
      console.log(response.data)

      if(response.data.includes("Duplicate")){
        const number = parseFloat( response.data.match(/[\d.]+/) );
        setID( number )
        setButton("Proceed to Replace")
        setMessage("Duplicate found! Would you like to replace existing data? Check Upline ID#"+ number);
        setReplace("T")
        setCancels(true)
    } else if(response.data.includes("Added")){
        setMessage("New Upline successfully added!");
        recallData(1)
        clearForm()
    } else if(response.data.includes("Updated")){
        setMessage("Upline successfully replaced!");
        recallData(1)
        clearForm()
    } else {
      setMessage("Something went wrong! Please retry :" + response.data);
      clearForm()
    }
      
    } catch (error) {
      console.error("Error submission: ", error);
    }
  }


    return (
      <div className="ui segment">
        <h1>Insert / Update Upline</h1>
        <p>{JSON.stringify(Upsert)}</p>
        <div className="ui form">

          <div className='five fields'>

            <div className="field">
              <label>ID</label>
              <input type="number" value={id} onChange={(e) => setID(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Club</label>
              <SUI.Dropdown
                    placeholder="Select club"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={true}
                    multiple={false}
                    header="Select club"
                    onChange={(event, { value }) => { setclubID(value); }}
                    value={clubID}
                    options={clubDD.map(i => {
                      return {
                        key: i.id,
                        text: i.name,
                        value: i.idd,
                        image: { avatar: true, src: i.imageFull },
                      };
                    })}
                  />
            </div>

            <div className="field">
              <label>Downline Account</label>
              <SUI.Dropdown
                    placeholder="Select image"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={true}
                    multiple={false}
                    header="Select image"
                    onChange={(event, { value }) => { setdownlineID(value); }}
                    value={downlineID}
                    options={acctDD.map(i => {
                      return {
                        key: i.accountID,
                        text: i.accountRole+": "+i.accountNickname,
                        value: i.accountID,
                        image: { avatar: true, src: i.userAvatar },
                      };
                    })}
                  />
            </div>

            <div className="field">
              <label>Upline Account</label>
              <SUI.Dropdown
                    placeholder="Select image"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={true}
                    multiple={false}
                    header="Select image"
                    onChange={(event, { value }) => { setuplineID(value); }}
                    value={uplineID}
                    options={acctDD.map(i => {
                      return {
                        key: i.accountID,
                        text: i.accountRole+": "+i.accountNickname,
                        value: i.accountID,
                        image: { avatar: true, src: i.userAvatar },
                      };
                    })}
                  />
            </div>

            <div className="field">
              <label>Percentage</label>
              <input type="number" value={percentage} onChange={(e) => setPercentage(e.currentTarget.value)}/>
            </div>

            <div className="field">
            <label>Status</label>
              { status === "0" || status === "Active" ? 
                <div className="ui button green fluid center aligned" onClick={changeStatus}>
                  <i className="check circle outline icon"></i>
                  Active
                </div>
              :  status === "1" || status === "Pending" ? 
                <button className='ui button orange fluid center aligned' onClick={ changeStatus }>
                    <i className="spinner icon"></i>
                    Pending
                </button>
              :  
                <div className="ui button red fluid center aligned" onClick={changeStatus}>
                  <i className="times circle outline icon"></i>
                  Inactive
                </div>
              } 
            </div>

          </div>

          <div className="field">
            <div className="ui button purple" onClick={ValidateForm}>
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
  