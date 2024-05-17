import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { ExchangeRates } from '../fetch/raw/exchangerates'
import { Accounts } from '../fetch/raw/accounts'
import * as SUI from 'semantic-ui-react'
import * as Alert from "../alerts/alerts"
import * as Set from '../constants';
import * as Func from '../functions';
import * as Calc from '../calculations'

export const UpsertRecords = ({selectedData,recallData}) => {

    const fxDD                                      = ExchangeRates().data
    const load                                      = ExchangeRates().load
    const acctDD                                    = Accounts().data

    const [AlertMessage, setAlertMessage]           = useState([{Alert:"", Title:"", Message:"",}]);

    const [fxUSD, setfxUSD]                         = useState(.95);
    const [setfxDate, setsetfxDate]                 = useState("");
    const [fxCurrency, setfxCurrency]               = useState("USD");
    const [fxProvider, setfxProvider]               = useState(0);

    const [agencyPercent, setagencyPercent]         = useState(30);
    const [uplinePercent, setuplinePercent]         = useState(15);
    const [otherPercent, setotherPercent]           = useState(0);
    const [onradio, setonRadio]                     = useState(0);

    const [fxRates, setfxRates]                     = useState(0);
    const [xdecimal, setxDecimal]                   = useState(2);


        const downlinesDD = acctDD.map(i => {
            return {
            key: i.id,
            text: i.accountID+": "+i.accountNickname,
            description: i.accountRole,
            value: i.accountID,
            image: { avatar: true, src: i.userAvatar },
            ddd: i.appID ? i.appID : 0,
            };
        })

      const fxDatesDD = fxDD.map(i => {
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
                setfxProvider("");
                setfxUSD("1")
                setfxCurrency("USD")
            }
          }, [fxUSD]);

//Accordion
const panels = [
    {
      key: '1',
      title: {
        content: <span className='violetCenter'>Additional Settings</span>,
        icon: 'cogs',
      },
      content: {
        content: (
                <>
                <div className="four fields">
                    <div className="field">
                        <label>Decimal number</label>
                        <input type='text' className='violetCenter' placeholder="0" value={xdecimal} onChange={(e) => Func.toWholeNumber5(e.currentTarget.value,setxDecimal)} />
                    </div>
                </div>
                <div>
                </div>
                </>
        ),
      },
    }
  ]

  const radioChange = (e, { value }) => {
    setonRadio(value);
  };
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

        <div className="ui attached message violet">
            <h3 className="header">
                <i className="calculator icon"></i>
                CALCULATION SETTINGS
            </h3>
        </div>
        
        <div className='ui form message violet attached fitted' style={{paddingBottom:"30px",paddingTop:"25px"}}>
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
        <div className="ui attached message">
            <h3 className="header">
                <i className="table icon"></i>
                COMPUTATION RESULT
            </h3>
        </div>
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
        {selectedData ? 
            <div className='ui message black'>
                <pre>
                    {Func.stringify(selectedData)}
                </pre>
            </div>
        : null}

      </div>
          </>
    );
  };
  