import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

import { Authenticate } from '../authenticate/authenticate';


export const FetchClubs = () => {

  const [tableClubs, settableClubs] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
<>

{loading ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div class="ui indeterminate text loader">Loading content...</div>
        </div>
      </div>
      ) : ( 
        <table className='ui celled striped table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Club</th>
            <th>Image</th>
            <th>Details</th>
            <th>Type</th>
            <th>Union</th>
            <th>Users</th>
            <th>Application</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableClubs.map((i, index) => (
            <tr key={index}>
              <td>{i.clubID}</td>
              <td>{i.clubName}</td>
              <td>{i.clubImage}</td>
              <td>{i.clubDetails}</td>
              <td>{i.clubType}</td>
              <td>{i.clubUnion}</td>
              <td>{i.clubUsers}</td>
              <td>{i.appName}</td>
              <td>{i.clubStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

</>

  );
}
