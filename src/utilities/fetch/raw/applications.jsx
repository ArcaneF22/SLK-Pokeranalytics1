import { useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

export const RawApplications = ({ loadingApplication, itemApplication }) => {

    const Token = JSON.parse( localStorage.getItem('Token') );

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget']
            }; 

    async function fetchApplications() {
        loadingApplication(true)
      try {
        const response = await axios.post(Set.Fetch['applications'], Auth);
        itemApplication(response.data);
        loadingApplication(false)
        console.log("Application items loaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useLayoutEffect(() => {
        fetchApplications();
      }, []);


}
