import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const FetchHistory = () => {

  const [tableHistory, settableHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getHistory() {
    setLoading(true)
    try {
      
      const response = await axios.post(Set.Fetch['history'], Set.Auth);
      settableHistory(response.data);
      console.log("Got it...")
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
    getHistory();
  }, []);

  return (
<>

{loading ? (
        <p>Loading table</p>
      ) : (
        <table className='ui unstackable celled long scrolling table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Role</th>
            <th>Date Time</th>
            <th>Gadget</th>
            <th>Timezone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableHistory.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>ID#{i.userID}: {i.userNickname}</td>
              <td>{i.userRole}</td>
              <td>{i.datetime}</td>
              <td>{i.gadget}</td>
              <td>{i.timezone}</td>
              <td>{i.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

</>

  );
}
