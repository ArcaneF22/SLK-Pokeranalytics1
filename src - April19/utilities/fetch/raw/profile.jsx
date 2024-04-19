import { useLayoutEffect, useState } from 'react';
import useInterval from 'use-interval'
import axios from 'axios';
import * as Set from '../../constants';


export const RawProfile = ({ loadingProfile, itemProfile }) => {

    const [timer, setTimer] = useState([]);
    const Token = JSON.parse( localStorage.getItem('Token') );
    
    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget']
            }; 

    async function fetchProfile() {
        loadingProfile(true)
      try {
        const response = await axios.post(Set.Fetch['profile'], Auth);
        itemProfile(response.data);
        loadingProfile(false)

        const User = {
            rolename:   response.data["rolename"],
            nickname:   response.data["nickname"],
            avatar:     response.data["avatarpath"],
            status:     response.data["status"]
          }

        localStorage.setItem('User', JSON.stringify(User));
        console.log("Profile details reloaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useInterval(() => {
        setTimer(seconds => seconds + 1);
      }, 5000);

    useLayoutEffect(() => {
        fetchProfile();
      }, [timer]);


}
