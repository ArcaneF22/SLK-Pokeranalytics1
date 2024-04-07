import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const FetchAccounts = () => {

  const [tableAccounts, settableAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAccounts() {
    setLoading(true)
    try {
      const response = await axios.post(Set.Fetch['accounts'], Set.Auth);
      settableAccounts(response.data);
      console.log(response.data)
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
        <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Nickname</th>
            <th>Account Role</th>
            <th>Account Clubs Count</th>
            <th>User</th>
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
