import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../../constants';
import { RawApplications } from '../raw/applications'


export const FetchApplications = ({ selectApplication, onloadApplication }) => {

  const [tableApplications, settableApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(0)

  const loadingApplication = (value) => {
      setLoading(value);
  };

  const itemApplication = (value) => {
      settableApplications(value)
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

  const editApplication = (id,name,image,company,details,count,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "id": id, 
                    "name": name, 
                    "image": image, 
                    "company": company, 
                    "details": details, 
                    "count": count,
                    "status": status
                  }
    selectApplication(array);
  };
  
  return (
<>

<RawApplications loadingApplication={loadingApplication} itemApplication={itemApplication} />

{loading ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">Loading table...</div>
        </div>
      </div>
      ) : (
      <div className="ui segment ">
        <h2>Applications List</h2>
        <table className='ui celled striped table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Application</th>
            <th>Image</th>
            <th>Company</th>
            <th>Details</th>
            <th>Users</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableApplications.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.image}</td>
              <td>{i.company}</td>
              <td>{i.details}</td>
              <td>{i.accountCount == 0 || i.accountCount == 1 ? i.accountCount+" User" :  i.accountCount+" Users"}</td>
              <td>{setStatus(i)}</td>
              <td>
                <button className='ui button blue' onClick={()=> editApplication(i.id,i.name,i.image,i.company,i.details,i.accountCount,i.status)}>
                    <i className="edit outline icon"></i>
                    Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}

</>

  );
}
