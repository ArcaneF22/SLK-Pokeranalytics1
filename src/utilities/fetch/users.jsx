import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';

export const FetchUsers = () => {

    const [usersTable, setusersTable] = useState([]);

    //FETCH USER DATA
    useLayoutEffect(() => {
    const fetchData = async () => {
            axios.get(import.meta.env.VITE_GET_USERS)
                .then( res => setusersTable(res.data)  )
                .catch( error=> console.log(error) )
    };
    fetchData();
    }, []); 

  return (
    <>

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
