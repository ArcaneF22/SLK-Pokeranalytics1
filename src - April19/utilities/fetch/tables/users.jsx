import { useState } from 'react';
import { RawUsers } from '../raw/users'

export const FetchUsers = () => {

  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(0)

  const loadingUsers = (value) => {
      setLoading(value);
  };

  const itemUsers = (value) => {
    setTable(value)
  };

  function setStatus(i) {
    if (i.status == "Active") {
      return  <button className='ui button green basic'>
                  <i className="check circle outline icon"></i>
                  Active
              </button>;
    } else if (i.status == "Pending") {
      return  <button className='ui button yellow basic'>
                  <i className="spinner icon"></i>
                  Pending
              </button>;
    } else {
      return  <button className='ui button red basic'>
                  <i className="times circle outline icon"></i>
                  Inactive
              </button>;
    }
  }

  const editUsers = (id,nickname,role,email,username,password,avatar,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "id": id, 
                    "nickname": nickname, 
                    "role": role, 
                    "email": email, 
                    "username": username, 
                    "password": password, 
                    "avatar": avatar, 
                    "status": status
                  }
    //selectAccount(array);
    console.log(array)
  };

  return (
<>
<RawUsers loadingUsers={loadingUsers} itemUsers={itemUsers} />
{loading ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">Loading table...</div>
        </div>
      </div>
      ) : (
      <div className="ui segment ">
        <h3>Users List</h3>
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
          {table.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>{i.nickname}</td>
              <td>{i.role}</td>
              <td>{i.email}</td>
              <td>{i.username}</td>
              <td>{i.password}</td>
              <td>{i.avatar}</td>
              <td>{setStatus(i)}</td>
              <td>
                <button className='ui button blue' onClick={()=> editUsers(i.id,i.nickname,i.role,i.email,i.username,i.password,i.avatar,i.status)}>
                    <i className="edit outline icon"></i>
                    Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}

</>

  );
}
