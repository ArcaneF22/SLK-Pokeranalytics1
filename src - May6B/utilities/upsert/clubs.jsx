import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import { Applications } from '../fetch/raw/applications'
import { ImagesClubs } from '../fetch/raw/images'
import { Unions } from '../fetch/raw/unions'
import * as Set from '../constants';
import * as Alert from "../alerts/alerts"

export const UpsertClubs = ({selectedData,recallData}) => {
  const appDD = Applications().data
  const imgDD = ImagesClubs().data
  const uniDD = Unions().data
  const [AlertMessage, setAlertMessage] =   useState([{Alert:"", Title:"", Message:"",}]);

  const Token = JSON.parse( localStorage.getItem('Token') );
  const [loading, setLoading] =           useState(false);
  const [button, setButton] =             useState("Add New Data");
  const [cancels, setCancels] =           useState(false);
  const [selected, setSelected] =         useState(selectedData ? selectedData : null);

  const [clubID, setclubID] =               useState("0");
  const [clubIDD, setclubIDD] =             useState("");
  const [clubName, setclubName] =           useState("");
  const [clubImage, setclubImage] =         useState("0");
  const [clubApp, setclubApp] =             useState("");
  const [clubDetails, setclubDetails] =     useState("0");
  const [clubType, setclubType] =           useState("0");
  const [clubUnion, setclubUnion] =         useState("0");
  const [clubStatus, setclubStatus] =       useState("0");

  let Upsert = {
                  A: Token['id'],
                  B: Token['token'],
                  C: Token['gadget'],
                  D: Set.TimeZoned,
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

  Upsert = Object.fromEntries(
      Object.entries(Upsert).map(([key, value]) => [key, value.toString().trim()])
  );

  const AllGotValues = [clubIDD,clubName,clubApp,clubType]
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
        if(clubType == "UNION" && (clubUnion == "" || clubUnion == undefined || clubUnion == null)){
          setAlertMessage({
              Alert: "warning",
              Title: "Incomplete!",
              Message: "Please select a club union",
          });
        } else {
          console.log(JSON.stringify(Upsert))
          reCheckValues()
          SubmitForm()
        }
      }
  }

  const cancel = () => {
    setclubID("0")
    setButton("Add New Data")
    setCancels(false)
  }

  const resetForm = () => {
    

    setclubID("0")
    setclubIDD("")
    setclubName("")
    setclubImage("")
    setclubApp("")
    setclubDetails("")
    setclubType("")
    setclubUnion("")
    setclubStatus("0")
    
    setButton("Add New Data")
    setLoading(false)
    setCancels(false)

  }

  const reCheckValues = () => {
    if(Upsert.clubImage === null || Upsert.clubImage === undefined || Upsert.clubImage === "" ){
        Upsert["clubImage"] = "1";
    }
    if(Upsert.clubDetails === null || Upsert.clubDetails === undefined || Upsert.clubDetails === "" ){
        Upsert["clubDetails"] = "";
    }
    if(Upsert.clubUnion === null || Upsert.clubUnion === undefined || Upsert.clubUnion === "" ){
      Upsert["clubUnion"] = " ";
    }
}


  const fromTable = () => {

    setclubID(selected.id === null || selected.id === undefined ? "0" : selected.id)
    setclubIDD(selected.idd === null || selected.idd === undefined ? "" : selected.idd)
    setclubName(selected.name === null || selected.name === undefined ? "" : selected.name)
    setclubImage(selected.image === null || selected.image === undefined ? "" : selected.image)
    setclubApp(selected.app === null || selected.app === undefined ? "" : selected.app)
    setclubDetails(selected.details === null || selected.details === undefined ? "" : selected.details)
    setclubType(selected.type === null || selected.type === undefined ? "" : selected.type)
    setclubUnion(selected.union === null || selected.union === undefined ? "" : selected.union)
    if(selected.status=="0" || selected.status=="Active"){
      setclubStatus("0")
    } else if(selected.status=="Pending"){
      setclubStatus("1")
    } else {
      setclubStatus("2")
    }

    if(selected.id == "0" || selected.id == null) {
      setButton("Add New Data")
      setclubStatus("0")
      setCancels(false)
    } else {
      setButton("Proceed to Update")
      setCancels(true)
    }

  }

  useEffect(() => {
      fromTable()
  }, [selected.clicked]);

  const changeStatus = () => {
    if(clubStatus=="0"){
      setclubStatus("2")
    } else {
      setclubStatus("0")
    }
  }

  async function SubmitForm() {
    //setLoading(true)
    console.log(Upsert)
    try {
      const response = await axios.post(Set.Upsert['clubs'], Upsert);
      console.log(response.data)

      if(response.data.includes("Duplicate")){
        const number = parseFloat( response.data.match(/[\d.]+/) );
        setclubID( number )
        setButton("Proceed to Update")
          setAlertMessage({
              Alert: "warning",
              Title: "Duplicate!",
              Message: "Please check club ID#"+ number,
          });
        setCancels(true)
    } else if(response.data.includes("Added")){
          setAlertMessage({
              Alert: "success",
              Title: "Success!",
              Message: "Poker club added",
          });
        recallData(1)
        resetForm()
    } else if(response.data.includes("Updated")){
          setAlertMessage({
              Alert: "success",
              Title: "Success!",
              Message: "Poker club updated",
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
        <h3 class="ui horizontal divider header">
          Insert / Update Clubs
        </h3>
        <br />

        <div className="ui form">

          <div className='two fields'>

          <div className="field">
              <label>Application</label>
              <SUI.Dropdown
                    placeholder="Select application"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={true}
                    multiple={false}
                    header="Select application"
                    onChange={(event, { value }) => { setclubApp(value); }}
                    value={clubApp}
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

          </div>

          <div className='two fields'>

          <div className="field">
              <label>Club Name</label>
              <input type="text" value={clubName} onChange={(e) => setclubName(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Club ID</label>
              <input type="number" value={clubIDD} onChange={(e) => setclubIDD(e.currentTarget.value)}/>
            </div>

          </div>

          <div className='two fields'>

              <div className="field">
                <label>Type</label>
                <SUI.Dropdown
                      placeholder="Select type"
                      scrolling
                      clearable
                      fluid
                      selection
                      search={false}
                      header="Select type"
                      onChange={(event, { value }) => { setclubType(value); }}
                      value={clubType}
                      options={Set.unionType}
                    />

              </div>

              <div className="field">
                <label>Union</label>
                <SUI.Dropdown
                      placeholder="Select union"
                      scrolling
                      clearable
                      fluid
                      selection
                      search={true}
                      multiple={false}
                      header="Select union"
                      onChange={(event, { value }) => { setclubUnion(value); }}
                      disabled={clubType == "UNION" ? false : true}
                      value={clubType == "UNION" ? clubUnion : "" }
                      options={uniDD.map(i => {
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
              <label>Details</label>
              <textarea type="text" rows="2" placeholder='Other details (100)' value={clubDetails} onChange={(e) => setclubDetails(e.currentTarget.value)}/>
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
                      onChange={(event, { value }) => { setclubImage(value); }}
                      value={clubImage}
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

          <div className='two fields'>



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

           
          <div class="ui horizontal  inverted divider">
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
  