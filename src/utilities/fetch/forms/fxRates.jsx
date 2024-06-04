import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { ExchangeRates } from '../raw/exchangerates'
import { Accounts } from '../raw/accounts'
import { CurrencyList } from '../../json/currencies'


import * as SUI from 'semantic-ui-react'
import * as Alert from "../../alerts/alerts"
import * as Set from '../../constants';
import * as Func from '../../functions';
import * as Calc from '../../calculations'

export const FormFxRates = ({FXSettings, backFXSettings}) => {

    const fxDDrop                                   = ExchangeRates("ALL")
    const fxDDropDates                              = ExchangeRates("DATE")
    const fxDDropProvider                           = ExchangeRates("PROVIDER")

    const [AlertMessage, setAlertMessage]           = useState([{Alert:"", Title:"", Message:"",}]);

    const [fxUSD, setfxUSD]                         = useState(1);
    const [fxsubUSD, setfxsubUSD]                   = useState("USD:1");
    const [fxDate, setfxDate]                       = useState("");
    const [fxsubDate, setfxsubDate]                 = useState("");
    const [fxCurrency, setfxCurrency]               = useState("USD");
    const [fxProvider, setfxProvider]               = useState(0);

    const [decimals, setDecimals]                   = useState(0);
    const [percentA, setpercentA]                   = useState(0);
    const [percentB, setpercentB]                   = useState(0);

    const [fxRates, setfxRates]                     = useState(0);

    const [applySettings, setapplySettings]         = useState(false);
    const [typeOfFX, settypeOfFX]                   = useState("");
    const [typeOfUpline, settypeOfUpline]           = useState("Auto");


    const fxProviderDD = fxDDropProvider.data.map(i => {
        return {
            key: i.id,
            text: i.provider,
            value: i.provider,
        };
        })

    const fxCurrenciesDD = Object.keys(CurrencyList).map(i => {
        return {
            key: i,
            text: i,
            value: i,
        };
        })

      const fxDatesDD = fxDDrop.data.map(i => {
        return {
            key: i.id,
            text: Func.toWordDate(i.datestamp),
            value: i.datestamp +" ("+ i.provider+")",
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
                value: i.Currency+":"+i.Value,
                currency: i.Currency,
                fxusd:  i.Value,
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

        const typeOfFXs = [
            {key: "A", value: "A", text: "System list",
            content: (
                <div className="ui list mini">
                    <div className="item">
                        <div className="ui header violet">System list</div>
                        <div className="description">Assign by the system foreign currency values</div>
                    </div>
                </div>
            ),
            },
            {key: "B", value: "B", text: "Another site",
            content: (
                <div className="ui list mini">
                    <div className="item">
                        <div className="ui header violet">Another site</div>
                        <div className="description">Retreive from another site (manually)</div>
                    </div>
                </div>
            ),
             },
            {key: "C", value: "C", text: "Report close date",
            content: (
                <div className="ui list mini">
                    <div className="item">
                        <div className="ui header violet">Report close date</div>
                        <div className="description">Foreign currency from </div>
                    </div>
                </div>
            ),
             },
            ]

        const typeOfUplines = [
            {key: "A", value: "Auto", text: "Assign automatically" },
            {key: "B", value: "Manual", text: "Assign manually" },
            ]

        const onsettingTypeFX = (event, data) => {
            settypeOfFX(data.value);
        };

        const onsettingTypeUplines = (event, data) => {
            settypeOfUpline(data.value);
        };

        const onFXA_Dates = (Val) => {
            setfxDate(Val);
            const i = fxDatesDD.find(option => option.value === Val);
            if(i){
                console.log(i.ratedate)
                setfxsubDate(i.ratedate);
                setfxProvider(i.provider);
                setfxRates(JSON.parse([i.rates]));
                setfxUSD(1)
                setfxCurrency("USD")
                setfxsubUSD("USD:1")
            }
        };

        const onFXA_Rates = (Val) => {
            setfxsubUSD(Val);
            const i = fxRatesDD.find(option => option.value === Val);
            if(i){
                setfxUSD(i.fxusd)
                setfxCurrency(i.currency)
            }
        };

        const onFXC_Provider = (Val) => {
            setfxProvider(Val);
        };

        const onFXC_Currency = (Val) => {
            setfxCurrency(Val);
        };

        //ON CHANGE OF INPUT 
        const inputChange = (i,e) => {
            e(i)
            if(e == setfxsubDate){
                setfxDate(Func.dateYMDSlash(i))

            }
        }

        useEffect(() => {
            if(backFXSettings){
                settypeOfUpline(backFXSettings.upline ? backFXSettings.upline : "Auto")
                settypeOfFX(backFXSettings.rates ? backFXSettings.rates : "A")
                setfxUSD(backFXSettings.usd)
                setfxDate(backFXSettings.date)
                setfxCurrency(backFXSettings.currency)
                setfxProvider(backFXSettings.provider)
                setpercentA(backFXSettings.percentA ? backFXSettings.percentA : 0 )
                setpercentB(backFXSettings.percentB ? backFXSettings.percentB : 0 )
                setDecimals(backFXSettings.decimals ? backFXSettings.decimals : 2 )
                setfxsubDate(backFXSettings.subDate)
                setfxRates(backFXSettings.fxRates ? backFXSettings.fxRates : [])
                onFXA_Dates(backFXSettings.date)
                onFXA_Rates(backFXSettings.subUSD)
            }
        }, []);


    useEffect(() => {
        if(typeOfFX == "A" || typeOfFX == "B"){
            if(fxUSD == "" || fxUSD == 0 || fxDate == "" || fxCurrency  == ""){
                setapplySettings("loading disabled")
            } else {
                setapplySettings("")
            }
        } else if(typeOfFX == "C"){
            if(fxProvider == "" || fxCurrency  == ""){
                setapplySettings("loading disabled")
            } else {
                setapplySettings("")
            }
        } else if(typeOfFX == "D"){

        }

        if(typeOfFX == "A" && fxDate == ""){
            setfxDate("")
            setfxProvider("")
        }

    }, [fxUSD,fxDate,fxCurrency,typeOfUpline]);


    const applyFXSettings = () => {
        FXSettings({
            upline:     typeOfUpline,
            rates:      typeOfFX,
            date:       fxDate,
            usd:        fxUSD,
            currency:   fxCurrency,
            provider:   fxProvider,
            subDate:    fxsubDate,
            subUSD:     fxsubUSD,
            percentA:   percentA,
            percentB:   percentB,
            decimals:   decimals,
            fxRates:    fxRates,
        })

        setapplySettings("disabled")
        const T = setTimeout(() => {
            setapplySettings("")
        }, 2500);
        return () => clearTimeout(T);
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

      <div className="ui segment basic left aligned">
        <div className='ui form message tiny attached fitted violet' style={{paddingBottom:"30px",paddingTop:"30px"}}>
            <h4 className="ui left floated header">
            Exchange rates:
            </h4>
            <h4 className="ui right floated header">
                    <SUI.Dropdown       placeholder="Select exchange rate"
                                        pointing='right'
                                        header="Select exchange rate"
                                        onChange={onsettingTypeFX}
                                        value={typeOfFX}
                                        options={typeOfFXs}
                                    />          
            </h4>

            <div className="ui clearing divider"></div>

            <div className='five field violetText'>
                {typeOfFX == "A" ? 
                <div className='two fields stackable'>

                    <div className='field'>
                        <label>{Func.onIncLabel(fxDate)} FX Date {fxProvider ? ("("+fxProvider+")") : null}</label>
                        <SUI.Dropdown
                                placeholder="Select date"
                                clearable
                                fluid
                                selection
                                search={true}
                                multiple={false}
                                header="Select date"
                                onChange={(event, { value }) => { onFXA_Dates(value); }}
                                value={fxDate}
                                options={fxDatesDD}
                            />
                    </div>

                    <div className='field'>
                        <label>{Func.onIncLabel(fxUSD)} Currency to FX(USD)</label>
                        <SUI.Dropdown
                                placeholder="Find a currency"
                                fluid
                                selection
                                loading={fxDate ? false : true}
                                disabled={fxDate ? false : true}
                                search={true}
                                multiple={false}
                                value={fxsubUSD}
                                header="Find a currency"
                                onChange={(event, { value }) => { onFXA_Rates(value); }}
                                noResultsMessage='Please select a date'
                                options={fxRates ? fxRatesDD : []}
                            />
                    </div>

                </div>
                :
                typeOfFX == "B" ? 
                <div className='four fields'>

                    <div className='field'>
                        <label>{Func.onIncLabel(fxDate)} Date</label>
                        <input type='date' value={Func.dateforInput(fxDate)} onChange={(e) => inputChange(e.target.value,setfxDate)} />
                    </div>

                    <div className='field'>
                        <label>{Func.onIncLabel(fxCurrency)} Currency to FX(USD)</label>
                        <SUI.Dropdown
                                placeholder="Find a currency"
                                fluid
                                selection
                                search={true}
                                multiple={false}
                                value={fxCurrency}
                                header="Find a currency"
                                onChange={(event, { value }) => { onFXC_Currency(value); }}
                                noResultsMessage='Please select a provider'
                                options={fxCurrenciesDD}
                            />
                    </div>

                    <div className='field'>
                        <label>{Func.onIncLabel(fxUSD)} USD Value</label>
                        <div className="ui left labeled left icon input">
                            <i className="dollar icon violet"></i>
                            <input type="text" className='violetCenter' value={fxUSD} onChange={(e) => inputChange(Func.byDecimals(e.target.value),setfxUSD)}  />
                        </div>
                    </div>

                    <div className='field'>
                        <label>{Func.onIncLabel(fxProvider)} Provider</label>
                        <input type='text' value={fxProvider} onChange={(e) => inputChange(Func.byWebAddress(e.target.value),setfxProvider)} />
                    </div>

                </div>
                :
                typeOfFX == "C" ? 

                <div className='two fields'>

                    <div className='field'>
                        <label>{Func.onIncLabel(fxProvider)} Provider</label>
                        <SUI.Dropdown
                                placeholder="Select provider"
                                fluid
                                selection
                                multiple={false}
                                header="Select provider"
                                onChange={(event, { value }) => { onFXC_Provider(value); }}
                                value={fxProvider}
                                options={fxProviderDD}
                            />
                    </div>

                    <div className='field'>
                        <label>{Func.onIncLabel(fxCurrency)} Currency to FX(USD)</label>
                        <SUI.Dropdown
                                placeholder="Find a currency"
                                fluid
                                selection
                                loading={fxProvider ? false : true}
                                disabled={fxProvider ? false : true}
                                search={true}
                                multiple={false}
                                value={fxCurrency}
                                header="Find a currency"
                                onChange={(event, { value }) => { onFXC_Currency(value); }}
                                noResultsMessage='Please select a provider'
                                options={fxCurrenciesDD}
                            />
                    </div>

                </div>
                :
                null
                }

            <div className="ui hidden divider"></div>

            <h4 className="ui left floated header">
            Uplines percentage:
            </h4>
            <h4 className="ui right floated header">
                <SUI.Dropdown       placeholder="Select upline settings"
                                    pointing='right'
                                    header="Select upline settings"
                                    onChange={onsettingTypeUplines}
                                    value={typeOfUpline}
                                    options={typeOfUplines}
                                />
            </h4>

            <div className="ui clearing divider"></div>
            <div className="ui hidden divider"></div>
            <h4 className="ui left floated header">Other settings</h4>
            <div className="ui clearing divider"></div>

                <div className='three fields unstackable'>
                    <div className='field'>
                        <label>{Func.onIncLabel(percentA)} Percent (Agency Bonus)</label>
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

                <div className='ui segment basic center aligned '>
                    <div className={'ui button violet small '+applySettings} onClick={applyFXSettings}>
                        {applySettings == "disabled" ? "Settings Applied!" : "Apply Settings"}
                    </div>
                </div>

            </div>
        </div>
      </div>
          </>
    );
  };
  