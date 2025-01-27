import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../constants';

export const FetchNotification = () => {

  const [tableNotification, settableNotification] = useState([]);
  const [loading, setLoading] = useState(false);

  const Token = JSON.parse( localStorage.getItem('Token') );
  const Auth = {
                          A: Token['id'],
                          B: Token['token'],
                          C: Token['gadget']
                      };

  async function getNotification() {
    setLoading(true)
    try {
      
      const response = await axios.post(Set.Fetch['notification'], Auth);
      settableNotification(response.data);
      console.log("Got it...")
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
    getNotification();
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
            <th>Title</th>
            <th>Details</th>
            <th>Type</th>
            <th>Requested By</th>
            <th>Requested To</th>
            <th>Approved by</th>
            <th>Request Date</th>
            <th>Approved Date</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableNotification.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>{i.title}</td>
              <td>{i.details}</td>
              <td>{i.type}</td>
              <td>{i.requestedByRole} ID#{i.requestedBy}: {i.requestedByNickname}</td>
              <td>{i.requestedToRole} ID#{i.requestedTo}: {i.requestedToNickname}</td>
              <td>{i.approvedByRole} ID#{i.approvedBy}: {i.approvedByNickname}</td>
              <td>{i.requestTime}</td>
              <td>{i.approvedTime}</td>
              <td>{i.approvedMessage}</td>
              <td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

</>

  );
}
