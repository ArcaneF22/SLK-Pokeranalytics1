import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { ExchangeRates } from '../raw/exchangerates'
import { Accounts } from '../raw/accounts'

import * as SUI from 'semantic-ui-react'
import * as Alert from "../../alerts/alerts"
import * as Set from '../../constants';
import * as Func from '../../functions';
import * as Calc from '../../calculations'

export const FormFxRates = ({returnFXData, backFXData}) => {

    const fxDDrop                                   = ExchangeRates()

    const [AlertMessage, setAlertMessage]           = useState([{Alert:"", Title:"", Message:"",}]);

    const [fxUSD, setfxUSD]                         = useState(0);
    const [fxDate, setfxDate]                       = useState("");
    const [fxsubDate, setfxsubDate]                       = useState("");
    const [fxCurrency, setfxCurrency]               = useState("USD");
    const [fxProvider, setfxProvider]               = useState(0);

    const [decimals, setDecimals]                   = useState(0);

    const [percentA, setpercentA]                   = useState(0);
    const [percentB, setpercentB]                   = useState(0);

    const [fxRates, setfxRates]                     = useState(0);
    const [onManual, setonManual]                   = useState(0);
    const [fxType, setfxType]                       = useState("A");

      const fxDatesDD = fxDDrop.data.map(i => {
        return {
            key: i.id,
            text: Func.toWordDate(i.datestamp),
            value: i.id,
            rates: i.rates,
            provider: i.provider,
            ratedate: i.datestamp,
            content: (
                <div className="ui list mini">
                    <div className="item">
                            <div className="header violet">{Func.toWordDate(i.datestamp)}</div>
                            <div className="description">{i.provider}</div>
                    </div>
                </div>
          ),
        };
        })
      
        const onFXDates = (event, data) => {
            setfxDate(data.value);
            const i = fxDatesDD.find(option => option.value === data.value);
            if(i){
                setfxsubDate(i.ratedate);
                setfxProvider(i.provider);
                setfxRates(JSON.parse([i.rates]));
                setfxUSD("")
                setfxCurrency("")
            }
        };


    //ON CHANGE OF INPUT 
    const inputChange = (i,e) => {
        e(i)
        if(e == setfxsubDate){
            setfxDate(i)
        }
    }

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
                content: (
                    <div className="ui list mini">
                        <div className="item">
                                <div className="header violet">{i.Currency}</div>
                                <div className="description">${i.Value}</div>
                        </div>
                    </div>
              ),
            };
        })

        const fxTypes = [
                        {key: "A", value: "A", ass: "1", text: "From system list" },
                        {key: "B", value: "B", ass: "2", text: "From another site" },
                        {key: "C", value: "C", ass: "2", text: "Set each by their dates" },
                        {key: "D", value: "D", ass: "2", text: "AA" },
                        ]
        const [showOptions, setShowOptions] = useState(fxTypes);

        useEffect(() => {
            setShowOptions(fxTypes.filter((option) => (option.value !== "D" || option.ass !== "2")));
        }, []);

        const onFXTypes = (event, data) => {
            setfxType(data.value);
        };

        const onFXRates = (event, data) => {
            setfxUSD(data.value);
            const i = fxRatesDD.find(option => option.value === data.value);
            if(i){
                setfxCurrency(i.currency)
            }
        };



    useEffect(() => {
            if(fxDate == "" || fxDate == null){
                setfxRates({});
                setfxProvider("");
                setfxUSD("1")
                setfxCurrency("USD")
            }
    }, [fxDate]);

    useEffect(() => {
            if(fxUSD == "" || fxUSD == null){
                setfxUSD("1")
                setfxCurrency("USD")
            }
    }, [fxUSD]);

    useEffect(() => {
            returnFXData({
                fxType:         fxType,
                fxDate:         fxDate,
                fxUSD:          fxUSD,
                fxCurrency:     fxCurrency,
                fxProvider:     fxProvider,
                percentA:       percentA,
                percentB:       percentB,
                decimals:       decimals,
            })
    }, [fxDate,fxUSD,fxCurrency,fxProvider,percentA,percentB,fxType]);

    useEffect(() => {
        if(backFXData[0].FXTYPE){
            setfxType(backFXData[0].FXTYPE)
            if(backFXData[0].FXTYPE == "A"){
                setfxDate       (backFXData[0].FXDATE)
                setfxUSD        (backFXData[0].FXUSD);
                setfxCurrency   (backFXData[0].FXCURRENCY)
                setfxProvider   (backFXData[0].FXPROVIDER)
                const i = fxDatesDD.find(option => option.value === backFXData[0].FXDATE);
                if(i){
                    console.log(i)
                    setfxsubDate(i.ratedate);
                    setfxProvider(i.provider);
                    setfxRates(JSON.parse([i.rates]));
                }
            }

        }
            
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

      <div className="ui segment basic left aligned">

        <div className='ui form message tiny attached fitted violet' style={{paddingBottom:"30px",paddingTop:"30px"}}>
            <h4 className="ui left floated header">
                Exchange Rates
            </h4>
            <div className="ui right floated header">
            <SUI.Dropdown       placeholder="Select exchange rate"
                                header="Select exchange rate"
                                onChange={onFXTypes}
                                value={fxType}
                                options={showOptions}
                            />
            </div>
            <div className="ui clearing divider"></div>

            <div className='five field violetText'>
                {fxType == "A" ? 
                <div className='two fields stackable'>
                    <div className='field'>
                        <label>FX Date {fxProvider ? ("("+fxProvider+")") : null}</label>
                        <SUI.Dropdown
                                placeholder="Select date"

                                clearable
                                fluid
                                selection
                                search={true}
                                multiple={false}
                                header="Select date"
                                onChange={onFXDates}
                                value={fxDate}
                                options={fxDatesDD}
                            />
                    </div>

                    <div className='field'>
                        <label>Currency to FX(USD)</label>
                        <SUI.Dropdown
                                placeholder="Find a currency"

                                clearable
                                fluid
                                selection
                                loading={fxDate ? false : true}
                                disabled={fxDate ? false : true}
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
                :
                fxType == "B" ? 
                <div className='four fields'>
                    <div className='field'>
                        <label>Date {Func.dateYMD(fxsubDate)}</label>
                        <input type='date' value={Func.dateYMD(fxsubDate)} onChange={(e) => inputChange(e.target.value,setfxsubDate)} />
                    </div>
                    <div className='field'>
                        <label>Currency</label>
                        <input type='text' value={fxCurrency} onChange={(e) => inputChange(Func.byNoSpaceCapital(e.target.value),setfxCurrency)}/>
                    </div>
                    <div className='field'>
                        <label>USD Value</label>
                        <div className="ui left labeled left icon input">
                            <i className="dollar icon violet"></i>
                            <input type="text" className='violetCenter' value={fxUSD} onChange={(e) => inputChange(Func.byDecimals(e.target.value),setfxUSD)}  />
                        </div>
                    </div>
                    <div className='field'>
                        <label>Provider</label>
                        <input type='text' value={fxProvider} onChange={(e) => inputChange(Func.byWebAddress(e.target.value),setfxProvider)} />
                    </div>
                </div>
                :
                null
                }
            <div className="ui hidden divider"></div>
            <h4 className="ui left floated header">Other settings</h4>
            <div className="ui clearing divider"></div>

                <div className='three fields unstackable'>
                    <div className='field'>
                        <label>Extra-Percent</label>
                        <div className="ui left labeled right icon input">
                            <i className="percent icon violet"></i>
                            <input type="text" className='violetCenter' placeholder="0-100" value={percentA} onChange={(e) => Func.toHundred(e.currentTarget.value,setpercentA)}  />
                        </div>
                    </div>
                    <div className='field'>
                        <label>Decimals</label>
                        <div className="ui left labeled right icon input">
                            <input type="text" className='blandCenter' placeholder="0-100" value={decimals} onChange={(e) => Func.toHundred(e.currentTarget.value,setDecimals)}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
          </>
    );
  };
  