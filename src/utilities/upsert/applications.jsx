import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImagesApps } from '../fetch/raw/images'
import { Company } from '../fetch/raw/company'
import * as SUI from 'semantic-ui-react'
import * as Set from '../constants';
import * as Alert from "../alerts/alerts"

export const UpsertApplications = ({selectedData,recallData}) => {

  const Token = JSON.parse( localStorage.getItem('Token') );
  const imgDD = ImagesApps().data
  const compDD = Company().data
  const [AlertMessage, setAlertMessage] =   useState([{Alert:"", Title:"", Message:"",}]);

  const [loading, setLoading] =         useState(false);
  const [button, setButton] =           useState("Add New Data");
  const [cancels, setCancels] =           useState(false);

  const [appID, setappID] =             useState("0");
  const [appName, setappName] =         useState("");
  const [appCompany, setappCompany] =   useState("");
  const [appDetails, setappDetails] =   useState("");
  const [appImage, setappImage] =       useState("");
  const [appStatus, setappStatus] =     useState("0");

  let Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  D: Set.TimeZoned,
                  appID,
                  appName,
                  appCompany,
                  appDetails,
                  appImage,
                  appStatus
              };

    Upsert = Object.fromEntries(
        Object.entries(Upsert).map(([key, value]) => [key, value.toString().trim()])
    );

    const AllGotValues = [appName,appCompany]
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
        } else {
          //console.log(JSON.stringify(Upsert))
          reCheckValues()
          SubmitForm()
        }
    }

    const cancel = () => {
      setappID("0")
      setButton("Add New Data")
      setCancels(false)
    }

    const resetForm = () => {
      setappID("0")
      setappName("")
      setappCompany("")
      setappDetails("")
      setappImage("")
      setappStatus("0")

      setButton("Add New Data")
      setLoading(false)
      setCancels(false)
    }

    const reCheckValues = () => {
        if(Upsert.appImage === null || Upsert.appImage === undefined || Upsert.appImage === "" ){
            Upsert["appImage"] = "1";
        }
        if(Upsert.details === null || Upsert.details === undefined || Upsert.details === "" ){
            Upsert["details"] = "";
        }
    }

    const fromTable = () => {

      setappID(selectedData.id === null || selectedData.id === undefined ? "" : selectedData.id)
      setappName(selectedData.name === null || selectedData.name === undefined ? "" : selectedData.name)
      setappImage(selectedData.image === null || selectedData.image === undefined ? "0" : selectedData.image)
      setappCompany(selectedData.company === null || selectedData.company === undefined ? "" : selectedData.company)
      setappDetails(selectedData.details === null || selectedData.details === undefined ? "" : selectedData.details)
      setappStatus(selectedData.status === null || selectedData.status === undefined ? "" : selectedData.status)

      if(selectedData.id == 0 || selectedData.id == null) {
        setButton("Add New Data")
        setappStatus("0")
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
      if(appStatus=="0" || appStatus=="Active"){
        setappStatus("2")
      } else {
        setappStatus("0")
      }
    }

    async function SubmitForm() {
      setLoading(true)
      try {
        
        const response = await axios.post(Set.Upsert['applications'], Upsert);
        console.log(response.data)

        if(response.data.includes("Duplicate")){
            const number = parseFloat( response.data.match(/[\d.]+/) );
            setappID( number )
            setAlertMessage({
                Alert: "warning",
                Title: "Duplicate!",
                Message: "Please check application ID#"+ number,
            });
            setButton("Proceed to Update")
            setCancels(true)
        } else if(response.data.includes("Added")){
            setAlertMessage({
                Alert: "success",
                Title: "Success!",
                Message: "New poker application added",
            });
            recallData(1)
            resetForm()
        } else if(response.data.includes("Updated")){
            setAlertMessage({
                Alert: "success",
                Title: "Success!",
                Message: "Poker application updated",
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
        console.error("Error fetching data: ", error);
      }
    }

    return (
          <>
      { AlertMessage['Alert'] == "success" ? 
          <Alert.Success
                key="Success" 
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
        <h3 class="ui horizontal divider header">
          Insert / Update Applications
        </h3>
        <br />
        <div className="ui form">

          <div className='three fields'>

              <div className="field">
                <label>Name</label>
                <input type="text" placeholder='Name' value={appName} onChange={(e) => setappName( e.currentTarget.value )}/>
              </div>

              <div className="field">
              <label>Company</label>
              <SUI.Dropdown
                    placeholder="Select company"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={false}
                    multiple={false}
                    header="Select company"
                    onChange={(event, { value }) => { setappCompany(value); }}
                    value={appCompany}
                    options={compDD.map(i => {
                      return {
                        key: i.id,
                        text: i.name,
                        value: i.id,
                        image: { avatar: true, src: i.imageFull },
                      };
                    })}
                  />
            </div>

          </div>

          <div className="field">
              <label>Image</label>
              <SUI.Dropdown
                    placeholder="Select image"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={false}
                    multiple={false}
                    header="Select image"
                    onChange={(event, { value }) => { setappImage(value); }}
                    value={appImage}
                    options={imgDD.map(i => {
                      return {
                        key: i.id,
                        text: i.name,
                        value: i.id,
                        image: { avatar: true, src: i.pathFull },
                      };
                    })}
                  />
            </div>

            <div className="field">
              <label>Details</label>
              <textarea type="text" rows="2" placeholder='Other details (100)' value={appDetails} onChange={(e) => setappDetails(e.currentTarget.value)}/>
          </div>

          <div className='two fields'>

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

          <div class="ui horizontal inverted divider">
            <div className="field center aligned">
              <div className="ui button purple" onClick={ValidateForm}>
                <i className="plus icon"></i>
                {button}
              </div>
              { cancels ?  <>
                <div className="ui button grey basic" onClick={cancel}>
                  <i className='icon times'></i>
                  Cancel
                </div>
                <div className="ui button grey basic" onClick={resetForm}>
                  <i className="eraser icon"></i>
                  Clear
                </div>
              </> :  null }
            </div>
          </div>





        </div>
      </div>
          </>
      
    );
  };
  