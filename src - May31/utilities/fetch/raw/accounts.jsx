import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

export const Accounts = () => {
  const Token = JSON.parse( localStorage.getItem('Token') );
  const [fill, setFill] = useState(false)
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
      const response = await axios.post(Set.Fetch['accounts'], Auth);
      setdata(response.data);
      setLoad(false)
      setFill(true)
      //console.log("Accounts items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data, fill})
}

export const MyAccounts = () => {
  const Token = JSON.parse( localStorage.getItem('Token') );
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              FOR: "MY",
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['accounts'], Auth);
      setdata(response.data);
      setLoad(false)
      //console.log("My Accounts items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}


export const AccountsDownline = () => {
  const Token = JSON.parse( localStorage.getItem('Token') );
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
              FOR: "DOWNLINE",
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['accounts'], Auth);
      setdata(response.data);
      setLoad(false)
      //console.log("My Accounts items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}

export const AccountsPlayers = (i,ii,iii) => {
  const Token = JSON.parse( localStorage.getItem('Token') );
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])

  const Auth = {
              A:      Token['id'],
              B:      Token['token'],
              C:      Token['gadget'],
              D:      Set.TimeZoned,
              FOR:    i ? i : "ALL",
              WHAT:   ii ? ii : "",
              WHAT2:  iii ? iii : "",
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