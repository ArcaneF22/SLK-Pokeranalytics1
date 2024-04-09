import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const FetchHistory = () => {

  const [tableHistory, settableHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const Token = JSON.parse( localStorage.getItem('Token') );
  const Auth = {
                          A: Token['id'],
                          B: Token['token'],
                          C: Token['gadget']
                      };

  async function getHistory() {
    setLoading(true)
    try {
      
      const response = await axios.post(Set.Fetch['history'], Auth);
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
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div class="ui indeterminate text loader">Loading content</div>
        </div>
      </div>
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
