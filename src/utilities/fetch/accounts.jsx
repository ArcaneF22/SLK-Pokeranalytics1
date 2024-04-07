import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const FetchAccounts = () => {

  const [tableAccounts, settableAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const Token = JSON.parse( localStorage.getItem('Token') );
  const Auth = {
                          A: Token['id'],
                          B: Token['token'],
                          C: Token['gadget']
                      };

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
        <div className="ui segment">
        <div className="ui active inverted dimmer">
          <br /><br />
        <div class="ui indeterminate text loader">Loading content</div>
        <br /><br />
        </div>
        <p></p>
      </div>
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
