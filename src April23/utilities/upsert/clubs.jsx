import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import { Applications } from '../fetch/raw/applications'
import { ImagesClubs } from '../fetch/raw/images'
import { Unions } from '../fetch/raw/unions'
import * as Set from '../constants';

export const UpsertClubs = ({selectedData,recallData}) => {
  const appDD = Applications().data
  const imgDD = ImagesClubs().data
  const uniDD = Unions().data

  const Token = JSON.parse( localStorage.getItem('Token') );
  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");
  const [button, setButton] =           useState("Add New Club");
  const [cancels, setCancels] =           useState(false);

  const [clubID, setclubID] =               useState("0");
  const [clubIDD, setclubIDD] =             useState("");
  const [clubName, setclubName] =           useState("");
  const [clubImage, setclubImage] =         useState("0");
  const [clubApp, setclubApp] =             useState("");
  const [clubDetails, setclubDetails] =     useState("0");
  const [clubType, setclubType] =           useState("0");
  const [clubUnion, setclubUnion] =         useState("0");
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

  const AllGotValues = [clubIDD,clubName,clubImage,clubApp,clubDetails,clubType,clubUnion]
  const YesWithvalues = AllGotValues.every(value => Boolean(value));

  const validate = (e) => {
    e.preventDefault()
    setLoading(true)
      if(!YesWithvalues){
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
    setclubID(selectedData.id)
    setclubIDD(selectedData.idd)
    setclubName(selectedData.name)
    setclubImage(selectedData.image)
    setclubApp(selectedData.app)
    setclubDetails(selectedData.details)
    setclubType(selectedData.type)
    setclubUnion(selectedData.union)
    if(selectedData.status=="0" || selectedData.status=="Active"){
      setclubStatus("0")
    } else if(selectedData.status=="Pending"){
      setclubStatus("1")
    } else {
      setclubStatus("2")
    }

    if(selectedData.id == 0) {
      setButton("Add New Club")
      setCancels(false)
    } else {
      setButton("Proceed to Update")
      setCancels(true)
    }
    
  }, [selectedData.clicked]);

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
        recallData(1)
        clearInput()
    } else if(response.data.includes("Updated")){
        setMessage("Poker club successfully updated!");
        recallData(1)
        clearInput()
    } else {
      setMessage("Something went wrong! Please retry");
      clearInput()
    }
      
    } catch (error) {
      setMessage(error);
      console.error("Error submission: ", error);
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
              <Dropdown
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

            <div className="field">
              <label>Application</label>
              <Dropdown
                    placeholder="Select"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={false}
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

            <div className="field">
              <label>Details</label>
              <input type="text" value={clubDetails} onChange={(e) => setclubDetails(e.currentTarget.value)}/>
            </div>

            <div className="field">
              <label>Type</label>
              <Dropdown
                    placeholder="Select type"
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
              <Dropdown
                    placeholder="Select union"
                    scrolling
                    clearable
                    fluid
                    selection
                    search={false}
                    multiple={false}
                    header="Select union"
                    onChange={(event, { value }) => { setclubUnion(value); }}
                    value={clubUnion}
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
  