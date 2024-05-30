import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import * as Set from '../../constants';



export const Users = () => {
  const Token = JSON.parse( localStorage.getItem('Token') );
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['users'], Auth);
      setdata(response.data);
      setLoad(false)
      //console.log("Users items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}