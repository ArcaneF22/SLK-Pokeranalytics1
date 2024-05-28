import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Set from '../constants';
import * as Alert from "../alerts/alerts"

export const UpsertFXUSD = ({selectedData,recallData,resetSelected}) => {
  const [AlertMessage, setAlertMessage] =   useState([{Alert:"", Title:"", Message:"",}]);

  const Token = JSON.parse( localStorage.getItem('Token') );
  const [loading, setLoading] =           useState(false);
  const [button, setButton] =             useState("Add New Data");
  const [cancels, setCancels] =           useState(false);
  const [selected, setSelected] =         useState(selectedData ? selectedData : null);

  const [fxID, setfxID] =                    useState("0");
  const [fxProvider, setfxProvider] =        useState("");
  const [fxDatestamp, setfxDatestamp] =      useState("");
  const [fxRates, setfxRates] =              useState("");
  const [fxStatus, setfxStatus] =            useState("0");


  async function SubmitForm() {
    console.log(Upsert)
    try {
      const response = await axios.post(Set.Upsert['fxUSD'], Upsert);
      console.log(response.data)

      if(response.data.includes("Duplicate")){
        const number = parseFloat( response.data.match(/[\d.]+/) );
        setfxID( number )
        setButton("Proceed to Update")
          setAlertMessage({
              Alert: "warning",
              Title: "Found duplicate!",
              Message: "Please check exchange rate ID#"+ number,
          });
        setCancels(true)
    } else if(response.data.includes("Added")){
          setAlertMessage({
              Alert: "success",
              Title: "Success!",
              Message: "Exhange rate added",
          });
        recallData(1)
        resetForm()
    } else if(response.data.includes("Updated")){
          setAlertMessage({
              Alert: "success",
              Title: "Success!",
              Message: "Exhange rate updated",
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
                key="Warning" 
                AlertMessage={AlertMessage} 
                open={AlertMessage['Alert'] == "warning" ? true : false} 
                onClose={() => { setAlertMessage([{Alert:"", Title:"", Message:"",}]) }} />
      : null
      }

      <div className="ui segment basic left aligned">
        <h3 className="ui horizontal divider header">
          Insert / Update Exchange Rate
        </h3>
        <br />

        <div className="ui form fitted">

          <div className='two fields'>

          <div className="field">
              <label>ID</label>
              <input type="text" value={fxID} onChange={(e) => setfxID(e.currentTarget.value)}/>
            </div>

          </div>

          <div className='two fields'>

            <div className="field">
              <label>Provider</label>
              <input type="text" value={fxProvider} onChange={(e) => setfxProvider(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Date Stamp</label>
              <input type="number" value={fxDatestamp} onChange={(e) => setfxDatestamp(e.currentTarget.value)}/>
            </div>

          </div>

          <div className='two fields'>
          
            <div className="field">
              <label>Rates</label>
              <textarea rows="4" cols="50" value={fxDatestamp} onChange={(e) => setfxDatestamp(e.currentTarget.value)}/>
            </div>

          </div>

          <div className='three fields'>

              <div className="field">
                  <label>Status</label>
                  { fxStatus === "0" || fxStatus === "Active" ? 
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
          </>
    );
  };
  