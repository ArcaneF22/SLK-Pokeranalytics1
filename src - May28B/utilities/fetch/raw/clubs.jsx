import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import * as Set from '../../constants';




export const Clubs = () => {
  const Token = JSON.parse( localStorage.getItem('Token') );
  const [fill, setFill] = useState("")
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              FOR: "ALL",
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['clubs'], Auth);
      setdata(response.data);
      setLoad(false)
      setFill("yes")
      //console.log("Clubs items fetched...")
    } catch (error) {
      setFill("no")
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({fill, load, data})
}
