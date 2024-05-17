import { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Set from '../../constants';
import useInterval from 'use-interval';

const Token = JSON.parse( localStorage.getItem('Token') );

export const Clubs = ({dropdown, downID, appID, clubID}) => {

    const [data, setdata] = useState([])
    const [load, setLoad] = useState(false)
    const [selected, setSelected] = useState("")

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
                FOR: appID ? appID : 0,
            }; 
  
    async function fetching() {
        setLoad(true)
      try {
        const response = await axios.post(Set.Fetch['clubs'], Auth);
        setdata(response.data.filter((e) => e.idd !== null));
        setLoad(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    const arrayed = data.map(i => 
      { return {
                  key: i.idd,
                  text: i.idd+": "+i.name,
                  value: i.idd,
                  image: { avatar: true, src: (i.imageFull ? i.imageFull : "./images/club.png") },
                  disabled: i.idd === null,
        }})

    useLayoutEffect(() => {
        if(downID == 0 || downID == ""){
            setdata([])
            setLoad(true)
            setSelected("")
        } else {
          fetching();
          setSelected(clubID.includes(arrayed) ? clubID : "")
        }
      }, [downID]);
      


    useLayoutEffect(() => {
        dropdown(selected)
      }, [selected]);
  
    return (<SUI.Dropdown
                        placeholder={"Select club"}
                        scrolling
                        clearable
                        fluid
                        loading={load ? true : false}
                        disabled={load ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select club"
                        onChange={(event, { value }) => { setSelected(value); }}
                        value={selected}
                        options={arrayed}
                      />)
  }
  
export const Uplines = ({dropdown, downID, appID, clubID, uplineID}) => {
    
    const [data, setdata] = useState([])
    const [load, setLoad] = useState(false)
    const [selected, setSelected] = useState(0)

    const Auth = {
        A: Token['id'],
        B: Token['token'],
        C: Token['gadget'],
        D: Set.TimeZoned,
        FOR: clubID,
        DOWN: downID,
    }; 

    async function fetching() {
        setLoad(true)
      try {
        const response = await axios.post(Set.Fetch['accounts'], Auth);
        setdata(response.data.filter((e) => e.accountID !== null));
        setLoad(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  
    const arrayed = data.map(i => 
      { return {
                  key: i.accountID,
                  text: i.accountID+": "+i.accountNickname,
                  description: i.accountRole,
                  value: i.accountID,
                  image: { avatar: true, src: i.userAvatar },
                  disabled: i.accountID === null,
        }})

    useLayoutEffect(() => {
        if(clubID == 0 || clubID == null || clubID == "" ){
            setdata([])
            setLoad(true)
        } else {
            fetching();
            setSelected(uplineID.includes(arrayed) ? uplineID : "")
        }
      }, [clubID]);

    useLayoutEffect(() => {
        dropdown(selected)
      }, [selected]);
  
    return (<SUI.Dropdown
                        placeholder={"Select upline"}
                        scrolling
                        clearable
                        floating
                        fluid
                        loading={load ? true : false}
                        disabled={load ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select upline"
                        onChange={(event, { value }) => { setSelected(value); }}
                        value={selected}
                        options={arrayed}
                      />)
  }

