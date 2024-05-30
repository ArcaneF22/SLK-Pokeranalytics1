import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { ExchangeRates } from '../raw/exchangerates'
import { Accounts } from '../raw/accounts'

import * as SUI from 'semantic-ui-react'
import * as Alert from "../../alerts/alerts"
import * as Set from '../../constants';
import * as Func from '../../functions';
import * as Calc from '../../calculations'

export const UpsertRecords = ({formData}) => {

    const fxDDrop                                   = ExchangeRates()

    const [AlertMessage, setAlertMessage]           = useState([{Alert:"", Title:"", Message:"",}]);

    const [fxUSD, setfxUSD]                         = useState(0);
    const [setfxDate, setsetfxDate]                 = useState("");
    const [fxCurrency, setfxCurrency]               = useState("USD");
    const [fxProvider, setfxProvider]               = useState(0);

    const [otherPercent, setotherPercent]           = useState(0);

    const [fxRates, setfxRates]                     = useState(0);
    const [xdecimal, setxDecimal]                   = useState(2);

      const fxDatesDD = fxDDrop.data.map(i => {
        return {
            key: i.id,
            text: Func.toWordDate(i.datestamp),
            description: i.provider,
            value: i.id,
            rates: i.rates,
        };
        })
      
        const onFXDates = (event, data) => {
            setsetfxDate(data.value);
            const i = fxDatesDD.find(option => option.value === data.value);
            if(i){
                setfxProvider(i.description);
                setfxRates(JSON.parse([i.rates]));
                setfxUSD("")
                setfxCurrency("")
    
            }
        };

        function setRates(i){
            const keys = Object.keys(i);
            const values = Object.values(i);
            const combinedArray = keys.map((value, index) => ({
                Key: index,
                Currency: value,
                Value: values[index]|| null,
              }));
            return (combinedArray)
        }

        const fxRatesDD = setRates(fxRates).map(i => {
            return {
                key: i.Currency,
                text: i.Currency+" = $"+i.Value,
                value: i.Value,
                currency: i.Currency,
            };
        })

        const onFXRates = (event, data) => {
            setfxUSD(data.value);
            const i = fxRatesDD.find(option => option.value === data.value);
            if(i){
                setfxCurrency(i.currency)

            }
        };

        useEffect(() => {
            if(setfxDate == "" || setfxDate == null){
                setfxRates({});
                setfxProvider("");
                setfxUSD("1")
                setfxCurrency("USD")
            }
          }, [setfxDate]);

        useEffect(() => {
            if(fxUSD == "" || fxUSD == null){
                setfxUSD("1")
                setfxCurrency("USD")
            }
          }, [fxUSD]);

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

        <div className='ui form message  attached fitted' style={{paddingBottom:"30px",paddingTop:"25px"}}>
            <div className='five field violetText'>

                <div className='two fields stackable'>
                    <div className='field'>
                        <label>FX Date {fxProvider ? ("("+fxProvider+")") : null}</label>
                        <SUI.Dropdown
                                placeholder="Select date"
                                scrolling
                                clearable
                                fluid
                                selection
                                search={true}
                                multiple={false}
                                header="Select date"
                                onChange={onFXDates}
                                value={setfxDate}
                                options={fxDatesDD}
                            />
                    </div>

                    <div className='field'>
                        <label>Currency to FX(USD)</label>
                        <SUI.Dropdown
                                placeholder="Find a currency"
                                scrolling
                                clearable
                                fluid
                                selection
                                search={true}
                                multiple={false}
                                value={fxUSD}
                                header="Find a currency"
                                onChange={onFXRates}
                                noResultsMessage='Please select a date'
                                options={fxRates ? fxRatesDD : []}
                            />
                    </div>

                </div>

                <div className='three fields unstackable'>
                <div className='field'>
                        <label>Club Percent</label>
                        <div className="ui left labeled right icon input">
                            <i className="percent icon violet"></i>
                            <input type="text" className='violetCenter' placeholder="0-100"  value={agencyPercent} onChange={(e) => Func.toHundred(e.currentTarget.value,setagencyPercent)}  />
                        </div>
                    </div>
                    <div className='field'>
                        <label>Customer Percent</label>
                        <div className="ui left labeled right icon input">
                            <i className="percent icon violet"></i>
                            <input type="text" className='violetCenter' placeholder="0-100" value={uplinePercent} onChange={(e) => Func.toHundred(e.currentTarget.value,setuplinePercent)}  />
                        </div>
                    </div>
                    <div className='field'>
                        <label>Extra Percent</label>
                        <div className="ui left labeled right icon input">
                            <i className="percent icon violet"></i>
                            <input type="text" className='violetCenter' placeholder="0-100" value={otherPercent} onChange={(e) => Func.toHundred(e.currentTarget.value,setotherPercent)}  />
                        </div>
                    </div>
                </div>
                <SUI.Accordion panels={panels}  styled fluid className='marginTop15' />
            </div>
        </div>
        <br />

        <h3 className="ui dividing header violet">
            <i className="file excel outline icon"></i>
            <div className="content">
                <div className="header">
                    RESULT
                </div>
                <i style={{fontSize:"13px"}}>Click submit below if result is finalized</i>
            </div>
        </h3>

        <table className='ui table mini compact attached'>
            <thead>
            <tr>
                <th>DATE</th>
                <th>DOWNLINE</th>
                <th>CLUB</th>
                <th>UPLINE</th>
                
                <th>WIN/LOSS</th>
                <th>BONUS</th>
                <th>CURRENCY</th>
                <th>FX(USD)</th>
                <th>BONUS%</th>
                <th>RESULT</th>
                <th>AGENCY ACTION</th>
                <th>AGENCY BONUS</th>
            </tr>
            </thead>
            <tbody>
            {selectedData.map((i, index) => (
                <tr key={index} >
                <td>{Func.lastSunday(i.DATEUNTIL)} - {Func.toWordDate(i.DATEUNTIL)}</td>
                <td>{i.PLAYERID}</td>
                <td>
                    <h5 className="ui header">
                        <div className="content">
                        {i.CLUB}
                        <div className='sub header'>
                            Cut# {agencyPercent}%
                        </div>
                    </div>
                    </h5>
                </td>
                <td>
                    <h5 className="ui header">
                        <div className="content">
                        UPLINE01
                        <div className='sub header'>
                            Cut# {uplinePercent}%
                        </div>
                    </div>
                    </h5>
                </td>
                
                <td>{i.WINNINGTOTAL}</td>
                <td>{i.BONUSTOTAL}</td>
                <td> {fxCurrency} </td>
                <td>${fxUSD}</td>
                <td>
                    {Calc.BonusPercent({
                        WinLoss:        i.WINNINGTOTAL,
                        BonusTotal:     i.BONUSTOTAL,
                        FxUSD:          fxUSD,
                        AgencyPercent:  agencyPercent,
                        UplinePercent:  uplinePercent,
                        OtherPercent:   otherPercent,
                        Decimals:       xdecimal,
                    })}
                </td>
                <td>
                    {Calc.Result({
                        WinLoss:        i.WINNINGTOTAL,
                        BonusTotal:     i.BONUSTOTAL,
                        FxUSD:          fxUSD,
                        AgencyPercent:  agencyPercent,
                        UplinePercent:  uplinePercent,
                        OtherPercent:   otherPercent,
                        Decimals:       xdecimal,
                    })}
                </td>
                <td>
                    {Calc.AgencyAction({
                        WinLoss:        i.WINNINGTOTAL,
                        BonusTotal:     i.BONUSTOTAL,
                        FxUSD:          fxUSD,
                        AgencyPercent:  agencyPercent,
                        UplinePercent:  uplinePercent,
                        OtherPercent:   otherPercent,
                        Decimals:       xdecimal,
                    })}
                </td>
                <td>
                    {Calc.AgencyBonus({
                        WinLoss:        i.WINNINGTOTAL,
                        BonusTotal:     i.BONUSTOTAL,
                        FxUSD:          fxUSD,
                        AgencyPercent:  agencyPercent,
                        UplinePercent:  uplinePercent,
                        OtherPercent:   otherPercent,
                        Decimals:       xdecimal,
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
  