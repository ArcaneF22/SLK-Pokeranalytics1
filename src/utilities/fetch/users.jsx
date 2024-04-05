import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';

export const FetchUsers = () => {

    const [usersTable, setusersTable] = useState([]);
    const [content, setContent] = useState(false);

    //FETCH USER DATA
    useLayoutEffect(() => {
    const fetchData = async () => {
            axios.get(import.meta.env.VITE_GET_USERS)
                .then( res => {
                    setusersTable(res.data)
                })
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
                        {usersTable.map((i) => (
                            <tr key={i.id}>
                                <td>{i.id}</td>
                                <td>{i.role}</td>
                                <td>{i.nickname}</td>
                                <td>{i.email}</td>
                                <td>{i.username}</td>
                                <td>{i.password}</td>
                                <td>{i.avatar}</td>
                                <td>{i.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>  
        </div>
 
    </>
  )
}
