import { useState } from 'react';
import { Unions } from '../raw/unions'
import * as Set from '../../constants'

export const FetchUnions = () => {

  const data = Unions().data
  const load = Unions().load

  return (
<>

{load ? (
      <Set.LoadingData />
      ) : (
      <div className="ui segment ">
        <h3 className="ui horizontal divider header">
          Unions List
        </h3>
        <br />
        <table className='ui unstackable celled long scrolling table small compact'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Union</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>
                <h5 className="ui image header">
                    <img src={i.imageFull} className="ui mini rounded image" />
                    <div className="content">
                      {i.name}
                      <div className='sub header'>
                        ID# {i.type}
                      </div>
                  </div>
                </h5>
              </td>
              <td>{i.status}</td>
              <td>{i.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}

</>

  );
}
