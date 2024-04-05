import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';

export const FetchUsers = () => {

    const [usersTable, setusersTable] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    //FETCH USER DATA
    useLayoutEffect(() => {
    
        const fetchData = async () => {
            try{
                setMessage("Loading...");
                setMessageicon("notched circle loading icon purple")
                const response = await fetch(import.meta.env.VITE_GO_LOGIN,{
                                            method: "POST",
                                            headers: { "Accept": "application/json", "Content-type": "application/json" },
                                            body: JSON.stringify({
                                                A:"16",
                                                B:"f71028df3bb844734323f9f2b6e2811b",
                                                C:"Mobile: Android"
                                                })
                                            }).then((response) => {
                                                return response.json()
                                            }).then((response) => {
                                                console.log(response[0])
                                                alert(response[0])
                                            }).catch((error) => {
                                                console.log(error)
                                            })
        
            } catch (err){
                console.log(err)
            }
        };
    fetchData();
    }, []);  


    
    

    


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
