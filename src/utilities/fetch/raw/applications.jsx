import { useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

const Token = JSON.parse( localStorage.getItem('Token') );
const Auth = {
                        A: Token['id'],
                        B: Token['token'],
                        C: Token['gadget']
                    };

export const RawApplications = ({ loadingApplication, itemsApplication }) => {

    async function itemApplications() {
        loadingApplication(true)
      try {
        const response = await axios.post(Set.Fetch['applications'], Auth);
        itemsApplication(response.data);
        loadingApplication(false)
        console.log("Application items loaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useLayoutEffect(() => {
        itemApplications();
      }, []);

}
