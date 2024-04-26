import React, { useState } from 'react';
import Papa from 'papaparse'; //INSTALL { npm i papaparse }

function UploadCSV({ value, sendValueToAnotherFunction }) {

    const [JSONData, setJSONData] = useState('');

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
                    convertCsvToJson(i.data);
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
}

export default ChildComponent;