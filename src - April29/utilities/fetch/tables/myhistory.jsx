import { useState } from 'react';
import { MyHistory } from '../raw/history'

export const FetchMyHistory = () => {

  const data = MyHistory().data
  const load = MyHistory().load

  return (
<>

{load ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">Loading table...</div>
        </div>
      </div>
      ) : (
      <div className="ui segment ">
        <h3>My History List</h3>
        <table className='ui unstackable celled long scrolling table'>
        <thead>
          <tr>
            <th>Gadget</th>
            <th>Timezone</th>
            <th>Date Time</th>
            <th>Action</th>
            <th>For</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>{i.gadget}</td>
              <td>{i.timezone}</td>
              <td>{i.datetime}</td>
              <td>{i.action}</td>
              <td>{i.for}</td>
              <td>{i.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}

</>

  );
}
