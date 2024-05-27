import { useState, useLayoutEffect, useEffect } from 'react';
import { AccountsPlayers } from '../raw/accounts'
import { Clubs } from '../raw/clubs'
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Set from '../../constants';
import * as Func from '../../functions';
import useInterval from 'use-interval';

export const FormRecords = ({formData, returnData}) => {
    const Token = JSON.parse( localStorage.getItem('Token') );

    const [edited, setEdited]                   = useState("")
    const [appID, setappID]                     = useState("")
    const [appName, setappName]                 = useState("")
    const [clubIDD, setclubIDD]                 = useState("")
    const [clubName, setclubName]               = useState("")
    const [clubsubName, setclubsubName]         = useState("")
    const [clubPercent, setclubPercent]         = useState("")
    const [clubsubPercent, setclubsubPercent]   = useState("")
    const [playerID, setplayerID]               = useState("")
    const [playersubID, setplayersubID]         = useState("")
    const [uplineEdit, setuplineEdit]           = useState(false)
    const [uplineID, setuplineID]               = useState("")
    const [uplinePercent, setuplinePercent]     = useState("")

    //DROPDOWNS
    const [recall, setRecall]                   = useState(true)
    const [loadedClub, setloadedClub]           = useState(false)
    const DDropCLub                             = Clubs("ALL","")

    const [DDropPlayer, setDDropPlayer]         = useState([])
    const [loadDDPlayer, setloadDDPlayer]       = useState(false)

    const [DDropUpline, setDDropUpline]         = useState([])
    const [loadDDUpline, setloadDDUpline] = useState(false)

    const Auth = {
                        A:      Token['id'],
                        B:      Token['token'],
                        C:      Token['gadget'],
                        D:      Set.TimeZoned,
                    }; 

    const itemClubs = DDropCLub.data.map(i => 
        {
            return {
                    key:              i.idd,
                    text:             (i.idd+": "+ i.name),
                    value:            i.name,
                    clubidd:          i.idd ? i.idd : 0,
                    appid:            i.appID ? i.appID : 0,
                    appname:          i.appName ? i.appName : 0,
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
    
    const itemPlayers  = DDropPlayer.map(i => 
        { return {
                    key:              i.id,
                    text:             (i.accountID+": "+ i.accountNickname),
                    value:            i.accountID,
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
                                            {i.uplinePercent ? <div className="description">with {i.uplinePercent}% cut</div> : null}
                                    </div>
                                </div>
                          ),
              }})

    const itemUplines  = DDropUpline.map(i => 
        { return {
                    key:              i.id,
                    text:             (i.accountID+": "+ i.accountNickname),
                    value:            i.accountID,
                    disabled:         i.accountID ? false : true,
                    clubidd:          i.clubIDD ? i.clubIDD : 0,
                    uplinepercent:    i.uplinePercent ?  i.uplinePercent : 0,
                    content: (
                        <div className="ui list tiny">
                            <div className="item">
                                    <div className="ui header violet">{i.accountID}</div>
                                    <div className="description">{i.accountNickname}</div>
                                    {i.uplinePercent ? <div className="description">with {i.uplinePercent}% cut</div> : null}
                            </div>
                        </div>
                  ),
              }})

    //ON PAGE LOAD
    useLayoutEffect(() => {
        setEdited(formData.Edited)
        setclubName(formData.ClubName)
        setplayerID(formData.PlayerID)
        setplayersubID(formData.PlayerID)
        if(formData.Edited == true){
            setclubPercent(formData.ClubPercent)
            setuplineID(formData.UplineID)
            setuplinePercent(formData.UplinePercent)
        }
    }, []);

    //ON CLUB LIST LOAD
    useLayoutEffect(() => {
            const c  = itemClubs.find((i) => i.value == clubName);
            if(c){
                setclubsubName("")
                setappID(c.appid ? c.appid : 0)
                setappName(c.appname ? c.appname : 0)
                if(formData.Edited == false){
                    setclubPercent(c.percent ? c.percent : 0)
                } else {
                    setclubPercent(formData.ClubPercent ? formData.ClubPercent : 0)
                }
                fetchDDPlayer(c.appid,c.clubidd)
                fetchDDUpline(c.appid,c.clubidd,playerID)
                onchangePlayer(playerID)
            }
            setloadedClub(true)
    }, [DDropCLub.fill=="yes"]);

    //ON CHANGE OF CLUB DROPDOWN 
    const onchangeClub = (i) => {
        setclubName(i);
        setEdited(true)
        setclubsubName("")
        const c = itemClubs.find((o) => o.value === i);
        if (c){
            setappID                (c.appid            ? c.appid           : 0);
            setappName              (c.appname          ? c.appname         : 0);
            setclubPercent          (c.percent          ? c.percent         : 0);
            setclubIDD              (c.key              ? c.key             : 0);
            fetchDDPlayer           (c.appid,c.clubidd)
            fetchDDUpline           (c.appid,c.clubidd,playerID)
            onchangePlayer(playerID)
        }
    };

    //ON CHANGE OF PLAYER DROPDOWN 
    const onchangePlayer = (i) => {
        setplayerID(i)
        const p  = itemPlayers.find((o) => o.value == i);
        
        if(p){
            setuplineID(p.uplineid ? p.uplineid : 0)
            setuplinePercent(p.uplinepercent ? p.uplinepercent : 0)
            fetchDDUpline(p.appid,p.clubidd,p.value)

            const u  = itemUplines.find((o) => o.value == p.uplineid);
            if(u){
                setuplineID(u.value ? u.value : 0)
                setuplinePercent(u.uplinepercent ? u.uplinepercent : 0)
            }
        }

    };

    //ON CHANGE OF PLAYER DROPDOWN 
    const onchangeUpline = (i) => {
        setuplineID(i)
        console.log("Sent Upline: "+i)
        const u  = itemUplines.find((o) => o.value == i);
        if(u){
            console.log("Upline: "+u.value)
            setuplineID(u.value ? u.value : 0)
            setuplinePercent(u.uplinepercent ? u.uplinepercent : 0)
        }
    };

    //ON CHANGE OF INPUT 
    const inputChange = (i,e) => {
        setEdited(true)
        e(i)
    }

    async function fetchDDPlayer(i,ii) {
        setloadDDPlayer(true)
        try {
            const response = await axios.post(Set.Fetch['accountsupline'], {...Auth,FOR:"PLAYER", WHAT:i, WHAT2:ii,});
                setDDropPlayer(response.data);
                setloadDDPlayer(false)
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    async function fetchDDUpline(i,ii,iii) {
        setloadDDUpline(true)
        try {
            const response = await axios.post(Set.Fetch['accountsupline'], {...Auth,FOR:"UPLINE",WHAT:i,WHAT2:ii,WHAT3:iii,});
                setDDropUpline(response.data);
                setloadDDUpline(false)
                //console.log(JSON.stringify(response.data))
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    //EVERYTIME CLUBNAME VALUE IS CHANGED
    useLayoutEffect(() => {
        if(clubName == ""){
            setappID(0)
            setappName("")
            setclubIDD("")
        }
        if(uplineID == playerID){
            setuplineID("")
            setuplinePercent("")
        }
    }, [clubName]);

    //SAVE DATA EVERYTIME A VALUE IS CHANGED
    useLayoutEffect(() => {
        if(edited === true){
            returnData({
                index:          formData.Index,
                edited:         edited,
                appID:          appID,
                appName:        appName,
                clubIDD:        clubIDD,
                clubName:       clubName,
                clubPercent:    clubPercent,
                playerID:       playerID,
                uplineID:       uplineID,
                uplinePercent:  uplinePercent,
            })
        }
    }, [appID,clubName,clubPercent,playerID,uplineID,uplinePercent]);


    return (<>
            <div className='field'>
                <label>
                    {clubsubName ? <p className="ui mini red text"><i className="attention icon red"></i>Club: {clubsubName}?</p> : appName+"'s Club"}
                </label>
                <SUI.Dropdown
                        placeholder={clubsubName ?  "Not found!" : "Select a club"}
                        scrolling
                        clearable
                        floating
                        fluid
                        loading={DDropCLub.load ? true : false}
                        disabled={DDropCLub.load ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select club"
                        onChange={(event, { value }) => { onchangeClub(value); }}
                        value={clubName}
                        options={itemClubs}
                    />
            </div>
            <div className='field'>
                <label>Club %</label>
                <input type='text' value={clubPercent} onChange={(e) => inputChange(Func.byHundred(e.target.value),setclubPercent)} />
            </div>
            <div className='field'>
                <label>
                    Player: {playersubID}
                </label>
                <SUI.Dropdown
                        placeholder={playersubID ?  "Not found!" : "Select a player"}
                        scrolling
                        clearable
                        floating
                        fluid
                        loading={loadDDPlayer ? true : false}
                        disabled={loadDDPlayer ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select player"
                        onChange={(event, { value }) => { onchangePlayer(value); }}
                        value={playerID}
                        options={itemPlayers}
                    />

                <input type='text' value={playerID} onChange={(e) => inputChange(Func.byNumber(e.target.value),setplayerID)} />
            </div>
            <div className='field'>
                <label>Upline {uplineID}</label>
                <SUI.Dropdown
                        placeholder={uplineID ?  "Not found!" : "Select a upline"}
                        scrolling
                        clearable
                        floating
                        fluid
                        loading={loadDDUpline ? true : false}
                        disabled={loadDDUpline ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select upline"
                        onChange={(event, { value }) => { onchangeUpline(value); }}
                        value={uplineID}
                        options={itemUplines}
                    />
                <input type='text' value={uplineID} onChange={(e) => inputChange(Func.byNumber(e.target.value),setuplineID)} />
            </div>
            <div className='field'>
                <label>Upline %</label>
                <input type='text' value={uplinePercent} onChange={(e) => inputChange(Func.byHundred(e.target.value),setuplinePercent)} />
            </div>
            </>)

}
