import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

const Token = JSON.parse( localStorage.getItem('Token') );

export const AccountsUpline = (i,ii) => {
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])

  const Auth = {
              A:      Token['id'],
              B:      Token['token'],
              C:      Token['gadget'],
              D:      Set.TimeZoned,
              FOR:    i ? i : "ALL",
              WHAT:   ii ? ii : "",
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['accountsupline'], Auth);
      setdata(response.data);
      setLoad(false)
      //console.log("Accounts Active..."+i+":"+ii)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}
