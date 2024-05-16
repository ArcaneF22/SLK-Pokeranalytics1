import React, { useLayoutEffect, useState } from 'react';
import Papa from 'papaparse'; //INSTALL { npm i papaparse }
import axios from 'axios';

export const MultipleRecords = ({selectData}) => {
    const [JSONData, setJSONData] = useState('');
    const [message, setMessage] = useState("");
    const [csvLoaded, setcsvLoaded] = useState(false);

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
                    functionCSVtoJSON(i.data);
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
  
    const functionCSVtoJSON = (csvArray) => {
        if (!Array.isArray(csvArray)) {
            setMessage('Invalid CSV data format (not an array)');
            setJSONData("")
        } else {
            const headerROW = csvArray[0];
            //if(headerROW[0] != "DATEUNTIL" || headerROW[1] != "CLUB" || headerROW[2] != "PLAYERID" || headerROW[3] != "WINNINGTOTAL" || headerROW[4] != "BONUSTOTAL" || headerROW[5] != "EXTRA" || headerROW[6] != "W-NLH" || headerROW[7] != "W-FLH" || headerROW[8] != "W-6+" || headerROW[9] != "W-PLOHI" || headerROW[10] != "W-PLIHiLo" || headerROW[11] != "W-MIXED" || headerROW[12] != "W-OFC" || headerROW[13] != "W-MTT" || headerROW[13] != "W-SNG" || headerROW[14] != "W-SPIN" || headerROW[15] != "B-NLH" || headerROW[16] != "B-FLH" || headerROW[17] != "B-6+" || headerROW[18] != "B-PLOHI" || headerROW[19] != "B-PLIHiLo" || headerROW[20] != "B-MIXED" || headerROW[21] != "B-OFC" || headerROW[22] != "B-MTT" || headerROW[23] != "B-SNG" || headerROW[24] != "B-SPIN"){
            if(headerROW[0] != "DATEUNTIL" || headerROW[1] != "CLUB" || headerROW[2] != "PLAYERID" || headerROW[3] != "WINNINGTOTAL" || headerROW[4] != "BONUSTOTAL"){
                setMessage("CSV wrong format!")
                setJSONData("")
            } else {

                const jsonArray = csvArray.slice(1).map((rowData) => {
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
        setcsvLoaded(false);
        setJSONData("");
        setMessage('Please select a CSV file.');
    }
    
    const inputChange = (e, index, x) => {
        const updatedData = [...JSONData]; // Create a copy of the state array
        updatedData[index][x] = e.target.value;
        setJSONData(updatedData);
      };

      const statusChange = (e, index, x) => {
        if(x=="Active"){
            alert("Active")
        } else if(x=="Pending"){
            alert("Pending")
        } else {
            alert("Inactive")
        }
      };

    function setStatus(i) {
        if (i.status == "Active") {
          return  <div className='ui button green basic' onClick={(e) => statusChange(e, index, "Pending")}>
                      <i className="check circle outline icon"></i>
                      Active
                  </div>;
        } else if (i.status == "Pending") {
          return  <div className='ui button yellow basic' onClick={(e) => statusChange(e, index, "Inactive")}>
                      <i className="spinner icon"></i>
                      Pending
                  </div>;
        } else {
          return  <div className='ui button red basic' onClick={(e) => statusChange(e, index, "Active")}>
                      <i className="times circle outline icon"></i>
                      Inactive
                  </div>;
        }
    }

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
                
                <form className='ui form' id='FormCSV'>
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
                                    <input value={i.DATEUNTIL} onChange={(e) => inputChange(e, index, "DATEUNTIL")}/>
                                </div>
                                <div className='field'>
                                    <label>Club</label>
                                    <input value={i.CLUB} onChange={(e) => inputChange(e, index, "CLUB")}/>
                                </div>
                                <div className='field'>
                                    <label>Player ID</label>
                                    <input value={i.PLAYERID} onChange={(e) => inputChange(e, index, "PLAYERID")} />
                                </div>
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
                <h2>Converted JSON Data</h2>
                <pre>{JSON.stringify(JSONData, null, 2)}</pre>
            </div>
          )}
        </div>
      );
}
