import React, { useLayoutEffect, useState } from 'react';
import Papa from 'papaparse'; //INSTALL { npm i papaparse }
import axios from 'axios';

export const MultipleUplines = () => {
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
            if(headerROW[0] != "idd" || headerROW[1] != "Upline" || headerROW[2] != "app" || headerROW[3] != "union" || headerROW[4] != "status"){
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
        const countInput = parseInt(document.getElementById("FormCSV").querySelectorAll('input').length)-4;
        console.log("Count: " + countInput)
        if(countInput === 0){
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

    async function fetching() {
        const url1 = "https://v6.exchangerate-api.com/v6/61b370327f102d95c5f30e60/latest/USD" //API: 61b370327f102d95c5f30e60
        const url2 = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_3eWhXPMnNdgcR6DMhuo2lPBiRYZXMbfp99qVbGY1"
      try {
        const response = await axios.get(url1);

        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data: 61b370327f102d95c5f30e60", error);
      }
    }
  
    useLayoutEffect(() => {
        fetching();
      }, []);

    return (
        <div className="ui segment basic">
            <h2>Upload Upline CSV</h2>
          {
            !csvLoaded ?
            <>
                <div className="ui message violet basic center aligned">
                    <input type="file"  onChange={CSVFileUpload} />
                    <p>Drag and drop a file here, or click to select a file</p> 
                </div>
                <a className='ui button purple fluid' href='./csv/csv_clubs.csv'>Download CSV template</a>
            </>
            : 
            <div className='ui button teal' onClick={()=>{ resetCSV() } }>Reset CSV File</div>
          }
          <h3>{message}</h3>
          
          {/* CSV to JSON Format */}
          {JSONData && (
            <div>
                
                <form className='ui form' id='FormCSV'>
                    <h1>Form Fields</h1>
                        {JSONData.map((i, index) => (
                            <div className='fields' key={index}>
                                <div className='field'>
                                    <label>Action</label>
                                    <div className='ui button red icon basic' onClick={() => deleteRow(index)}>
                                        <i className='icon close'></i>
                                    </div>
                                </div>
                                <div className='field'>
                                    <label>Upline ID</label>
                                    <input value={i.idd} onChange={(e) => inputChange(e, index, "idd")}/>
                                </div>
                                <div className='field'>
                                    <label>Upline Name</label>
                                    <input value={i.Upline} onChange={(e) => inputChange(e, index, "Upline")}/>
                                </div>
                                <div className='field'>
                                    <label>App Name</label>
                                    <input value={i.app} onChange={(e) => inputChange(e, index, "app")} />
                                </div>
                                <div className='field'>
                                    <label>Union Name</label>
                                    <input value={i.union} onChange={(e) => inputChange(e, index, "union")} />
                                </div>
                                <div className='field'>
                                    <label>Status</label>
                                    {setStatus(i)}
                                </div>
                            </div>
                        ))}
                </form>
                <h2>Converted JSON Data</h2>
                <pre>{JSON.stringify(JSONData, null, 2)}</pre>
            </div>
          )}
        </div>
      );
}
