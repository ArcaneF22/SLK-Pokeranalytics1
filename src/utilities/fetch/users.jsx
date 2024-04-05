import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const FetchUsers = () => {

  const [tableUsers, settableUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getUsers() {
    setLoading(true)
    try {
      
      const response = await axios.post(Set.Fetch['users'], Set.Auth);
      settableUsers(response.data);
      console.log(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
    getUsers();
  }, []);

  return (
<>

{loading ? (
        <p>Loading table</p>
      ) : (
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Column 2</th>
            {/* More columns as needed */}
          </tr>
        </thead>
        <tbody>
          {tableUsers.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.nickname}</td>
              {/* More cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      )}

</>

  );
}
