import { useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

export const RawClubs = ({ loadingClubs, itemClubs }) => {

    const Token = JSON.parse( localStorage.getItem('Token') );

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget']
            }; 

    async function fetchClubs() {
        loadingClubs(true)
      try {
        const response = await axios.post(Set.Fetch['clubs'], Auth);
        itemClubs(response.data);
        loadingClubs(false)
        console.log("Clubs items loaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useLayoutEffect(() => {
        fetchClubs();
      }, []);


}
