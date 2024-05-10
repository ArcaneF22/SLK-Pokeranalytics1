import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import { Uplines } from '../fetch/raw/uplines'
import { Accounts } from '../fetch/raw/accounts'
import * as Set from '../constants';
import * as UPL from '../fetch/dropdowns/upline'

var onselectedDownline=0

export const selectedDownlineID = () => {

  const [data, setdata] = useState(0)

  useLayoutEffect(() => {
    if(onselectedDownline == "" || onselectedDownline==0){
      setdata(0);
    } else {
      setdata(onselectedDownline);
    }
    

  }, [onselectedDownline]);

  return ({data})
}


export const UpsertUplines = ({selectedData,recallData}) => {
  const UplineDD = Uplines().data
  const acctDD = Accounts().data

  const Token = JSON.parse( localStorage.getItem('Token') );
  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");
  const [button, setButton] =           useState("Add New Data");
  const [cancels, setCancels] =         useState(false);
  

  const [id, setID] =                           useState("0");
  const [clubID, setclubID] =                   useState("");
  const [downlineID, setdownlineID] =           useState("");
  const [uplineID, setuplineID] =               useState("");
  const [percentage, setPercentage] =           useState("");
  const [status, setStatus] =                   useState("");
  const [replace, setReplace] =                 useState("F");

  const [uplineDD, setuplineDD] =               useState(Accounts().data);


  const DDClubs = (value) => {
    setclubID(value)
  };
  
  const DDUplines = (value) => {
    setuplineID(value)
  };

  let Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  D: Set.TimeZoned,
                  id,
                  downlineID,
                  uplineID,
                  percentage,
                  status,
                  replace,
              };

  Upsert = Object.fromEntries(
      Object.entries(Upsert).map(([key, value]) => [key, value.toString().trim()])
  );

  const AllGotValues = [downlineID,uplineID,percentage,status]
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

  const resetForm = () => {
    setID("0")
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
        resetForm()
    } else if(response.data.includes("Updated")){
        setMessage("Upline successfully replaced!");
        recallData(1)
        resetForm()
    } else {
      setMessage("Something went wrong! Please retry :" + response.data);
      resetForm()
    }
      
    } catch (error) {
      console.error("Error submission: ", error);
    }
  }

   
    return (
      <div className="ui segment basic">
        
        <h3 className="ui horizontal divider header">
          Insert / Update Uplines
        </h3>
        <br />
        <p>Select downline then show clubs from then select to auto select app, show players/upline enrolled from club.. </p>
        <div className="ui form fitted">

        <div className='two fields'>

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
                        onChange={(event, { value }) => { onselectedDownline=value,setdownlineID(value); }}
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
                
            <div className='field'>
                <label>From DD Club</label>
                <UPL.Clubs dropdown={DDClubs}/>
            </div>

        </div>

        <div className='two fields'>

            <div className="field">
                <label>Upline Account</label>
                <UPL.Uplines dropdown={DDUplines}/>
            </div>

            <div className="field">
                <label>Percentage {percentage}</label>
                <input type="number" value={percentage} onChange={(e) => setPercentage(e.currentTarget.value)}/>
            </div>

        </div>

          <div className='three fields'>

            <div className="field">
            <label>Status</label>
              { status === "0" || status === "Active" ? 
                <div className="ui button green center aligned" onClick={changeStatus}>
                  <i className="check circle outline icon"></i>
                  Active
                </div>
                
              :  status === "1" || status === "Pending" ? 
                <button className='ui button orange center aligned' onClick={ changeStatus }>
                    <i className="spinner icon"></i>
                    Pending
                </button>
              :  
                <div className="ui button red center aligned" onClick={changeStatus}>
                  <i className="times circle outline icon"></i>
                  Inactive
                </div>
              } 
            </div>

          </div>

          <div className="ui section divider"></div>

          <div className="two fields center aligned centered">
            <div className="field">
              <div className="ui button purple fluid" onClick={ValidateForm}>
                <i className="plus icon"></i>
                {button}
              </div>
            </div>
              { cancels ?  <>
              <div className="field">
                <div className="ui button grey basic" onClick={cancel}>
                  <i className='icon times'></i>
                  Cancel
                </div>
                <div className="ui button grey basic" onClick={resetForm}>
                  <i className="eraser icon"></i>
                  Clear
                </div>
              </div>
              </> :  null }
          </div>

        </div>
      </div>
    );
  };

  
