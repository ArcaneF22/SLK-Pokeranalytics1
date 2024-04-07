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

  return (
<>

{loading ? (
        <p>Loading table</p>
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
              <td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

</>

  );
}
