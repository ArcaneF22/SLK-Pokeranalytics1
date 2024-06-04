import { useState, useLayoutEffect, useEffect } from 'react';
import { Accounts } from '../raw/accounts'
import { Clubs } from '../raw/clubs'
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Set from '../../constants';
import * as Func from '../../functions';


export const FormRecords = ({formData, returnData,dataClubs,fillClubs,dataAccounts,fillAccounts,dataUplines,fillUplines,onFXSetting}) => {
    const Token = JSON.parse( localStorage.getItem('Token') );

    const [edited, setEdited]                   = useState("")
    const [appID, setappID]                     = useState("")
    const [appName, setappName]                 = useState("")
    const [clubIDD, setclubIDD]                 = useState("")
    const [clubName, setclubName]               = useState("")
    const [clubsubName, setclubsubName]         = useState("")
    const [clubPercent, setclubPercent]         = useState("")
    const [playerID, setplayerID]               = useState("")
    const [playerAppID, setplayerAppID]         = useState("")
    const [playerName, setplayerName]           = useState("")
    const [playerFind, setplayerFind]           = useState("")
    const [uplineName, setuplineName]           = useState("")
    const [uplineValue, setuplineValue]         = useState("")
    const [uplineID, setuplineID]               = useState("")
    const [uplinePercent, setuplinePercent]     = useState("")

    const [inComplete, setinComplete]           = useState("")
    const [notEqualAppID, setnotEqualAppID]     = useState("")

    //ON PAGE LOAD
    useEffect(() => {
        setEdited(formData.Edited)
        setclubName(formData.ClubName)
        setplayerID(formData.PlayerID)
        setplayerName(formData.PlayerName)
        setclubPercent(formData.ClubPercent)
        setuplineValue(formData.UplineValue)
        setuplineID(formData.UplineID)
        setuplineName(formData.UplineName)
        setuplinePercent(formData.UplinePercent)
        setplayerFind(formData.PlayerFind)
        checkingClub(formData.ClubName)
    }, []);

    useLayoutEffect(() => {
        checkingClub(clubName)
    }, [fillClubs == "yes"]);

    const clearUpline = () => {
        setuplineID("")
        setuplineValue("")
        setuplineName("")
    }

    const checkingClub = (A) => {
        const x = dataClubs.find(i => i.value === A);
        if(x){
            setappID(x.appid ? x.appid : 0)
            setappName(x.appname ? x.appname : "")
            setclubIDD(x.clubidd ? x.clubidd : "")
            setclubPercent(x.percent ? x.percent : 0)
            lookoutAccounts(playerID ? playerID : formData.PlayerID,x.appid)
            clearUpline
        }
        checkingAccounts(playerID)
    }
 

    const checkingAccounts = (A) => {
        const x = dataAccounts.find((i) => i.value == A);
        if(x){
            setplayerName(x.downlinename ? x.downlinename : "")
            setplayerAppID(x.appid)
            if(onFXSetting.upline == "Auto"){
                setuplineID(x.uplineid ? x.uplineid : "")
                setuplineValue(x.uplineid+" with "+ x.uplinepercent+"%")
                setuplinePercent(x.uplinepercent ? x.uplinepercent : 0)
                checkingUplines(A,clubIDD)
            }
        }
    }

    
    const checkingUplines = (A,B) => {
        const x = dataUplines.find((i) => (i.downlineid === A & i.clubidd === B));
        if(x){
            setuplineName(x.downlinename ? x.downlinename : "")
            setuplineID(x.accountid ? x.accountid : "")
            setuplinePercent(x.uplinepercent ? x.uplinepercent : 0)
            setuplineValue(x.accountid+" with "+ x.uplinepercent+"%")
            setEdited(true)
        }

    }

    const lookoutAccounts = (A,B) => {
        if(fillAccounts == "yes" && fillClubs == "yes"){
            const x = dataAccounts.find((h) => h.value === A);
            if(x){
                if(x.appid == B){
                    setplayerFind("Found")
                    setplayerName(x.downlinename ? x.downlinename : "")
                    setplayerAppID(x.appid)

                    if(onFXSetting.upline == "Auto"){
                        setuplineID(x.uplineid ? x.uplineid : "")
                        setuplineValue(x.uplineid+" with "+ x.uplinepercent+"%")
                        setuplinePercent(x.uplinepercent ? x.uplinepercent : 0)
                        checkingUplines(A,clubIDD)
                    }
                } else {
                    setplayerFind("WrongApp")
                }
            }
            if(!x){
                setplayerFind("None")
            }
        }
    }

    //ON CHANGE OF CLUB DROPDOWN 
    const onchangeClub = (i) => {
        checkingClub(i)
        const T = setTimeout(() => {
            setclubName(i)
            setEdited(false)
            setuplineID("")
            setuplineValue("")
            setuplineName("")
            if(playerID != ""){
                clearUpline
                checkingAccounts(playerID)
            }
        }, 10);
        return () => clearTimeout(T);
    };

    //ON CHANGE OF PLAYER DROPDOWN 
    const onchangePlayer = (i) => {
        const T = setTimeout(() => {
            setplayerID(i)
            checkingAccounts(i)
            if(onFXSetting.upline == "Auto"){
                checkingUplines(i,clubIDD)
            }
            if(i == uplineID){
                setuplineID("")
                setuplineValue("")
                setuplineName("")
            }
        }, 10);
        return () => clearTimeout(T);
    };

    //ON CHANGE OF PLAYER DROPDOWN 
    const onchangeUpline = (i) => {
        setuplineValue(i)
        const x = dataUplines.find((o) => o.value == i);
        if(x){
            const T = setTimeout(() => {
                    if(x.downlineid == playerID && x.clubidd == clubIDD){
                        setuplineID(x.accountid)
                        if(onFXSetting.upline == "Auto"){
                            setuplinePercent(x.uplinepercent)
                        }
                        setEdited(true)
                    } else if(x){
                        setuplineName(x.downlinename)
                        setuplineID(x.accountid)
                        setuplineValue(x.accountid+" with "+ x.uplinepercent+"%")
                        console.log(x.accountid+" with "+ x.uplinepercent+"%")
                        setEdited(true)
                    }
                if(x.accountid == playerID){
                    setplayerID("")
                }
            }, 10);
            return () => clearTimeout(T);
        }

    };

    //ON CHANGE OF INPUT 
    const inputChange = (i,e) => {
        setEdited(true)
        e(i)
        if(e==setplayerID){
            lookoutAccounts(i,appID)
        }
    }

    const dataOfPlayers = () => {
        return dataAccounts.filter((option) => (option.appid == appID))
    }

    const dataOfUplines = () => {
        return dataUplines.filter((option) => (option.accountid !== playerID && option.appid === appID))
    }

    useLayoutEffect(() => {
        if(clubName == ""){
            setappID("")
            setappName("")
            setclubIDD("")
        }
        if(uplineValue == ""){
            setuplineValue("")
            setuplineID("")
        }
    }, [clubName,uplineValue]);

    useLayoutEffect(() => {

        if(onFXSetting.upline == "Auto"){
            checkingUplines(playerID,clubIDD)
        } else if(onFXSetting.upline == "Manual"){

        }
        if(onFXSetting.upline == "Auto"){
            checkingUplines(playerID,clubIDD)
        } else {

        }

    }, [onFXSetting]);

    useLayoutEffect(() => {
        if(appID != playerAppID){
            //console.log(appID+" Not equal "+playerAppID)
            setnotEqualAppID("Not")
        } else {
            //console.log(appID+" equal "+playerAppID)
            setnotEqualAppID("Equal")
        }
    }, [playerID,clubIDD]);

    useLayoutEffect(() => {
        returnData({
            index:          formData.Index,
            incomplete:     inComplete,
            edited:         edited,
            appID:          appID,
            appName:        appName,
            clubIDD:        clubIDD,
            clubName:       clubName,
            clubPercent:    clubPercent,
            playerID:       playerID,
            playerName:     playerName,
            uplineID:       uplineID,
            uplineName:     uplineName,
            uplinePercent:  uplinePercent,
            uplineValue:    uplineValue,
            playerFind:     playerFind,
        })
    }, [edited,appID,clubName,clubPercent,playerID,uplineID,uplinePercent,uplineValue,playerFind]);


        return (<>

            <div className='field'>

                <label>
                    {appID}
                    {clubsubName && fillClubs=="yes"? 
                        <p className="ui mini red text">
                            <i className="large exclamation circle red icon"></i>
                            {clubsubName ? "Club: "+clubsubName : "Club"}?
                        </p> 
                        : 
                        appName ? appName+"'s Club" : <><i className="large exclamation circle red icon"></i>Club</>
                        }
                </label>
                <SUI.Dropdown
                        placeholder={clubsubName ?  "Not found!" : "Select..."}
                        scrolling
                        floating
                        fluid
                        loading={false}
                        disabled={false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select club"
                        onChange={(event, { value }) => { onchangeClub(value); }}
                        value={clubName}
                        options={dataClubs}
                    />
            </div>
            <div className='field'>
                <label>{Func.onIncLabel(clubPercent,0)} Club rake back %</label>
                <div className="ui left labeled right icon input">
                    <i className="percent icon"></i>
                    <input type="text" className='blandCenter' disabled={clubIDD ? false : true} value={clubPercent} onChange={(e) => inputChange(Func.byHundred(e.target.value),setclubPercent)}  />
                </div>
            </div>

            <div className='field'>
                            <label>
                                {Func.onIncLabel(playerID)}
                                {playerFind == "WrongApp" ? 
                                        <><i className="info circle red icon"></i>Wrong app!</>  
                                : playerFind == "None" ? 
                                        <><i className="info circle red icon"></i>New player?</>
                                : "Player"}
                            </label>

                            {playerFind == "Found" ? 
                            <SUI.Dropdown
                                    placeholder={playerFind == "None" ?  "Not found!" : "Select..."}
                                    scrolling
                                    floating
                                    disabled={clubIDD ? false : true}
                                    fluid
                                    selection
                                    search={true}
                                    multiple={false}
                                    header="Select player"
                                    onChange={(event, { value }) => { onchangePlayer(value); }}
                                    value={playerID}
                                    options={dataOfPlayers()}
                            />
                            :
                            <input type="text" value={playerID} disabled={clubIDD ? false : true} onChange={(e) => inputChange(e.target.value,setplayerID)}  />
                            }

            </div>
            
            <div className='field'>
                <label>
                    {Func.onIncLabel(uplineID)} 
                    {inComplete == "APP" ?
                    "Upline: "+uplineID 
                    :
                    "Upline" }
                </label>
                <SUI.Dropdown
                        placeholder={inComplete == "APP" ?  "Not found!" : "Select an upline"}
                        scrolling
                        clearable
                        disabled={clubIDD ? false : true}
                        floating
                        fluid
                        selection
                        search={true}
                        multiple={false}
                        header="Select upline"
                        onChange={(event, { value }) => { onchangeUpline(value); }}
                        value={uplineValue}
                        options={dataOfUplines()}
                    />

            </div>
            
            <div className='field'>
                <label>{Func.onIncLabel(uplinePercent,0)} CX rake back %</label>
                <div className="ui left labeled right icon input">
                    <i className="percent icon"></i>
                    <input type="text" className='blandCenter' disabled={clubIDD ? false : true} value={uplinePercent} onChange={(e) => inputChange(Func.byHundred(e.target.value),setuplinePercent)}  />
                </div>
            </div>
            </>)


}
