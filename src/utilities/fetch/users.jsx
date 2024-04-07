import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const FetchUsers = () => {

  const [tableUsers, settableUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const Token = JSON.parse( localStorage.getItem('Token') );
  const Auth = {
                          A: Token['id'],
                          B: Token['token'],
                          C: Token['gadget']
                      };

  async function getUsers() {
    setLoading(true)
    try {
      
      const response = await axios.post(Set.Fetch['users'], Auth);
      settableUsers(response.data);
      console.log("Got it...")
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
        <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div class="ui indeterminate text loader">Loading content</div>
        </div>
      </div>
      ) : (
        <table className='ui celled striped table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nickname</th>
            <th>Role</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Avatar</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableUsers.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>{i.nickname}</td>
              <td>{i.role}</td>
              <td>{i.email}</td>
              <td>{i.username}</td>
              <td>{i.password}</td>
              <td>{i.avatar}</td>
              <td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

</>

  );
}
