import React, { useLayoutEffect, useState, useRef  } from 'react';
import Papa from 'papaparse'; //INSTALL { npm i papaparse }
import { Accounts } from '../fetch/raw/accounts'
import { Clubs } from '../fetch/raw/clubs'
import { Uplines } from '../fetch/raw/uplines'
import { AccountsUpline } from '../fetch/raw/accountsupline'
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Set from '../constants';
import * as Func from '../functions';
import * as Rec from '../fetch/dropdowns/records'

export const MultipleRecords = ({selectData,saveCSVData,savedCSVData,CSVData,reCSVData}) => {

    const Club                                      = Clubs().data
    const UpAcct                                    = AccountsUpline().data
    const [JSONData, setJSONData]                   = useState('');
    const [message, setMessage]                     = useState("");
    const [dataChanged, setdataChanged]             = useState("");


    const CSVFileUpload = (event) => {
        const fileCSV = event.target.files[0];
        const reader = new FileReader();

        if (fileCSV.type !== 'text/csv') {
            setMessage('Please select a CSV file.');
        } else {
            reader.onload = (e) => {
                const csv = e.target.result;
                Papa.parse(csv, {
                complete: (i) => {
                    functionCSVtoJSON(i.data)
                },
                error: (err) => {
                    console.error('Error parsing CSV:', err);
                    setJSONData("")
                },
                });
            };
            reader.readAsText(fileCSV);
        }
    };
  
    useLayoutEffect(() => {
        
        setJSONData(savedCSVData)
    }, []);

    const functionCSVtoJSON = (csv) => {
        if (!Array.isArray(csv)) {
            setMessage('Invalid CSV data format (not an array)');
            setJSONData("")
        } else {
            const headerROW = csv[0];
            //if(headerROW[0] != "DATEUNTIL" || headerROW[1] != "CLUB" || headerROW[2] != "PLAYERID" || headerROW[3] != "WINNINGTOTAL" || headerROW[4] != "BONUSTOTAL" || headerROW[5] != "EXTRA" || headerROW[6] != "W-NLH" || headerROW[7] != "W-FLH" || headerROW[8] != "W-6+" || headerROW[9] != "W-PLOHI" || headerROW[10] != "W-PLIHiLo" || headerROW[11] != "W-MIXED" || headerROW[12] != "W-OFC" || headerROW[13] != "W-MTT" || headerROW[13] != "W-SNG" || headerROW[14] != "W-SPIN" || headerROW[15] != "B-NLH" || headerROW[16] != "B-FLH" || headerROW[17] != "B-6+" || headerROW[18] != "B-PLOHI" || headerROW[19] != "B-PLIHiLo" || headerROW[20] != "B-MIXED" || headerROW[21] != "B-OFC" || headerROW[22] != "B-MTT" || headerROW[23] != "B-SNG" || headerROW[24] != "B-SPIN"){
            if(headerROW[0] != "DATEUNTIL" || headerROW[1] != "CLUB" || headerROW[2] != "PLAYERID" || headerROW[3] != "WINNINGTOTAL" || headerROW[4] != "BONUSTOTAL"){
                setMessage("CSV wrong format!")
                setJSONData("")
            } else {
                let counter = 0
                function counted(){
                    counter = counter + 1
                }
                const jsonArray = csv.slice(1).map((rowData) => {
                    const jsonObject = {};
                    for (let i = 0; i < rowData.length; i++) {
                        jsonObject[headerROW[i]] = rowData[i];
                        counted()
                    }
                    return jsonObject;
                });

                const newData = jsonArray.map((i, index) => {
                    const c = Club.find(e => e.name == i.CLUB);
                    const u = UpAcct.find(e => e.accountID == i.PLAYERID );

                    return { 
                        KEY: index,
                        ...i, 
                        APPID: c ? c.appID : 0,
                        CLUBID: c ? c.idd : 0,
                        CLUBPERCENT: c ? c.percent : 0, 
                        UPLINEID: u ? u.uplineID : 0,
                        UPLINEPERCENT: u ? u.uplinePercent : 0,
                        MODIFIED: "NO",
                        DATEFROM: "",
                        FXUSD: "",
                        FXCURRENCY: "",
                        FXPROVIDER: "",
                        BONUSPERCENTAGE: "",
                        RESULT: "",
                        AGENCYACTION: "",
                        AGENCYBONUS: "",
                    }
                });
                console.log(newData)
                setJSONData(newData); 
                setMessage('Successful CSV Upload');
            }
          
        }
    };

    const deleteRow = (index) => {
        const updatedData = [...JSONData]; // Create a copy of the state array
        updatedData.splice(index, 1);
        setJSONData(updatedData);
        CSVData(updatedData)
        const countInput = parseInt(document.querySelectorAll("#countDiv").length)-1;
        if(countInput < 1){
            resetCSV()
        }
    };

    const resetCSV = () => {
        CSVData("")
        setJSONData("");
        setMessage('Please select a CSV file.');
    }
    
    const inputChange = (e, index, x) => {
        const updatedData = [...JSONData]; // Create a copy of the state array
        updatedData[index][x] = e.target.value;
        setJSONData(updatedData);
        saveCSVData(updatedData)
      };

    const onchangeRecord = (e) => {
            const updatedData = [...JSONData]; // Create a copy of the state array
            updatedData[e.index]["APPID"]           = e.appID;
            updatedData[e.index]["CLUB"]            = e.clubName;
            updatedData[e.index]["CLUBID"]          = e.clubIDD;
            updatedData[e.index]["CLUBPERCENT"]     = e.clubPercent;
            updatedData[e.index]["PLAYERID"]        = e.downlineID;
            updatedData[e.index]["UPLINEID"]        = e.uplineID;
            updatedData[e.index]["UPLINEPERCENT"]   = e.uplinePercent;
            setJSONData(updatedData);
    };

    return (
        <div className="ui segment basic">
          {
            !JSONData ? 
            <>
                    <h3 className="ui horizontal divider header  center aligned">
                        {message}
                    </h3>

                    <input type="file" id='csvFile'
                            style={{width:"100% !important"}}
                            className="ui message violet basic center aligned fluid CSVFile"
                            onChange={CSVFileUpload} />

                <a className='ui button purple tiny' href='./csv/csv_records.csv'>
                    <i className='download icon'></i> Download CSV short template
                </a>
            </>
            : 
            <div className='ui button red' onClick={()=>{ resetCSV() } }>
                <i className="trash alternate outline icon"></i>
                Reset CSV form
            </div>
          }

          <pre>{JSON.stringify(JSONData)}</pre>
          {JSONData && (
            <div>
                
                <form className='ui form fluid mini' id='FormCSV'>
                    <br />
                        <h3 className="ui horizontal divider header">
                            Uploaded CSV Form
                        </h3>
                    <br />
                        {JSONData.map((i, index) => (
                            <>
                            <div className='seven fields ui message fluid plusTop' id='countDiv' key={index} data={i.APPID}>
                                <div className="floating ui red circular icon label button" onClick={() => deleteRow(index)}>
                                    <i className='icon close'></i>
                                </div>

                                <div className='field'>
                                    <label>DATE UNTIL</label>
                                    <input type="date" value={i.DATEUNTIL} onChange={(e) => inputChange(e, index, "DATEUNTIL")}/>
                                </div>
                        
                                <Rec.DDRecordsItems onIndex={index} onClubName={(i.CLUB)} onPlayerID={(i.PLAYERID)} onSelect={onchangeRecord} />

                                <div className='field'>
                                    <label>WIN/LOSS TOTAL</label>
                                    <input className='violetCenter' value={i.WINNINGTOTAL} onChange={(e) => inputChange(e, index, "WINNINGTOTAL")} />
                                </div>

                                <div className='field'>
                                    <label>Bonus Total</label>
                                    <input className='violetCenter' value={i.BONUSTOTAL} onChange={(e) => inputChange(e, index, "BONUSTOTAL")} />
                                </div>

                            </div>
                            </>
                        ))}

                            <div className='field' style={{marginBottom:"55px"}}>
                                <div className="ui purple tertiary button right floated mini basic">
                                    <i className='plus icon'></i> 
                                    Add new row
                                </div>
                            </div>

                        <div className='ui segment basic center aligned'>
                                <div className='ui button violet large'  style={{minWidth:"180px"}} onClick={()=> selectData(JSONData)}>
                                    <i className='calculator icon'></i>
                                    Calculate 
                                </div>
                        </div>
                </form>
                
                
               
            </div>
          )}

            <div className='ui message black mini'>
                <h4>Converted JSON Data</h4>
                <pre>
                <pre>{JSON.stringify(JSONData, null, 2)}</pre>
                </pre>
            </div>
          
            <div className='ui message black hidden'>
                <h3>Fetched JSON: Accounts Active</h3>
                <pre>
                    {Func.stringify(AccountsUpline("CLUB","698216").data)}
                </pre>
            </div>

            <div className='ui message black hidden'>
                <h3>PROCESS:</h3>
                <p>Upload CSV file (with 2 valid format: long and short version)</p>
                <p>Detect CSV file format if correct, else re-upload CSV file</p>
                <p>An editable form will be automatically filled</p>
                <p>Clubs can be changed</p>
                <p>Upon club selection, accounts from the same app will be loaded as player accounts dropdown</p>
                <p>Player Accounts can be modified</p>
                <p>Upon club selection, uplines and percentage will be loaded</p>
                <p>If player ID is not in the system, will notify user to add account to server even without a user</p>
                <p>For new player id, upline must be will be requested for downline approval making the record on pending</p>
            </div>
            

        </div>
      );
}
