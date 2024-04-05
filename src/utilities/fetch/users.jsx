import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';

export const FetchUsers = () => {

    const [usersTable, setusersTable] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    //FETCH USER DATA
    useLayoutEffect(() => {
        fetchUsers()
    }, []);  


    const fetchUsers = async () => {
        try{
            const response = await fetch(import.meta.env.VITE_GET_USERS,{
                                        method: "POST",
                                        headers: { "Accept": "application/json", "Content-type": "application/json" },
                                        body: JSON.stringify({
                                            A:"1",
                                            B:"e367e4875e95abcbe315a865a2c09f1d",
                                            C:"Computer: Windows"
                                            })
                                        }).then((response) => {
                                            return response.json()
                                        }).then((response) => {
                                            console.log(res.data)
                                            if(response.data == "Err"){
                                                setusersTable("Not found...")
                                            } else {
                                                setusersTable(response.data)
                                            }
                                        }).catch((error) => {
                                            console.log(error)
                                        })
    
        } catch (err){
            console.log(err)
        }
    };
    


  return (
    <>
    <p>{usersTable}</p>
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

                    </tbody>
                </table>  
        </div>
 
    </>
  )
}
