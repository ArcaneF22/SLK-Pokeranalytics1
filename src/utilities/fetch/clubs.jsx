import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

import { Authenticate } from '../authenticate/authenticate';


export const FetchClubs = ({ selectClub }) => {

  const [tableClubs, settableClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(0)
  const Token = JSON.parse( localStorage.getItem('Token') );
  const Auth = {
                          A: Token['id'],
                          B: Token['token'],
                          C: Token['gadget']
                      };

  async function getClubs() {
    setLoading(true)
    try {
      
      const response = await axios.post(Set.Fetch['clubs'], Auth);
      settableClubs(response.data);
      console.log("Got it...")
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
    getClubs();
    Authenticate()
  }, []);

  const editClub = (id,idd,name,image,app,details,type,union,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "id": id, 
                    "idd": idd, 
                    "name": name, 
                    "image": image, 
                    "app": app, 
                    "details": details, 
                    "type": type,
                    "union": union,
                    "status": status,
                  }
      selectClub(array);
  };

  function setStatus(i) {
    if (i.status == "Active") {
      return  <button className='ui button green basic'>
                  <i className="check circle outline icon"></i>
                  Active
              </button>;
    } else if (i.status == "Pending") {
      return  <button className='ui button yellow basic'>
                  <i className="spinner icon"></i>
                  Pending
              </button>;
    } else {
      return  <button className='ui button red basic'>
                  <i className="times circle outline icon"></i>
                  Inactive
              </button>;
    }
  }

  return (
<>

{loading ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">Loading table...</div>
        </div>
      </div>
      ) : ( 
        <table className='ui celled striped table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>IDD</th>
            <th>Club</th>
            <th>Image</th>
            <th>Application</th>
            <th>Details</th>
            <th>Type</th>
            <th>Union</th>
            <th>Users</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableClubs.map((i, index) => (
            <tr key={index}>
              <td>{i.clubID}</td>
              <td>{i.clubIDD}</td>
              <td>{i.clubName}</td>
              <td>{i.clubImage}</td>
              <td>{i.appName}</td>
              <td>{i.clubDetails}</td>
              <td>{i.clubType}</td>
              <td>{i.clubUnion}</td>
              <td>{i.clubUsers}</td>
              <td>{setStatus(i)}</td>
              <td>
                <button className='ui button blue' onClick={()=> editClub(i.clubID,i.clubIDD,i.clubName,i.clubImage,i.appName,i.clubDetails,i.clubType,i.clubUnion,i.clubStatus)}>
                    <i className="edit outline icon"></i>
                    Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

</>

  );
}
