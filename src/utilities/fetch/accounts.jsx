import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const FetchAccounts = () => {

  const Auth = {
                          A: Set.Token['id'],
                          B: Set.Token['token'],
                          C: Set.Token['gadget']
                      };
  const [tableAccounts, settableAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAccounts() {
    setLoading(true)
    try {
      
      const response = await axios.post(Set.Fetch['accounts'], Auth);
      settableAccounts(response.data);
      console.log("Got it...")
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
    getAccounts();
  }, []);

  return (
<>

{loading ? (
        <p>Loading table</p>
      ) : (
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
      )}

</>

  );
}
