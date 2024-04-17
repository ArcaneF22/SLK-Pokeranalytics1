import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import useInterval from 'use-interval'
import * as Set from '../../constants';

//NOTIFICATION
var createNotification = 0;

export const RawNotification = ({ loadingNotification, itemNotification, countNotification }) => {

    
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
        countNotification(createNotification)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useLayoutEffect(() => {
        fetchNotification();
      }, [createNotification]);

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
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    useLayoutEffect(() => {
        fetchNotification();
      }, [createNotification]);

}

//NOTIFICATION COUNT
export const RawNotificationCount = ({ countNotification }) => {
    const [timer, setTimer] = useState(0);
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
        if(createNotification != response.data){
          createNotification = response.data
          console.log(response.data+" Notification updated...")
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    useInterval(() => {
      setTimer(seconds => seconds + 1);
    }, 15000);

    useLayoutEffect(() => {
        fetchcountNotification();
      }, [timer]);

}