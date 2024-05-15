import { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Set from '../../constants';
import { selectedDownlineID } from '../../upsert/uplines'

const Token = JSON.parse( localStorage.getItem('Token') );

var selectedClub = 0

export const Clubs = ({dropdown}) => {

    const gotdownlineID = selectedDownlineID().data
    
    const [data, setdata] = useState([])
    const [load, setLoad] = useState(false)
    const [selected, setSelected] = useState(0)

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
                D: Set.TimeZoned,
                DLID: "seldownlineID",
            }; 
  
    async function fetching() {
        setLoad(true)
      try {
        const response = await axios.post(Set.Fetch['clubs'], Auth);
        setdata(response.data);
        setLoad(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  
    useLayoutEffect(() => {
        setSelected("")
        if(gotdownlineID == 0 || gotdownlineID == "" ){
            setdata([])
            setLoad(true)
            selectedClub=0
        } else {
            fetching();
        }
      }, [gotdownlineID]);

    useLayoutEffect(() => {
        dropdown(selected)
      }, [selected]);
  
    return (<SUI.Dropdown
                        placeholder="Select club"
                        scrolling
                        clearable
                        fluid
                        loading={load ? true : false}
                        disabled={load ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select club"
                        onChange={(event, { value }) => { selectedClub=value,setSelected(value); }}
                        value={selected}
                        options={data.map(i => {
                          return {
                            key: i.id,
                            text: i.name,
                            value: i.id,
                            image: { avatar: true, src: (i.imageFull ? i.imageFull : "./images/club.png") },
                          };
                        })}
                      />)
  }
  
  
export const Uplines = ({dropdown}) => {

    const gotdownlineID = selectedDownlineID().data
    
    const [data, setdata] = useState([])
    const [load, setLoad] = useState(false)
    const [selected, setSelected] = useState(0)

    const Auth = {
        A: Token['id'],
        B: Token['token'],
        C: Token['gadget'],
        D: Set.TimeZoned,
        FOR: "ALL",
    }; 
  
    async function fetching() {
        setLoad(true)
      try {
        const response = await axios.post(Set.Fetch['accounts'], Auth);
        setdata(response.data);
        setLoad(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  
    useLayoutEffect(() => {
        setSelected("")
        if(selectedClub == 0  ){
            setdata([])
            setLoad(true)
        } else {
            fetching();
        }
      }, [selectedClub]);

    useLayoutEffect(() => {
        dropdown(selected)
      }, [selected]);
  
    return (<SUI.Dropdown
                        placeholder={"Select upline"}
                        scrolling
                        clearable
                        fluid
                        loading={load ? true : false}
                        disabled={load ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select upline"
                        onChange={(event, { value }) => { setSelected(value); }}
                        value={selected}
                        options={data.map(i => {
                          return {
                            key: i.accountID,
                            text: i.accountRole+": "+i.accountNickname,
                            value: i.accountID,
                            image: { avatar: true, src: i.userAvatar },
                          };
                        })}
                      />)
  }

