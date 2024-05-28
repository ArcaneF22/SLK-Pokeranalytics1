import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import { Accounts } from '../fetch/raw/accounts'
import * as Set from '../constants';
import * as Alert from "../alerts/alerts"
import * as Note from "../alerts/note"
import * as UPL from '../fetch/dropdowns/upline'
import * as Func from '../functions';

export const UpsertUplines = ({selectedData,recallData,resetSelected}) => {

  const Token = JSON.parse( localStorage.getItem('Token') );

  const acctDD                                  = Accounts().data
  const [loading, setLoading]                   = useState(false);
  const [message, setMessage]                   = useState("");
  const [button, setButton]                     = useState("Add New Data");
  const [cancels, setCancels]                   = useState(false);
  const [AlertMessage, setAlertMessage]         = useState([{Alert:"", Title:"", Message:"",}]);
  const [NoteMessage, setNoteMessage]           = useState([{Note:"false", Title:"", Message:"",}]);

  const [id, setID]                             = useState("0");
  const [appID, setappID]                       = useState(null);
  const [clubID, setclubID]                     = useState("");
  const [downlineID, setdownlineID]             = useState("");
  const [uplineID, setuplineID]                 = useState("");
  const [percentage, setPercentage]             = useState("");
  const [status, setStatus]                     = useState("1");


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
                  clubID,
                  downlineID,
                  uplineID,
                  percentage,
                  status,
                  percent_Type:           "UPLINE",
                  percent_IDD:            id,
                  percent_Value:          percentage,
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
          setAlertMessage({
              Alert: "warning",
              Title: "Incomplete!",
              Message: "Please fill out missing details",
          });
          
      } else if(downlineID == uplineID){
          setAlertMessage({
              Alert: "warning",
              Title: "Oops!",
              Message: "Upline and downline cannot be the same!",
          });
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
    setStatus("1")
  }

  const resetForm = () => {
    
    setID("0")
    setdownlineID("")
    setuplineID("")
    setPercentage("")
    setStatus("1")
    
    setButton("Add New Data")
    setLoading(false)
    setCancels(false)
    resetSelected("true")

  }

  const fromTable = () => {

    setID(selectedData.id === null || selectedData.id === undefined ? "0" : selectedData.id)

    setdownlineID(selectedData.downlineID === null || selectedData.downlineID === undefined ? "" : selectedData.downlineID)
    setappID(selectedData.appID === null || selectedData.appID === undefined ? "" : selectedData.appID)
    setclubID(selectedData.clubIDD === null || selectedData.clubIDD === undefined ? "" : selectedData.clubIDD)
    setuplineID(selectedData.uplineID === null || selectedData.uplineID === undefined ? "" : selectedData.uplineID)
    setPercentage(selectedData.percentage === null || selectedData.percentage === undefined ? "" : selectedData.percentage)

    if(selectedData.status=="0" || selectedData.status=="Active"){
        setStatus("0")
    } else if(selectedData.status=="1" || selectedData.status=="Pending"){
        setStatus("1")
    } else {
        setStatus("2")
    }

    if(selectedData.id == "0" || selectedData.id == null) {
      setButton("Add New Data")
      setStatus("1")
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
    if( status=="0" ){
        setStatus("1")
    } else if( status=="1" ){
      if(id == 0 || id == null){
        setStatus("0")
      } else {
        setStatus("2")
      }
    } else if( status=="2" ){
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
          setAlertMessage({
              Alert: "warning",
              Title: "Found duplicate ID#"+ number,
              Message: "Check details to update",
          });
        setCancels(true)
    } else if(response.data.includes("Added")){
          setAlertMessage({
              Alert: "success",
              Title: "Success!",
              Message: "New Upline added",
          });
        recallData(1)
        resetForm()
    } else if(response.data.includes("Updated")){
          setAlertMessage({
              Alert: "success",
              Title: "Success!",
              Message: "Upline updated",
          });
        recallData(1)
        resetForm()
    } else {
          setAlertMessage({
              Alert: "warning",
              Title: "Oops!",
              Message: "Something went wrong! Please retry",
          });
        resetForm()
    }
      
    } catch (error) {
          setAlertMessage({
              Alert: "warning",
              Title: "Oops!",
              Message: "Something went wrong! Please retry",
          });
          console.error("Error submission: ", error);
    }
  }

const downlines = acctDD.map(i => {
  return {
    key: i.id,
    text: i.accountID+": "+i.accountNickname,
    description: i.accountRole,
    value: i.accountID,
    image: { avatar: true, src: i.userAvatar },
    ddd: i.appID ? i.appID : 0,
  };
})

  
  const downlineChange = (event, i) => {
    setdownlineID(i.value);
    const s = downlines.find(o => o.value === i.value);
    setappID(s.ddd ? s.ddd : 0);
  };

   
    return (
      <>
      { AlertMessage['Alert'] == "success" ? 
          <Alert.Success
                key="SuccessRefresh" 
                AlertMessage={AlertMessage} 
                open={AlertMessage['Alert'] == "success" ? true : false}  
                onClose={() => { setAlertMessage([{Alert:"", Title:"", Message:"",}]) }} />
      :  AlertMessage['Alert'] == "warning" ? 
          <Alert.Warning 
                key="Warning" 
                AlertMessage={AlertMessage} 
                open={AlertMessage['Alert'] == "warning" ? true : false} 
                onClose={() => { setAlertMessage([{Alert:"", Title:"", Message:"",}]) }} />
      : null
      }

      <div className="ui segment basic">
        
        <h3 className="ui horizontal divider header">
            {selectedData.length === 0  ? "Add Form" : "Update Form" }
        </h3>
        <p>{message}</p>
        <br />

        <div className="ui form fitted left aligned">

        <div className='two fields'>

            <div className="field">
                  <label>Downline Account{id} </label>
                  <SUI.Dropdown
                        placeholder="Select account"
                        scrolling
                        fluid
                        selection
                        search={true}
                        multiple={false}
                        header="Select account"
                        onChange={downlineChange}
                        value={downlineID}
                        options={downlines}
                      />
          </div>
                
            <div className='field'>
                <label>Club</label>
                <UPL.Clubs dropdown={DDClubs} appID={appID} downID={downlineID}  clubID={clubID} />
            </div>

        </div>

        <div className='two fields'>

            <div className="field">
                <label>Upline Account</label>
                <UPL.Uplines dropdown={DDUplines} appID={appID} downID={downlineID} clubID={clubID} uplineID={uplineID}/>
            </div>

            <div className="field">
                <label>Percentage</label>
                <div className="ui left labeled right icon input">
                    <i className="percent icon violet"></i>
                    <input type="text" className='violetCenter' placeholder="0-100" value={percentage} onChange={(e) => Func.toHundred(e.currentTarget.value,setPercentage)}  />
                </div>
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
              :  status === "2" || status === "Inactive" ?
                <div className="ui button red center aligned" onClick={changeStatus}>
                  <i className="times circle outline icon"></i>
                  Inactive
                </div>
                : null
              } 
            </div>

          </div>

          <div className="ui section divider"></div>

            <Note.Error Note={NoteMessage} />

          <div className="ui segment center aligned basic">

              <div className="field">
                <div className="ui button purple " onClick={ValidateForm}>
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
      </>
    );
  };

  
