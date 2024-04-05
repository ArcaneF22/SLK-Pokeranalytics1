import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FetchUsers() {
  const [data, setData] = useState([]);



  const fetchData = async () => {
    try {

        const response = await axios.post(import.meta.env.VITE_GET_USERS, {
            A:"16",
            B:"f71028df3bb844734323f9f2b6e2811b",
            C:"Mobile: Android"
          });

      setData(response.data);
      alert("a")
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  fetchData();
  return (
    <div>
      <h1>Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nickname}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetchUsers;