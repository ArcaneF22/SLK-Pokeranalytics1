import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import * as SUI from 'semantic-ui-react'
import * as Alert from "../alerts/alerts"

import * as Set from '../constants';

export const UpsertRecords = ({selectedData,recallData}) => {
    const [AlertMessage, setAlertMessage] =   useState([{Alert:"", Title:"", Message:"",}]);

    const [fxUSD, setfxUSD] =                           useState(0);
    const [currency, setCurrency] =           useState(0);
    const [agencyPercent, setagencyPercent] =           useState(0);
    const [customPercent, setcustomPercent] =           useState(0);

    const fromTable = () => {

            setaccountID(selectedData.id === null || selectedData.id === undefined ? "0" : selectedData.id)
            setaccountIDD(selectedData.idd === null || selectedData.idd === undefined ? "0" : selectedData.idd)
            setaccountRole(selectedData.role === null || selectedData.role === undefined ? "" : selectedData.role)
            setaccountNickname(selectedData.nickname === null || selectedData.nickname === undefined ? "" : selectedData.nickname)
            setaccountuserID(selectedData.userID === null || selectedData.userID === undefined ? "" : selectedData.userID)
            setaccountappID(selectedData.appID === null || selectedData.appID === undefined ? "" : selectedData.appID)

    }

    function convertDate(i) {
        const newDate = new Date(i.DATEUNTIL).getTime()
        const formattedDate = Set.getDateTime(newDate);
        return formattedDate;
    }


    function fromDate(i) {
        const ddate = new Date(i.DATEUNTIL);
        const numDay = ddate.getDay();
        const Sun = new Date(ddate);
        Sun.setDate(ddate.getDate() - numDay);
        const sunday = Sun.toDateString()
        return sunday;
    }
    return (
          <>

{ AlertMessage['Alert'] == "success" ? 
          <Alert.Success
                key="Success" 
                AlertMessage={AlertMessage} 
                open={AlertMessage['Alert'] == "success" ? true : false}  
                onClose={() => { setAlertMessage([{Alert:"", Title:"", Message:"",}]) }} />
      :  AlertMessage['Alert'] == "warning" ? 
          <Alert.Warning 
                key="Warning" 
                AlertMessage={AlertMessage} 
                open={AlertMessage['Alert'] == "warning" ? true : false} 
                onClose={() => { setAlertMessage([{Alert:"", Title:"", Message:"",}]) }} />
      : null
      }

      <div className="ui segment basic  left aligned">
        <h3 className="ui horizontal divider header">
          Insert / Update Accounts
        </h3>
        <br />

        <div className='ui form'>
            <div className='four fields'>
                <div className='field'>
                    <label>Currency</label>
                    <input value={currency} onChange={(e) => setCurrency(e.currentTarget.value)} />
                </div>
                <div className='field'>
                    <label>FX (USD)</label>
                    <input value={fxUSD} onChange={(e) => setfxUSD(e.currentTarget.value)} />
                </div>
                <div className='field'>
                    <label>Agency %</label>
                    <input value={agencyPercent} onChange={(e) => setagencyPercent(e.currentTarget.value)} />
                </div>
                <div className='field'>
                    <label>Customer %</label>
                    <input value={customPercent} onChange={(e) => setcustomPercent(e.currentTarget.value)} />
                </div>
            </div>
        </div>
        
        <table className='ui table'>
            <thead>
            <tr>
                <th>FROM</th>
                <th>UNTIL</th>
                <th>CLUB</th>
                <th>DOWNLINE</th>
                <th>CURRENCY</th>
                <th>WIN/LOSS</th>
                <th>BONUS</th>
                <th>FX (USD)</th>
                <th>Club%</th>
                <th>Customer%</th>
                <th>BONUS %</th>
                <th>RESULT</th>
                <th>AGENCY ACTION</th>
            </tr>
            </thead>
            <tbody className='center aligned'>
            {selectedData.map((i, index) => (
                <tr key={index}>
                <td>{fromDate(i)}</td>
                <td>{convertDate(i)}</td>
                <td>{i.CLUB}</td>
                <td>{i.PLAYERID}</td>
                <td>{currency}</td>
                <td>{i.WINNINGTOTAL}</td>
                <td>{i.BONUSTOTAL}</td>
                <td>{fxUSD}</td>
                <td>{agencyPercent}</td>
                <td>{customPercent}</td>
                <td>{i.BONUSTOTAL * (agencyPercent / 100)}</td>
                <td>{(i.WINNINGTOTAL + i.BONUSTOTAL) * fxUSD * customPercent}</td>
                <td>{(i.WINNINGTOTAL + i.BONUSTOTAL) * fxUSD}</td>
                </tr>
            ))}
            </tbody>
        </table>
        
      </div>
          </>
    );
  };
  