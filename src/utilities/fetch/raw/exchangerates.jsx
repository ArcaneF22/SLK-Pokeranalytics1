import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

export const ExchangeRates = (i) => {
  const Token = JSON.parse( localStorage.getItem('Token') );
  const [fill, setFill] = useState(false)
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              FOR: i,
          }; 

  async function fetching() {
      setLoad(true)
      setFill(false)
    try {
      const response = await axios.post(Set.Fetch['exchangerates'], Auth);
      setdata(response.data);
      setLoad(false)
      setFill("yes")
      //console.log("Exchange rate items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data, fill})
}

export const RecordExchangeRates = (onDate) => {
  const Token = JSON.parse( localStorage.getItem('Token') );
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              FOR: onDate,
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['exchangerates'], Auth);
      setdata(response.data);
      setLoad(false)
      //console.log("Exchange rate items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}
