import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'

import { Applications } from '../fetch/raw/applications'
import { Roles } from '../fetch/raw/roles'

import * as Set from '../constants';

export const UpsertAccounts = ({selectedData,recallData}) => {
  const appDD = Applications().data
  const roleDD = Roles().data

  const Token = JSON.parse( localStorage.getItem('Token') );
  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");
  const [button, setButton] =           useState("Add New User");
  const [cancels, setCancels] =         useState(false);

  const [accountID, setaccountID] =                         useState("0");
  const [accountIDD, setaccountIDD] =                       useState("");
  const [accountRole, setaccountRole] =                     useState("");
  const [accountNickname, setaccountNickname] =             useState("");
  const [accountuserID, setaccountuserID] =                 useState("");
  const [accountappID, setaccountappID] =                   useState("");
  const [accountStatus, setaccountStatus] =                 useState("");

  const Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  accountID,
                  accountIDD,
                  accountRole,
                  accountNickname,
                  accountuserID,
                  accountappID,
                  accountStatus,
              };

  const AllGotValues = [accountIDD,accountRole,accountNickname,accountuserID,accountappID,accountStatus]
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
        SubmitData()
      }
  }

  const cancel = () => {
    setaccountID("0")
    setMessage("")
    setButton("Add New User")
    setCancels(false)
  }

  const clearForm = () => {
    setaccountID("0")
    setaccountIDD("")
    setaccountRole("")
    setaccountNickname("")
    setaccountuserID("")
    setaccountappID("")
    setaccountStatus("0")

    setButton("Add New User")
    setLoading(false)
    setCancels(false)
  }



  const fromTable = () => {

        setaccountID(selectedData.id === null || selectedData.id === undefined ? "0" : selectedData.id)
        setaccountIDD(selectedData.idd === null || selectedData.idd === undefined ? "0" : selectedData.idd)
        setaccountRole(selectedData.role === null || selectedData.role === undefined ? "" : selectedData.role)
        setaccountNickname(selectedData.nickname === null || selectedData.nickname === undefined ? "" : selectedData.nickname)
        setaccountuserID(selectedData.userID === null || selectedData.userID === undefined ? "" : selectedData.userID)
        setaccountappID(selectedData.appID === null || selectedData.appID === undefined ? "" : selectedData.appID)

        if(selectedData.status=="0" || selectedData.status=="Active"){
            setaccountStatus("0")
        } else if(selectedData.status=="Pending"){
            setaccountStatus("1")
        } else {
            setaccountStatus("2")
        }

        if(selectedData.id == 0 || selectedData.id == null) {
            setButton("Add New User")
            setaccountStatus("0")
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
    if(accountStatus=="0" || accountStatus=="Active"){
        setaccountStatus("1")
    } else {
        setaccountStatus("0")
    }
  }

  async function SubmitData() {
    //setLoading(true)
    try {
      const response = await axios.post(Set.Upsert['accounts'], Upsert);
      console.log(response.data)

        if(response.data.includes("Duplicate")){
            const number = parseFloat( response.data.match(/[\d.]+/) );
            setaccountID( number )
            setButton("Proceed to Update")
            setMessage("Duplicate found! Would you like to update existing data? Check account ID#"+ number);
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
        <h1>Insert / Update Accounts</h1>

        <div className="ui form">

          <div className='five fields'>

            <div className="field">
              <label>ID</label>
              <input type="number" value={accountID} onChange={(e) => setaccountID(e.currentTarget.value)} />
            </div>

            <div className="field">
              <label>User ID</label>
              <input type="text" value={accountuserID} onChange={(e) => setaccountuserID(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>IDD</label>
              <input type="number" value={accountIDD} onChange={(e) => setaccountIDD(e.currentTarget.value)} />
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
                    onChange={(event, { value }) => { setaccountRole(value); }}
                    value={accountRole}
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
              <label>Nickname {selectedData.nickname}</label>
              <input type="text" value={accountNickname} onChange={(e) => setaccountNickname(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Application</label>
              <SUI.Dropdown
                    placeholder="Select"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={false}
                    multiple={false}
                    header="Select application"
                    onChange={(event, { value }) => { setaccountappID(value); }}
                    value={accountappID}
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
            <label>Status</label>
              { accountStatus === "0" || accountStatus === "Active" ? 
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
              <div className="ui button grey basic" onClick={clearForm}>Clear</div>
            </> :  null }
            <p>{message}</p>
          </div>

        </div>
      </div>
    );
  };
  