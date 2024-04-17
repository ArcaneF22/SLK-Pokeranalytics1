import { useLayoutEffect } from 'react';
import axios from 'axios';
import * as Set from '../../constants';

//NOTIFICATION
export const RawNotification = ({ loadingNotification, itemNotification }) => {

    const Token =   JSON.parse( localStorage.getItem('Token') );

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                STAT: "ALL",
            }; 

    async function fetchNotification() {
        loadingNotification(true)
      try {
        const response = await axios.post(Set.Fetch['notification'], Auth);
        itemNotification(response.data);
        loadingNotification(false)
        console.log("Notification items loaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    useLayoutEffect(() => {
        fetchNotification();
      }, []);

}

//NOTIFICATION PENDING
export const RawNotificationPending = ({ loadingNotification, itemNotification }) => {

    const Token =   JSON.parse( localStorage.getItem('Token') );

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                STAT: "PENDING",
            }; 

    async function fetchNotification() {
        loadingNotification(true)
      try {
        const response = await axios.post(Set.Fetch['notification'], Auth);
        itemNotification(response.data);
        loadingNotification(false)
        console.log("Notification items loaded...")
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    useLayoutEffect(() => {
        fetchNotification();
      }, []);

}

//NOTIFICATION COUNT
export const RawNotificationCount = ({ countNotification }) => {

    const Token =   JSON.parse( localStorage.getItem('Token') );

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
            }; 

    async function fetchcountNotification() {
      try {
        const response = await axios.post(Set.Fetch['notification_count'], Auth);
        countNotification(response.data);
        console.log("Notification Count:"+response.data)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    useLayoutEffect(() => {
        fetchcountNotification();
      }, []);

}