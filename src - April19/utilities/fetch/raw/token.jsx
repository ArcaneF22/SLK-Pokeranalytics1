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
        console.log("Profile details loaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useInterval(() => {
        setTimer(seconds => seconds + 1);
      }, 10000);

    useLayoutEffect(() => {
        fetchProfile();
      }, [timer]);


}
