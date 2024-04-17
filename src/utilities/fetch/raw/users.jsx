import { useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

export const RawUsers = ({ loadingUsers, itemUsers }) => {

    const Token = JSON.parse( localStorage.getItem('Token') );

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget']
            }; 

    async function fetchUsers() {
        loadingUsers(true)
      try {
        const response = await axios.post(Set.Fetch['users'], Auth);
        itemUsers(response.data);
        loadingUsers(false)
        console.log("User profile loaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useLayoutEffect(() => {
        fetchUsers();
      }, []);


}
