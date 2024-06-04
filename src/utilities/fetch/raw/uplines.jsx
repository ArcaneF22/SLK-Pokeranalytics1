import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

export const Uplines = (i,ii) => {
  const Token = JSON.parse( localStorage.getItem('Token') );
  const [fill, setFill] = useState("")
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              FOR: i,
              WHAT: ii,
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['uplines2'], Auth);
      setdata(response.data);
      setLoad(false)
      setFill("yes")
      //console.log("Upline2 items fetched..."+JSON.stringify(response.data,null,2))
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


export const UplinesActivePending = () => {
  const Token = JSON.parse( localStorage.getItem('Token') );
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              FOR: 'ALL',
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['uplines'], Auth);
      setdata(response.data);
      setLoad(false)
      //console.log("Upline items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}

export const MyUplines = () => {
  const Token = JSON.parse( localStorage.getItem('Token') );
    const [load, setLoad] = useState(false)
    const [data, setdata] = useState([])
    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
                FOR: 'MY',
            }; 
  
    async function fetching() {
        setLoad(true)
      try {
        const response = await axios.post(Set.Fetch['uplines'], Auth);
        setdata(response.data);
        setLoad(false)
        //console.log("Upline items fetched...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  
    useLayoutEffect(() => {
        fetching();
      }, []);
  
    return ({load, data})
  }