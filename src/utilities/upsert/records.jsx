import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { ExchangeRates } from '../fetch/raw/exchangerates'
import CurrencyInput from 'react-currency-input-field';
import * as SUI from 'semantic-ui-react'
import * as Alert from "../alerts/alerts"
import * as Set from '../constants';
import * as Func from '../functions';

export const UpsertRecords = ({selectedData,recallData}) => {

    const data = ExchangeRates().data
    const load = ExchangeRates().load

    const [AlertMessage, setAlertMessage] =   useState([{Alert:"", Title:"", Message:"",}]);

    const [fxUSD, setfxUSD] =                           useState(.95);
    const [fxUSDDate, setfxUSDDate] =                   useState("");
    const [currency, setCurrency] =                     useState(1);
    const [agencyPercent, setagencyPercent] =           useState(30);
    const [customPercent, setcustomPercent] =           useState(15);
    const [extraPercent, setextraPercent] =             useState(0);
    const [onradio, setonRadio] =             useState(0);

    const [xdecimal, setxDecimal] =             useState(2);
    const fromTable = () => {

            setaccountID(selectedData.id === null || selectedData.id === undefined ? "0" : selectedData.id)
            setaccountIDD(selectedData.idd === null || selectedData.idd === undefined ? "0" : selectedData.idd)
            setaccountRole(selectedData.role === null || selectedData.role === undefined ? "" : selectedData.role)
            setaccountNickname(selectedData.nickname === null || selectedData.nickname === undefined ? "" : selectedData.nickname)
            setaccountuserID(selectedData.userID === null || selectedData.userID === undefined ? "" : selectedData.userID)
            setaccountappID(selectedData.appID === null || selectedData.appID === undefined ? "" : selectedData.appID)

    }

    function setRates(i,e){
        const arr = JSON.parse(i.rates);
        const keys = Object.keys(arr);
        const values = Object.values(arr);
        const combinedArray = keys.map((value, index) => ({
            Currency: value,
            Value: values[index] || null,
          }));
    
        return (combinedArray)
      }

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
                    <div className='field'>
                        <label>Radio {onradio}</label>
                        <SUI.Radio
                            label="Option 1"
                            name="myRadioGroup"
                            value="option1"
                            checked={onradio === 'option1'}
                            onChange={radioChange}
                        />
                        <SUI.Radio
                            label="Option 2"
                            name="myRadioGroup"
                            value="option2"
                            checked={onradio === 'option2'}
                            onChange={radioChange}
                        />
                        <CurrencyInput
                        placeholder="Please enter a number"
                        defaultValue={1000}
                        decimalsLimit={2}
                        onValueChange={(e) => console.log('Value:', e)}
                        />
                    </div>
                <div className='three fields unstackable'>
                    <div className='field'>
                        <label>FX Date</label>
                        <SUI.Dropdown
                                    placeholder="Select application"
                                    scrolling
                                    clearable
                                    fluid
                                    selection
                                    search={true}
                                    multiple={false}
                                    header="Select application"
                                    onChange={(event, { value }) => { setcfxUSDDate(value); }}
                                    value={fxUSDDate}

                                />
                                <p>{JSON.stringify(data[1])}</p>
                    </div>
                    <div className='field'>
                        <label>Currency to FX(USD)</label>
                        <input type='number' className='violetCenter' placeholder="Select currency" value={currency} onChange={(e) => setCurrency(e.currentTarget.value)} />
                    </div>
                    <div className='field'>
                        <label>FX (USD)</label>
                        <div className="ui left labeled left icon input">
                            <i className="dollar icon violet"></i>
                            <input type="number" className='violetCenter' placeholder={currency+" to USD value"} value={fxUSD} onChange={(e) => Func.toCurrency(e.currentTarget.value,setfxUSD,xdecimal)}  />
                        </div>
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
                            <input type="text" className='violetCenter' placeholder="0-100" value={customPercent} onChange={(e) => Func.toHundred(e.currentTarget.value,setcustomPercent)}  />
                        </div>
                    </div>
                    <div className='field'>
                        <label>Extra Percent</label>
                        <div className="ui left labeled right icon input">
                            <i className="percent icon violet"></i>
                            <input type="text" className='violetCenter' placeholder="0-100" value={extraPercent} onChange={(e) => Func.toHundred(e.currentTarget.value,setextraPercent)}  />
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
                <th>CURRENCY</th>
                <th>WIN/LOSS</th>
                <th>BONUS</th>
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
                <td>{Func.lastSunday(i)} - {Func.toWordDate(i)}</td>
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
                            Cut# {customPercent}%
                        </div>
                    </div>
                    </h5>
                </td>
                <td> {currency} </td>
                <td>{i.WINNINGTOTAL}</td>
                <td>{i.BONUSTOTAL}</td>
                <td>{fxUSD}</td>
                <td>{( i.BONUSTOTAL * Func.turnPercent(agencyPercent) ).toFixed(xdecimal)}</td>
                <td>{Func.toUSD((i.WINNINGTOTAL + i.BONUSTOTAL) * fxUSD * Func.turnPercent(customPercent))}</td>
                <td>{Func.toUSD((i.WINNINGTOTAL + i.BONUSTOTAL) * fxUSD)}</td>
                <td>{Func.toUSD((i.BONUSTOTAL * fxUSD)  * ( Func.turnPercent(extraPercent) == 0 || Func.turnPercent(extraPercent) == "" ? 1 : Func.turnPercent(extraPercent)))}</td>
                </tr>
            ))}
            </tbody>
        </table>
        
      </div>
          </>
    );
  };
  