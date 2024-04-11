import React, { useState, useLayoutEffect } from 'react';
import { Dropdown } from 'semantic-ui-react'

export const Dropdown_Apps = () => {

    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    
  //FETCH USER DATA
  const [tableData, setTableData] = useState([]);
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost/PRJCT/recreate/server/dropdown/fetch_apps.php');
                const data = await response.json();
                setOptions(data)
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
      }, []);

    return (
        <>
    
    <Dropdown
          placeholder="Select an option"
          fluid
          selection
          options={options}
          onChange={handleDropdownChange}
          value={selectedValue}
        />
    
        </>
      )
}