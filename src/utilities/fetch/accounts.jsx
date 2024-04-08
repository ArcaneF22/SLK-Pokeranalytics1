import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';
import DataTable from "react-data-table-component";
export const FetchAccounts = () => {

  const [tableAccounts, settableAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData]= useState([]);
  const [search, SetSearch]= useState('');
  const [filter, setFilter]= useState([]);

  const Token = JSON.parse( localStorage.getItem('Token') );
  const Auth = {
                          A: Token['id'],
                          B: Token['token'],
                          C: Token['gadget']
                      };

  async function getAccounts() {
    setLoading(true)
    try {
      
      const response = await axios.post(Set.Fetch['accounts'], Auth);
      settableAccounts(response.data);
      setData(response.data);
      setFilter(response.data);

      console.log("Got it...")
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
    getAccounts();
  }, []);

  useLayoutEffect(()=>{
    const result= data.filter((item)=>{
     return item.title.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
},[search]);

const handleDelete=(val)=>{
  const newdata= data.filter((item)=>item.id!==val);
  setFilter(newdata);
 }
 
 const tableHeaderstyle={
  headCells:{
      style:{
          fontWeight:"bold",
          fontSize:"14px",
          backgroundColor:"#ccc"

      },
  },
 }
  return (
<>

{loading ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div class="ui indeterminate text loader">Loading content</div>
        </div>
      </div>
      ) : (
        <>
        <table className='ui celled striped table'>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Nickname</th>
            <th>Account Role</th>
            <th>Account Clubs</th>
            <th>User</th>
            <th>User Avatar</th>
            <th>Application</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableAccounts.map((i, index) => (
            <tr key={index}>
              <td>{i.accountID}</td>
              <td>{i.accountNickname}</td>
              <td>{i.accountRole}</td>
              <td>{i.accountClubsCount}</td>
              <td>ID#{i.userID}: {i.userNickname}</td>
              <td>{i.userAvatar}</td>
              <td>ID#{i.appID}: {i.appName}</td>
              <td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Product List</h1>
            <DataTable 
            customStyles={ tableHeaderstyle}
            columns={columns}
            data={filter}
            pagination
            selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            actions={
                <button className="btn btn-success">Export Pdf</button>
            }
            subHeader
             subHeaderComponent={
                <input type="text"
                className="w-25 form-control"
                placeholder="Search..."
                value={ search}
                onChange={(e)=>SetSearch(e.target.value)}
                
                />
             }
             subHeaderAlign="right"
            
            />

        </>

      )}

</>

  );
}
