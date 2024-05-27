import { useState, useLayoutEffect, useEffect } from 'react';
import { AccountsUpline } from '../raw/accountsupline'
import { Clubs } from '../raw/clubs'
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Set from '../../constants';
import * as Func from '../../functions';
import useInterval from 'use-interval';



export const DDRecordsItems = ({onIndex, onClubName, onPlayerID, onSelect}) => {
    const Token = JSON.parse( localStorage.getItem('Token') );
    const [valAppID, setvalAppID]                   = useState(0)
    const [valClubName, setvalClubName]             = useState(0)
    const [valClubIDD, setvalClubIDD]               = useState(0)
    const [valClubPercent, setvalClubPercent]       = useState(0)
    const [valDownlineName, setvalDownlineName]     = useState(0)
    const [valDownlineID, setvalDownlineID]         = useState(0)
    const [valUplineName, setvalUplineName]         = useState(0)
    const [valUplineID, setvalUplineID]             = useState(0)
    const [valUplinePercent, setvalUplinePercent]   = useState(0)
    const [valModified, setvalModified]             = useState("")
    const [valReset, setvalReset]                   = useState(false)
  
    const DDCLub                                    = Clubs("ALL","")
    const [DDDownline, setDDDownline]               = useState([])
    const [DDUpline, setDDUpline]                   = useState([])
    const [DDDownlineLoad, setDDDownlineLoad]       = useState(false)
    const [DDUplineLoad, setDDUplineLoad]           = useState(false)

    async function fetchDDDownline(i) {
        setDDDownlineLoad(true)
        try {
        const response = await axios.post(Set.Fetch['accountsupline'], {
                                                                            A:      Token['id'],
                                                                            B:      Token['token'],
                                                                            C:      Token['gadget'],
                                                                            D:      Set.TimeZoned,
                                                                            FOR:    "ACCOUNT",
                                                                            WHAT:    i,
                                                                        });
        setDDDownline(response.data);
        setDDDownlineLoad(false)
        } catch (error) {
        console.error("Error fetching data: ", error);
        }
    }

    async function fetchDDUpline(i,ii) {
        setDDUplineLoad(true)
        try {
        const response = await axios.post(Set.Fetch['accountsupline'], {
                                                                            A:      Token['id'],
                                                                            B:      Token['token'],
                                                                            C:      Token['gadget'],
                                                                            D:      Set.TimeZoned,
                                                                            FOR:    "ACCOUNT",
                                                                            WHAT:   i,
                                                                            WHAT2:  ii,
                                                                        });
        setDDUpline(response.data);
        setDDUplineLoad(false)
        } catch (error) {
        console.error("Error fetching data: ", error);
        }
    }

    let arrayClub = DDCLub.data.map(i => 
        { return {
                    key:              i.idd,
                    text:             (i.idd+": "+ i.name),
                    value:            i.name,
                    appid:            i.appID ? i.appID : 0,
                    disabled:         i.idd ? false : true,
                    percent:          i.percent ? i.percent : 0,
                    content: (
                                <div className="ui list mini">
                                    <div className="item">
                                        <div className="ui header violet">{i.idd}</div>
                                        <div className="description">{i.name}</div>
                                        {i.percent ? <div className="description">{i.percent}% cut</div> : null}
                                        {i.status == 2 ? <div className="ui label red tiny">Disabled</div> : null}
                                    </div>
                                </div>
                    ),
        }})

    let arrayDownline = DDDownline.map(i => 
        { return {
                    key:              i.id,
                    text:             (i.accountID+": "+ i.accountNickname),
                    value:            i.accountID,
                    //image:            { avatar: true, src: i.imageFull ? i.imageFull : "./images/club.png" },
                    appid:            i.appID ? i.appID : 0,
                    disabled:         i.accountID ? false : true,
                    downlinename:     i.accountNickname ? i.accountNickname : 0,
                    uplineid:         i.uplineID ? i.uplineID : 0,
                    uplinename:       i.uplineNickname ? i.uplineNickname : 0,
                    uplinepercent:    i.uplinePercent ? i.uplinePercent : 0,
                    clubidd:          i.clubIDD ? i.clubIDD : 0,
                    content: (
                                <div className="ui list tiny">
                                    <div className="item">
                                            <div className="ui header violet">{i.accountID}</div>
                                            <div className="description">{i.accountNickname}</div>
                                            <div className="description">{i.uplineID ? "Upline: "+i.uplineID : "No upline"}</div>
                                            {i.uplinePercent ? <div className="description">{i.uplinePercent}% cut</div> : null}
                                    </div>
                                </div>
                          ),
              }})
    
    
    let arrayUpline = DDUpline.map(i => 
        { return {
                     key:              i.id,
                    text:             (i.accountID+": "+ i.accountNickname),
                    value:            i.accountID,
                    //image:            { avatar: true, src: i.imageFull ? i.imageFull : "./images/club.png" },
                    appid:            i.appID ? i.appID : 0,
                    disabled:         i.accountID ? false : true,
                    clubidd:          i.clubIDD ? i.clubIDD : 0,
                    content: (
                                <div className="ui list tiny">
                                    <div className="item">
                                        <div className="ui header violet">{i.accountID}</div>
                                        <div className="description">{i.accountNickname}</div>
                                    </div>
                                </div>
                              ),
            }})


            
        useLayoutEffect(() => {
            setvalClubName(onClubName)
        }, []);
    
        const onchangeClub = (i) => {
            setvalClubName(i);
            setvalReset(true)
            const e = arrayClub.find((o) => o.value === i);
            setvalAppID             (e.appid            ? e.appid           : 0);
            setvalClubPercent       (e.percent          ? e.percent         : 0);
            setvalClubIDD           (e.key              ? e.key             : 0);
            if(valAppID != e.appid){
                setvalReset(true)
                setvalDownlineName("");
                setvalDownlineID("");
                setvalUplineName("");
                setvalUplineID("");
                setvalUplinePercent("");
            }

        };



        useLayoutEffect(() => {
            if(valUplineID == ""){
                setvalUplineName("")
            }
        }, [valUplineID]);

        useLayoutEffect(() => {
            
            fetchDDDownline(valAppID)
            
            setvalDownlineID(onPlayerID)

        }, [valAppID]);

        const inputChange = (i, ii) => {
            ii(i)
        };


        useLayoutEffect(() => {
            const  e = arrayClub.find((o) => o.value === onClubName);
            if (e) {
                setvalAppID(e.appid ? e.appid : 0)
                setvalClubPercent(e.percent ? e.percent : 0);
                setvalClubIDD(e.key ? e.key : 0);
            }
        }, [DDCLub.load == true]);

        useLayoutEffect(() => {
            if(valDownlineID == ""){
                setvalDownlineName("")
            } else {
                const e = arrayDownline.find((o) => o.value === valDownlineID);
                if(e){
                    console.log(e)
                    if (e.value == valDownlineID) {
                        setvalDownlineName(e.downlinename ? e.downlinename : 0);
                        setvalUplineID(e.uplineid ? e.uplineid : 0);
                        setvalUplineName(e.uplinename ? e.uplinename : 0);
                        setvalUplinePercent(e.uplinepercent ? e.uplinepercent : 0);
                    } else {
                        setvalDownlineName("");
                        setvalUplineID("");
                        setvalUplineName("");
                        setvalUplinePercent("");
                    }
                }
            }
        }, [valDownlineID,valClubIDD]);

        useLayoutEffect(() => {
            const e = arrayDownline.find((o) => o.value === valDownlineID);
            if(e){
                if (e.value == valDownlineID) {
                    setvalDownlineName(e.downlinename ? e.downlinename : 0);
                    setvalUplineID(e.uplineid ? e.uplineid : 0);
                    setvalUplineName(e.uplinename ? e.uplinename : 0);
                    setvalUplinePercent(e.uplinepercent ? e.uplinepercent : 0);
                } else {
                    setvalDownlineName("");
                    setvalUplineID("");
                    setvalUplineName("");
                    setvalUplinePercent("");
                }
            }
        }, [DDDownlineLoad == true]);

        useLayoutEffect(() => {
            onSelect({
                index:          onIndex,
                modded:         valModified,
                appID:          valAppID,
                clubIDD:        valClubIDD,
                clubName:       valClubName,
                clubPercent:    valClubPercent,
                downlineID:     valDownlineID,
                uplineID:       valUplineID,
                uplinePercent:  valUplinePercent,
            })
        }, [valAppID,valClubIDD,valClubName,valClubPercent,valDownlineID,valUplineID,valUplinePercent]);



    return (
        <>
            <div className='field'>
                <label>Club {valAppID}</label>
                <SUI.Dropdown
                        placeholder={"Select club"}
                        scrolling
                        clearable
                        floating
                        fluid
                        loading={DDCLub.load ? true : false}
                        disabled={DDCLub.load ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select club"
                        onChange={(event, { value }) => { onchangeClub(value); }}
                        value={valClubName}
                        options={arrayClub}
                    />
            </div>

            <div className='field'>
                <label>Club %</label>
                <div className="ui left labeled right icon input" style={{maxWidth:"80px"}}>
                    <i className="percent icon violet"></i>
                    <input type="text" className='violetCenter' placeholder="0-100" value={valClubPercent} onChange={(e) => Func.toHundred(e.currentTarget.value,setvalClubPercent)}  />
                </div>
            </div>

            <div className='field'>
                <label>Player{valDownlineID ? ": "+valDownlineName : null}</label>
                <input type='text' value={valDownlineID} onChange={(e) => inputChange(e.target.value, setvalDownlineID)} />
            </div>

            <div className='field'>
                <label>Upline{valUplineID ? ": "+valUplineName : null}</label>
                <input type='text' value={valUplineID} onChange={(e) => inputChange(e.target.value, setvalUplineID)} />
            </div>

            <div className='field'>
                <label>Upline %</label>
                <div className="ui left labeled right icon input" style={{maxWidth:"80px"}}>
                    <i className="percent icon violet"></i>
                    <input type="text" className='violetCenter' placeholder="0-100" value={valUplinePercent} onChange={(e) => {Func.toHundred(e.currentTarget.value,setvalUplinePercent);} }  />
                </div>
            </div>

        </>
    )
  }

