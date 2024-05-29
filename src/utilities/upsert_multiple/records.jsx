import React, { useLayoutEffect, useState, useRef  } from 'react';
import Papa from 'papaparse'; //INSTALL { npm i papaparse }

import { Accounts } from '../fetch/raw/accounts'
import { Clubs } from '../fetch/raw/clubs'
import { Uplines } from '../fetch/raw/uplines'
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Set from '../constants';
import * as Func from '../functions';
import { FormRecords } from '../fetch/forms/records'

export const MultipleRecords = ({updateJSON,returnJSON,reRenders}) => {

    const DataClubs                         = Clubs().data
    const [JSONData, setJSONData]           = useState([]);
    const [CSVType, setCSVType]             = useState("");
    const [returnedData, setreturnedData]   = useState([]);
    const [message, setMessage]             = useState("");

    function clearJSON(){
        setMessage("")
        setCSVType("")
        setJSONData([]);
        updateJSON([])
    }

    useLayoutEffect(() => {
        if(updateJSON.length != 0){
            setJSONData(returnJSON)
        }
    }, []);

    const fileParse = (e) => {
      const file = e.target.files[0];
            if(file.type !== 'text/csv' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ){
                setMessage("Not a valid file")
                setJSONData([]);
            } else {
                Papa.parse(file, {
                    complete: (i) => {
                        if(i.data[0][0] == "DATEUNTIL" || i.data[0][1] == "CLUB" || i.data[0][2] == "PLAYERID" || i.data[0][3] == "WINNINGTOTAL" || i.data[0][4] == "BONUSTOTAL"){
                            console.log(i.data.slice(1).DATEUNTIL)
                            setJSONData( Func.shortFileFormat(i.data[0],i.data.slice(1)) );
                            setCSVType("Short")
                            setMessage("")
                        } else if (i.data[1][0] == "DATEUNTIL" || i.data[1][1] == "CLUB" || i.data[1][2] == "PLAYERID" || i.data[1][3] == "NLH" || i.data[1][4] == "FLH" || i.data[1][5] == "6+" || i.data[1][6] == "PLO Hi" || i.data[1][7] == "FLO Hi" || i.data[1][8] == "MIXED" || i.data[1][9] == "OFC" || i.data[1][10] == "MTT" || i.data[1][11] == "SNG" || i.data[1][12] == "SPIN" || i.data[1][13] == "OTHERS" || i.data[1][14] == "NLH" || i.data[1][15] == "FLH" || i.data[1][16] == "6+" || i.data[1][17] == "PLO Hi" || i.data[1][18] == "FLO Hi" || i.data[1][19] == "MIXED" || i.data[1][20] == "OFC" || i.data[1][21] == "MTT" || i.data[1][22] == "SNG" || i.data[1][23] == "SPIN" || i.data[1][24] == "OTHERS"){                            
                            setJSONData( Func.longFileFormat(i.data[1],i.data.slice(2)) );
                            setCSVType("Long")
                            setMessage("")
                        } else {
                            setMessage("Wrong format! Please check downloadable templates.")
                        }
                    },
                });
        }
    };

    const inputChange = (value, index, x) => {
        const updatedData = [...JSONData]; // Create a copy of the state array
        updatedData[index][x] = value;
        setJSONData(updatedData);
      };

    useLayoutEffect(() => {
        if(JSONData.length != 0){
            updateJSON(JSONData)
        }
    }, [JSONData]);

    const onchangeRecord = (e) => {
        setreturnedData(e)
        if(e){
                const updatedData = [...JSONData]; // Create a copy of the state array
                updatedData[e.index]["EDITED"]            = e.edited
                updatedData[e.index]["INCOMPLETE"]        = e.incomplete
                updatedData[e.index]["APPID"]             = e.appID
                updatedData[e.index]["CLUB"]              = e.clubName
                updatedData[e.index]["CLUBID"]            = e.clubIDD
                updatedData[e.index]["CLUBPERCENT"]       = e.clubPercent
                updatedData[e.index]["PLAYERID"]          = e.playerID
                updatedData[e.index]["UPLINEID"]          = e.uplineID
                updatedData[e.index]["UPLINEPERCENT"]     = e.uplinePercent
        }
    };

    const incKeys = [];
    const onIncomplete = (i) => {
        JSONData.map((i,index) =>{
            if(i.DATEUNTIL == "" || i.CLUBID == "" || i.PLAYERID == "" || i.APPID == "" || i.WINNINGTOTAL == "" || i.BONUSTOTAL == "" || i.INCOMPLETE != ""){
                incKeys.push(index);
            }
        } )
        const e = incKeys.includes(i);
        if(e){
            return "red"
        } else {
            return ""
        }
    }

    const deleteRow = (i) => {
        const filteredArray = JSONData.filter((item, index) => index !== i);
        setJSONData(filteredArray);
        updateJSON(filteredArray)
        reRenders(false)
        const countInput = parseInt(document.querySelectorAll("#countDiv").length)-1;
        if(countInput == 0){
            clearJSON()
        }
    };

    const onCalculate = () => {
        if(incKeys == ""){
            console.log("Not empty "+String(incKeys))
        } else {
            console.log("Not empty "+String(incKeys))
        }
    }

        return (
            <div>
                <p>{message ? message : null}</p>
                {!JSONData.length > 0 ? (
                    <>
                    <input type="file" id='csvFile'
                                style={{width:"100% !important"}}
                                className="ui message violet basic center aligned fluid CSVFile"
                                onChange={fileParse} />
                    <a className='ui button purple tiny' href='./csv/template_shortrecords.csv'>
                        <i className='download icon'></i> Short CSV template
                    </a>
                    <a className='ui button purple tiny' href='./csv/template_longrecords.csv'>
                        <i className='download icon'></i> Long CSV template
                    </a>
                    </>
                ) : (
                    <>
                        <div className='ui button red' onClick={()=>{ clearJSON() } }>
                            <i className="trash alternate outline icon"></i>
                            Reset CSV Form ({CSVType + " Template"}) 
                        </div>
    
                        <br />
                        <br />
                        <div className='ui form compact mini'>
                            <div className='fields'>
                                <div className='field'>
                                    
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
    
                        <div className='ui form compact mini'>
                            {JSONData.map((i, index) => (
                                <div key={index} id="countDiv" className={'seven fields ui message fluid plusTop '+onIncomplete(index)}>
                                    <div className="floating ui red circular icon label button centered" onClick={() => deleteRow(index)}>
                                        <i className='times icon'></i>
                                    </div>
                                    <div className='field'>
                                        <label>
                                            Date Until
                                        </label>
                                        <input type='date' value={i.DATEUNTIL} onChange={(e) => inputChange(e.target.value, index, "DATEUNTIL")} />
                                    </div>
                                    {
                                        
                                    }
                                        <FormRecords formData={{    Index:          index, 
                                                                    Edited:         i.EDITED,
                                                                    AppID:          i.APPID, 
                                                                    ClubName:       i.CLUB, 
                                                                    ClubIDD:        i.CLUBIDD, 
                                                                    ClubPercent:    i.CLUBPERCENT, 
                                                                    PlayerID:       i.PLAYERID, 
                                                                    UplineID:       i.UPLINEID, 
                                                                    UplinePercent:  i.UPLINEPERCENT, 
                                                                }} 
                                            returnData={onchangeRecord}/>

    
                                    <div className='field'>
                                        <label>Win/Loss Total</label>
                                        <input type='text' value={i.WINNINGTOTAL} onChange={(e) => inputChange(Func.byDecimals(e.target.value), index, "WINNINGTOTAL")} />
                                    </div>
                                    <div className='field'>
                                        <label>Bonus Total</label>
                                        <input type='text' value={i.BONUSTOTAL} onChange={(e) => inputChange(Func.byDecimals(e.target.value), index, "BONUSTOTAL")} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='field'>
                            <div className='ui segment basic noBorder right aligned'>
                                <div className='ui button tiny basic purple' onClick={onCalculate} style={{minWidth:"150px"}}>
                                    <i className='plus icon'></i>
                                    Add Row
                                </div>
                            </div>
                        </div>
                        {incKeys == "" ? 
                            <div className='field'>
                                <div className='ui segment basic noBorder center aligned'>
                                    <div className='ui button purple' onClick={onCalculate} style={{minWidth:"150px"}}>
                                        <i className='plus icon'></i>
                                        Calculate
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='field'>
                                <div className='ui segment basic noBorder center aligned'>
                                    <div className='ui button red loading disabled' style={{minWidth:"150px"}}>
                                        <i className='plus icon'></i>
                                        Incomplete
                                    </div>
                                </div>
                            </div>
                        }
    
                    </>
                )}
    
                {JSONData.length > 0 && (
                    <div className='ui message black mini'>
                        <h4>Uploaded CSV to JSON</h4>
                        <pre>{JSON.stringify(JSONData,0,2)}</pre>
                    </div>
                )}
                
        </div>
          )

}
