import { useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

export const RawAccounts = ({ loadingAccounts, itemAccounts }) => {

    const Token = JSON.parse( localStorage.getItem('Token') );

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget']
            }; 

    async function fetchAccounts() {
        loadingAccounts(true)
      try {
        const response = await axios.post(Set.Fetch['accounts'], Auth);
        itemAccounts(response.data);
        loadingAccounts(false)
        console.log("Accounts items loaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useLayoutEffect(() => {
        fetchAccounts();
      }, []);


}
