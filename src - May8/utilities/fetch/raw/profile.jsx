import { useLayoutEffect, useState } from 'react';
import useInterval from 'use-interval'
import axios from 'axios';
import * as Set from '../../constants';

const Token = JSON.parse( localStorage.getItem('Token') );

export const UpdatingProfile = () => {
  const [load, setLoad] = useState(false)
  const [data, setdata] = useState([])
  const [timer, setTimer] = useState([]);
  const Auth = {
              A: Token['id'],
              B: Token['token'],
              C: Token['gadget'],
              D: Set.TimeZoned,
          }; 

  async function fetching() {
      setLoad(true)
    try {
      const response = await axios.post(Set.Fetch['profile'], Auth);
      setdata(response.data);
      setLoad(false)
      const User = {
        rolename:   response.data["rolename"],
        nickname:   response.data["nickname"],
        avatar:     response.data["avatarFull"],
        status:     response.data["status"],
      }

      localStorage.setItem('User', JSON.stringify(User));
      console.log("Profile items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useInterval(() => {
    setTimer(seconds => seconds + 1);
  }, 30000);

  useLayoutEffect(() => {
    fetching();
    }, [timer]);

  return ({load, data})
}


export const MyProfile = () => {
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
      const response = await axios.post(Set.Fetch['profile'], Auth);
      setdata(response.data);
      setLoad(false)
      //console.log("Profile items fetched...")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useLayoutEffect(() => {
      fetching();
    }, []);

  return ({load, data})
}
