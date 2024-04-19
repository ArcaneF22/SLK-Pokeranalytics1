import { useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../../../constants';

export const RawDDApplications = ({ ddApplications }) => {

    const Token = JSON.parse( localStorage.getItem('Token') );

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget']
            }; 

    async function fetchApplications() {
      try {
        const response = await axios.post(Set.DD['applications'], Auth);
        ddApplications(response.data);
        console.log("Application items loaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useLayoutEffect(() => {
        fetchApplications();
      }, []);


}
