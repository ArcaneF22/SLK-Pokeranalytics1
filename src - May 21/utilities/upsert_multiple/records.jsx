import React, { useLayoutEffect, useState, useRef  } from 'react';
import Papa from 'papaparse'; //INSTALL { npm i papaparse }
import { Accounts } from '../fetch/raw/accounts'
import { AccountsUpline } from '../fetch/raw/accountsupline'
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Func from '../functions';
import * as Rec from '../fetch/dropdowns/records'

export const MultipleRecords = ({selectData,CSVData,reCSVData}) => {

    const acctDD                                    = Accounts().data
    const [JSONData, setJSONData]                   = useState('');
    const [message, setMessage]                     = useState("");
    const [csvLoaded, setcsvLoaded]                 = useState(false);
    const [CSVHeader, setCSVHeader]                 = useState("");

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
                    console.log(i.data);
                    setCSVHeader(i.data[0])
                    CSVData(i.data)
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
        if(reCSVData != 0){
            functionCSVtoJSON(reCSVData)
        }
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

                const jsonArray = csv.slice(1).map((rowData) => {
                    const jsonObject = {};
                    for (let i = 0; i < rowData.length; i++) {
                    jsonObject[headerROW[i]] = rowData[i];
                    }
                    return jsonObject;
                });
                setJSONData(jsonArray); 
                setMessage('Successful CSV Upload');
                setcsvLoaded(true)
            }
          
        }
    };

    const deleteRow = (index) => {
        const updatedData = [...JSONData]; // Create a copy of the state array
        updatedData.splice(index, 1);
        setJSONData(updatedData);
        const countInput = parseInt(document.querySelectorAll("#countDiv").length)-1;
        if(countInput < 1){
            resetCSV()
        }
    };

    const resetCSV = () => {
        CSVData("")
        setcsvLoaded(false);
        setJSONData("");
        setMessage('Please select a CSV file.');
    }
    
    const inputChange = (e, index, x) => {
        const updatedData = [...JSONData]; // Create a copy of the state array
        updatedData[index][x] = e.target.value;
        setJSONData(updatedData);
      };

      const dropdownChange = (e, index, x) => {
        const updatedData = [...JSONData]; // Create a copy of the state array
        updatedData[index][x] = e;
        setJSONData(updatedData);
      };




      const downlines = acctDD.map(i => {
            return {
                key:    i.accountID,
                text:   i.accountID+": "+i.accountNickname,
                value:  i.accountID,
                image:  { avatar: true, src: i.userAvatar },
                app:    i.appID ? i.appID : 0,
                club:   i.clubID ? i.clubID : 0,
            };
      })

      const autoSelect = (key) => {
        const i = JSON.stringify(key)
        return i;
      };

      const downlineChange = (event, i) => {
        const s = downlines.find(o => o.value === i.value);
        setappID(s.key ? s.ddd : 0);

      };

      const dropdownRef = useRef(null);

      const handleSelectOption = (value) => {
        dropdownRef.current.value = value; // Set the dropdown value
        if (onSelect) onSelect(value); // Optional callback for selection handling
      };


      const [onSelected, setonSelected]                 = useState("");
      const onSelect = (value) => {
        setonSelected(value)
      };


    return (
        <div className="ui segment basic">
          {
            !csvLoaded ? 
            <>
                    <h3 className="ui horizontal divider header  center aligned">
                        {message}
                    </h3>
                    <input type="file" id='csvFile'
                            style={{width:"100% !important"}}
                            className="ui message violet basic center aligned fluid CSVFile"
                            onChange={CSVFileUpload} />

                <a className='ui button purple' href='./csv/csv_records.csv'>Download CSV template</a>
            </>
            : 
            <div className='ui button red' onClick={()=>{ resetCSV() } }>
                <i className="trash alternate outline icon"></i>
                Reset CSV form
            </div>
          }
          
          {/* CSV to JSON Format */}
          {JSONData && (
            <div>
                
                <form className='ui form tiny' id='FormCSV'>
                    <br />
                        <h3 className="ui horizontal divider header">
                            Uploaded CSV Form
                        </h3>
                    <br />
                        {JSONData.map((i, index) => (
                            <div className='fields ui message plusTop' id='countDiv' key={index}>
                                <div className='field'>
                                    <label>Action</label>
                                    <div className='ui button red icon basic' onClick={() => deleteRow(index)}>
                                        <i className='icon close'></i>
                                    </div>
                                </div>

                                <div className='field'>
                                    <label>Date Until</label>
                                    <input type="date" value={i.DATEUNTIL} onChange={(e) => inputChange(e, index, "DATEUNTIL")}/>
                                </div>

                                <Rec.DDAccountsClubs onFor={"ALL"} onWhat={""} onDefault={(i.CLUB)} onSelect={onSelect} />
                                <Rec.DDAccountsUpline onFor={"ALL"} onWhat={""} onDefault={(i.PLAYERID)} onSelect={onSelect} />

                                <div className='field'>
                                    <label>Win/Loss Total</label>
                                    <input value={i.WINNINGTOTAL} onChange={(e) => inputChange(e, index, "WINNINGTOTAL")} />
                                </div>
                                <div className='field'>
                                    <label>Bonus Total</label>
                                    <input value={i.BONUSTOTAL} onChange={(e) => inputChange(e, index, "BONUSTOTAL")} />
                                </div>
                            </div>
                        ))}
                        <div className='ui segment basic center aligned'>
                                <div className='ui button violet large' onClick={()=> selectData(JSONData)}>
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
