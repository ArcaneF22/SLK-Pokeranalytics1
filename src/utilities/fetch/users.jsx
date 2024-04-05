import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const FetchUsers = () => {

    const [usersTable, setusersTable] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    //FETCH USER DATA

    useEffect(() => {
        fetchUsers();
      }, []);

    async function fetchUsers() {
        try {
          const response = await axios.post(import.meta.env.VITE_GET_USERS, {
            A:"16",
            B:"f71028df3bb844734323f9f2b6e2811b",
            C:"Mobile: Android"
          });
      
          console.log('Data:', response.data);
          setusersTable(response.data);
        } catch (error) {
          console.error('Error:', error.message);
        }
      }


  return (
    <>
    <p>{usersTable}</p>
    <div className="ui segment ">
        <h3>Users List</h3>
        <i className='icon table'></i>
        <i className='icon list'></i>
        {usersTable.length > 0 ? (
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
                            {usersTable.map(I => (
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
                ) : (
                    <p>No data available</p>
                )}
        </div>
 
    </>
  )
}
