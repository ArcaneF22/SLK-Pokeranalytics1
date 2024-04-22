import { useState } from 'react';
import { Users } from '../raw/users'

export const FetchUsers = ({selectData}) => {

  const [clicked, setClicked] = useState(0)
  const data = Users().data
  const load = Users().load

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
    selectData(array);
    console.log(array)
  };

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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>
                <h4 className="ui image header">
                    <img src={i.avatarFull} className="ui mini rounded image" />
                    <div className="content">
                      {i.nickname}
                  </div>
                </h4>
              </td>
              <td>{i.role}</td>
              <td>{i.email}</td>
              <td>{i.username}</td>
              <td>{i.password}</td>
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
