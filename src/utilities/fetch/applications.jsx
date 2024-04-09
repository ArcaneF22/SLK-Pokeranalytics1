import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const FetchApplications = () => {

  const [tableApplications, settableApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const Token = JSON.parse( localStorage.getItem('Token') );
  const Auth = {
                          A: Token['id'],
                          B: Token['token'],
                          C: Token['gadget']
                      };

  async function getApplications() {
    setLoading(true)
    try {
      
      const response = await axios.post(Set.Fetch['applications'], Auth);
      settableApplications(response.data);
      console.log("Got it...")
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
    getApplications();
  }, []);

  function setStatus(i) {
    if (i.status == "Active") {
      return  <button className='ui button green basic'>
                  <i className="check circle outline icon"></i>
                  Active
              </button>;
    } else if (i.status == "Pending") {
      return  <button className='ui button yellow basic'>
                  <i class="spinner icon"></i>
                  Pending
              </button>;
    } else if (i.status == "Pending") {
      return  <button className='ui button yellow basic'>
                  <i class="spinner icon"></i>
                  Pending
              </button>;
    } else {
      return  <button className='ui button red basic'>
                  <i className="times circle outline icon"></i>
                  Inactive
              </button>;
    }
  }

  const disableApplication = (id) => {
    sessionStorage.setItem('disableAppID', id);
    console.log("Clicked on button in row with id:", id);
  };

  const editApplication = (id,name,image,company,details,status) => {
    console.log("Clickedss on button in row with id:", id, name, image, company, details, status);
    
    sessionStorage.setItem('editApp', [id, name, image, company, details, status]);
  };

  return (
<>

{loading ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div class="ui indeterminate text loader">Loading table...</div>
        </div>
      </div>
      ) : (
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
              <td>{i.accountCount}</td>
              <td>{setStatus(i)}</td>
              <td>
                <button className='ui button blue' onClick={()=> editApplication(i.id,i.name,i.image,i.company,i.details,i.accountCount,i.status)}>
                    <i className="edit outline icon"></i>
                    Edit
                </button>
                <button className='ui button red' onClick={()=> disableApplication(i.id,i.name,i.image)}>
                    <i className="ban icon"></i>
                    Disable
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
