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
            {/* More columns as needed */}
          </tr>
        </thead>
        <tbody>
          {tableAccounts.map((row, index) => (
            <tr key={index}>
              <td>{row.accountID}</td>
              <td>{row.accountNickname}</td>
              {/* More cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      )}

</>

  );
}
