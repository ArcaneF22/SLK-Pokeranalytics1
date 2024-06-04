import React, { useState, useEffect, useLayoutEffect } from 'react';

import * as SUI from 'semantic-ui-react'
import * as Alert from "../alerts/alerts"
import * as Set from '../constants';
import * as Func from '../functions';
import * as Calc from '../calculations'

export const UpsertRecords = ({selectedData,recallData,formSetting}) => {

    const [AlertMessage, setAlertMessage]           = useState([{Alert:"", Title:"", Message:"",}]);
    const [otherPercent, setotherPercent]           = useState(0);
    const [xdecimal, setxDecimal]                   = useState(2);

    useEffect(() => {

    }, []);


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


        <h4 className="ui dividing header violet">
            <i className="file excel outline icon"></i> RESULT
        </h4>

        <table className='ui table message mini attached '>
            <thead>
            <tr>
                <th>DATE</th>
                <th>DOWNLINE</th>
                <th>CLUB</th>
                <th>UPLINE</th>
                <th>Per USD</th>
                <th>WIN/LOSS</th>
                <th>BONUS</th>
                <th>BONUS%</th>
                <th>RESULT</th>
                <th>AGENCY ACTION</th>
                <th>AGENCY BONUS</th>
            </tr>
            </thead>
            <tbody>
            {selectedData.map((i, index) => (
                <tr key={index} >
                <td>{i.DATEUNTIL} 
                    <br/>
                    to {i.DATEUNTIL}
                </td>
                <td>
                    <a className="data">
                        ID: {i.PLAYERID}
                        <br/> 
                        {i.PLAYERNAME ? "("+i.PLAYERNAME+")" : null}
                    </a>
                </td>
                <td>
                    <a className="data">{i.CLUB}</a>
                    <div className="metadata">
                        Cut# {i.CLUBPERCENT}%
                    </div>
                </td>
                <td>
                    <a className="data">
                        ID: {i.UPLINEID}
                        <br/> 
                        {i.UPLINENAME ? "("+i.UPLINENAME+")" : null}
                    </a>
                    <div className="metadata">
                        Cut# {i.UPLINEPERCENT}%
                    </div>
                </td>
                <td> 
                    <a className="data">{Func.byNoParentheses(i.FXDATE)}</a>
                    <div className="metadata">
                        {i.FXCURRENCY}: ${i.FXUSD}
                    </div>
                </td>
                <td className='center aligned'>
                    {i.WINLOSSTOTAL}
                </td>
                <td className='center aligned'>
                    {i.BONUSTOTAL}
                </td>
                <td className='center aligned'>
                    {Calc.BonusPercent({
                        WinLoss:        i.WINLOSSTOTAL,
                        BonusTotal:     i.BONUSTOTAL,
                        FxUSD:          i.FXUSD,
                        AgencyPercent:  i.CLUBPERCENT,
                        UplinePercent:  i.UPLINEPERCENT,
                        OtherPercent:   i.OTHERPERCENTA,
                        Decimals:       i.DECIMALS,
                    })}
                </td>
                <td className='center aligned'>
                    {Calc.Result({
                        WinLoss:        i.WINLOSSTOTAL,
                        BonusTotal:     i.BONUSTOTAL,
                        FxUSD:          i.FXUSD,
                        AgencyPercent:  i.CLUBPERCENT,
                        UplinePercent:  i.UPLINEPERCENT,
                        OtherPercent:   i.OTHERPERCENTA,
                        Decimals:       i.DECIMALS,
                    })}
                </td>
                <td className='center aligned'>
                    {Calc.AgencyAction({
                        WinLoss:        i.WINLOSSTOTAL,
                        BonusTotal:     i.BONUSTOTAL,
                        FxUSD:          i.FXUSD,
                        AgencyPercent:  i.CLUBPERCENT,
                        UplinePercent:  i.UPLINEPERCENT,
                        OtherPercent:   i.OTHERPERCENTA,
                        Decimals:       i.DECIMALS,
                    })}
                </td>
                <td className='center aligned'>
                    {Calc.AgencyBonus({
                        WinLoss:        i.WINLOSSTOTAL,
                        BonusTotal:     i.BONUSTOTAL,
                        FxUSD:          i.FXUSD,
                        AgencyPercent:  i.CLUBPERCENT,
                        UplinePercent:  i.UPLINEPERCENT,
                        OtherPercent:   i.OTHERPERCENTA,
                        Decimals:       i.DECIMALS,
                    })}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className='ui segment basic center aligned'>
            <div className='ui button purple'>
                <i className='check icon'></i>
                SUBMIT
            </div>
        </div>
        {selectedData ? 
            <div className='ui message black hidden'>
                <pre>
                    {Func.stringify(selectedData)}
                </pre>
            </div>
        : null}

      </div>
          </>
    );
  };
  