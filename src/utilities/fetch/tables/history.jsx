import { useState } from 'react';
import { History } from '../raw/history'
import * as Set from '../../constants'

export const FetchHistory = () => {

  const data = History().data
  const load = History().load

  return (
<>

{load ? (
      <Set.LoadingData />
      ) : (
      <div className="ui segment ">
        <h3 class="ui horizontal divider header">
          History List
        </h3>
        <br />
        <table className='ui unstackable celled long scrolling table small compact'>
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
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
              <td>
                <h5 className="ui image header">
                    <img src={i.userImage} className="ui mini rounded image" />
                    <div className="content">
                      {i.userNickname}
                      <div className='sub header'>
                        ID# {i.userID}
                      </div>
                  </div>
                </h5>
              </td>
              <td>{i.userRole}</td>
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
