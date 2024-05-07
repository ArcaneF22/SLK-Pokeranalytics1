import { useState } from 'react';
import { MyHistory } from '../raw/history'
import * as Set from '../../constants'

export const FetchMyHistory = () => {

  const data = MyHistory().data
  const load = MyHistory().load

  return (
<>

{load ? (
      <Set.LoadingData />
      ) : (
      <div className="ui segment ">
        <h3 class="ui horizontal divider header">
          My History List
        </h3>
        <br />
        <table className='ui unstackable celled long scrolling table small compact'>
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
