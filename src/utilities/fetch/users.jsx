import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';

export const FetchUsers = () => {


  
//FETCH USER DATA
const [usersTable, setusersTable] = useState([]);
useLayoutEffect(() => {
  const fetchData = async () => {
        axios.get(import.meta.env.VITE_GET_USERS)
              .then( res => setusersTable(res.data)  )
              .catch( error=> console.log(error) )
  };
  fetchData();
}, []); 

const [userNickname, setuserNickname] = useState("");
const [userRole, setuserRole] = useState("");
const [userUsername, setuserUsername] = useState("");
const [userPassword, setuserPassword] = useState("");

const handleSubmit = async () => {
  try {
    const body = { userNickname, userRole, userUsername, userPassword };
    const response = await fetch('http://13.211.65.106/poker/upsert/upsert_users.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log(result)
      alert(result);
  } catch (error) {
      alert(error);
    }
};

  return (
    <>

        <div className="ui form">
            <div className="fields">
                <div className="field">
                    <label>Nickname</label>
                    <input type="text" placeholder="New Password" value={userNickname} onChange={(e) => setuserNickname(e.target.value)}/>
                </div>   
                <div className="field">
                    <label>Role</label>
                    <input type="text" value={userRole} onChange={(e) => setuserRole(e.target.value)}/>
                </div>   
            </div>
            <div className="fields">
                <div className="field">
                    <label>Username</label>
                    <input type="text" value={userUsername} onChange={(e) => setuserUsername(e.target.value)}/>
                </div>   
                <div className="field">
                    <label>Password</label>
                    <input type="text" value={userPassword} onChange={(e) => setuserPassword(e.target.value)}/>
                </div>   
            </div>
            <div className="field">
                <div className="ui button purple" onClick={handleSubmit}>
                    Submit
                </div>
            </div>
        </div>

    <div className="ui segment ">
        <h3>Users List</h3>
        <i className='icon table'></i>
        <i className='icon list'></i>
        <table className='ui table celled loading'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>role</th>
                            <th>nickname</th>
                            <th>email</th>
                            <th>username</th>
                            <th>password</th>
                            <th>avatar</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersTable.map((row) => (
                            <tr key={row.id}>
                                <td>{row.role}</td>
                                <td>{row.nickname}</td>
                                <td>{row.email}</td>
                                <td>{row.username}</td>
                                <td>{row.password}</td>
                                <td>{row.avatar}</td>
                                <td>{row.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>  
        </div>
 
    </>
  )
}
