import { useState } from 'react';
import { RawHistory } from '../raw/history'

export const FetchHistory = () => {

  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadingHistory = (value) => {
      setLoading(value);
  };

  const itemHistory = (value) => {
    setTable(value)
  };

  return (
<>
<RawHistory loadingHistory={loadingHistory} itemHistory={itemHistory} />
{loading ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">Loading table...</div>
        </div>
      </div>
      ) : (
      <div className="ui segment ">
        <h3>History List</h3>
        <table className='ui unstackable celled long scrolling table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Role</th>
            <th>Date Time</th>
            <th>Gadget</th>
            <th>Timezone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {table.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>ID#{i.userID}: {i.userNickname}</td>
              <td>{i.userRole}</td>
              <td>{i.datetime}</td>
              <td>{i.gadget}</td>
              <td>{i.timezone}</td>
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
