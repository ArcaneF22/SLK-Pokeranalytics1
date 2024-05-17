import { useState, useLayoutEffect, useEffect } from 'react';
import { AccountsUpline } from '../raw/accountsupline'
import { Clubs } from '../raw/clubs'
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Set from '../../constants';
import * as Func from '../../functions';
import useInterval from 'use-interval';


export const DDAccountsUpline = ({onFor, onWhat, onDefault, onSelect}) => {

    const [valued, setValued]                   = useState(0)
    const [uplineIDD, setuplineIDD]               = useState("")
    const [uplineName, setuplineName]           = useState("")
    const [uplinePercent, setuplinePercent]     = useState("")
    const [appID, setappID]                     = useState("")

    const DropDown = AccountsUpline(onFor ? onFor : "ALL", onWhat ? onWhat : "")

    const arrayedDown = DropDown.data.map(i => 
            { return {
                  key:              i.id,
                  text:             i.accountID+": "+i.accountNickname,
                  value:            i.accountID,
                  //image:            { avatar: true, src: i.accountuserAvatar },
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
                  selected:         i.accountID ? i.accountID : 0,
                  uplineid:         i.uplineID ? i.uplineID : 0,
                  uplinename:       i.uplineNickname ? i.uplineNickname : 0,
                  uplinepercent:    i.uplinePercent ? i.uplinePercent : 0,
                  clubidd:          i.clubIDD ? i.clubIDD : 0,
                  appid:            i.appID ? i.appID : 0,
                  disabled:         i.id ? false : true,
            }})

    const arrayedUp = DropDown.data.map(i => 
            { return {
                  key:              i.id,
                  text:             i.accountID+": "+i.accountNickname,
                  value:            i.accountID,
                  //image:            { avatar: true, src: i.accountuserAvatar },
                  content: (
                        <div className="ui list tiny">
                            <div className="item">
                                    <div className="ui header violet">{i.accountID}</div>
                                    <div className="description">{i.accountNickname}</div>
                            </div>
                        </div>
                  ),
                  selected:         i.accountID ? i.accountID : 0,
                  uplineid:         i.uplineID ? i.uplineID : 0,
                  uplinename:       i.uplineNickname ? i.uplineNickname : 0,
                  uplinepercent:    i.uplinePercent ? i.uplinePercent : 0,
                  clubidd:          i.clubIDD ? i.clubIDD : 0,
                  appid:            i.appID ? i.appID : 0,
                  disabled:         i.id ? false : true,
            }})

    useLayoutEffect(() => {
        setValued(onDefault)
      }, []);


      const onChange = (event, i) => {
            setValued(i.value);
            onSelect(valued)
            const e = arrayedDown.find((o) => o.value === i.value);
            setuplinePercent(e.uplinepercent ? e.uplinepercent : 0);
            setuplineIDD(e.uplineid ? e.uplineid : null);
      };

      const upChange = (event, i) => {
            setuplineIDD(i.value);
      };

      useLayoutEffect(() => {
            const  e = arrayedDown.find((o) => o.value === onDefault);
            if (e) {
                setuplinePercent(e.uplinepercent ? e.uplinepercent : 0);
                setuplineIDD(e.uplineid ? e.uplineid : null);
            }
      }, [DropDown.load == true]);



    return (
        <>
            <div className='field'>
                <label>Downline ID</label>
                <SUI.Dropdown
                        placeholder={"Select downline"+onDefault}
                        scrolling
                        clearable
                        floating
                        fluid
                        loading={DropDown.load ? true : false}
                        disabled={DropDown.load ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select downline"
                        onChange={onChange}
                        value={valued}
                        options={arrayedDown}
                    />
            </div>

            <div className='field'>
                <label>Upline ID</label>
                <SUI.Dropdown
                        placeholder={"Select upline"+onDefault}
                        scrolling
                        clearable
                        floating
                        fluid
                        loading={DropDown.load ? true : false}
                        disabled={DropDown.load ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select upline"
                        onChange={upChange}
                        value={uplineIDD}
                        options={arrayedUp}
                    />
            </div>

            <div className='field'>
                <label>Upline %</label>
                <div className="ui left labeled right icon input" style={{maxWidth:"80px"}}>
                    <i className="percent icon violet"></i>
                    <input type="text" className='violetCenter' placeholder="0-100" value={uplinePercent} onChange={(e) => Func.toHundred(e.currentTarget.value,setuplinePercent)}  />
                </div>
            </div>

        </>
    )
  }


  
export const DDAccountsClubs = ({onFor, onWhat, onDefault, onSelect}) => {

    const [valued, setValued] = useState(0)

    const DropDown = Clubs(onFor ? onFor : "ALL", onWhat ? onWhat : "")

    const arrayed = DropDown.data.map(i => 
      { return {
                  key:              i.idd,
                  text:             i.idd+": "+i.name,
                  //description:      i.uplinePercent+"% Upline: "+i.uplineID,
                  value:            i.name,
                  //image:            { avatar: true, src: i.imageFull ? i.imageFull : "./images/club.png" },
                  appid:            i.appID ? i.appID : 0,
                  disabled:         i.idd ? false : true,
                  content: (
                        <div className="ui list mini">
                            <div className="item">
                                <div className="header">{i.idd}</div>
                                <div className="description">{i.name}</div>
                            </div>
                        </div>
                  ),
        }})

    useLayoutEffect(() => {
        setValued(onDefault)
      }, []);
  


    return (
        <>
            <div className='field'>
                <label>Club ID</label>
                <SUI.Dropdown
                        placeholder={"Select club"}
                        scrolling
                        clearable
                        floating
                        fluid
                        loading={DropDown.load ? true : false}
                        disabled={DropDown.load ? true : false}
                        selection
                        search={true}
                        multiple={false}
                        header="Select club"
                        onChange={(event, { value }) => { setValued(value),onSelect(valued); }}
                        value={valued}
                        options={arrayed}
                    />
            </div>

        </>
    )
  }