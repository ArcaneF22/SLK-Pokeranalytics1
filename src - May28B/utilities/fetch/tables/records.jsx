import { useState } from 'react';
//import { Records } from '../raw/records'
import * as Set from '../../constants'

export const FetchRecords = () => {

  return (
<>

      <div className="ui segment basic">
        <h3 className="ui horizontal divider header">
          Records
        </h3>
        <br />
        <table className='ui unstackable celled long scrolling table small compact'>
        <thead>
          <tr>
            <th>DateFrom</th>
            <th>DateUntil</th>
            <th>Club</th>
            <th>Downline</th>
            <th>Upline</th>
            <th>Win/Loss</th>
            <th>Bonus</th>
            <th>Currency</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>


</>

  );
}
