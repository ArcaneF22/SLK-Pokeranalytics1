import { useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

export const RawHistory = ({ loadingHistory, itemHistory }) => {

    const Token = JSON.parse( localStorage.getItem('Token') );

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget']
            }; 

    async function fetchHistory() {
        loadingHistory(true)
      try {
        const response = await axios.post(Set.Fetch['history'], Auth);
        itemHistory(response.data);
        loadingHistory(false)
        console.log("History items loaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useLayoutEffect(() => {
        fetchHistory();
      }, []);


}
