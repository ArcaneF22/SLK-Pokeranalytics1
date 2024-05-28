import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import useInterval from 'use-interval'
import * as Set from '../constants';



export const UpsertExchangeRates = () => {
    const Token = JSON.parse( localStorage.getItem('Token') );
    const nowDate                         = new Date();
    const url1                            = "v6.exchangerate-api.com"
    const url2                            = "api.freecurrencyapi.com"
    const url3                            = "api.exchangeratesapi.net"

    function formatDate(i){
        const e = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric'});
        if(i == 0 || i == ""){
            return e.format(nowDate);
        } else {
            const u = new Date(i);
            return e.format(u);
        }
    }

    const checkFXUSD = async () => {
        try {

          const checking = await axios.post(Set.Upsert['exchangerate'], {
                                                                            A: Token['id'],
                                                                            B: Token['token'],
                                                                            C: Token['gadget'],
                                                                            D: Set.TimeZoned,
                                                                            ON: "check",
                                                                            datestamp: formatDate(0),
                                                                        });
          if(checking.data == 0){
            fetchAPI()
          } else {
              console.log(checking.data + " already inserted FX(USD)")
          }
        } catch (error) {
          console.error("Error checking FX(USD): ", error);
        }
    }


    const fetchAPI = async () => {
        try {
        
          const response1     = await axios.get(Set.URL['fxusd1']);
          const response2     = await axios.get(Set.URL['fxusd2']);
          const response3     = await axios.get(Set.URL['fxusd3']);

          var now1 = formatDate(JSON.stringify(response1.data.time_last_update_utc));
          var now2 = formatDate(0);

        const upsert1 = await axios.post(Set.Upsert['exchangerate'], {
                                                                          A: Token['id'],
                                                                          B: Token['token'],
                                                                          C: Token['gadget'],
                                                                          D: Set.TimeZoned,
                                                                          ON: "get",
                                                                          id:             0,
                                                                          provider:       url1,
                                                                          datestamp:      now1,
                                                                          rates:          response1.data.conversion_rates,
                                                                          status:         0,
                                                                      });
        const upsert2 = await axios.post(Set.Upsert['exchangerate'], {
                                                                          A: Token['id'],
                                                                          B: Token['token'],
                                                                          C: Token['gadget'],
                                                                          D: Set.TimeZoned,
                                                                          ON: "get",
                                                                          id:             0,
                                                                          provider:       url2,
                                                                          datestamp:      now2,
                                                                          rates:          response2.data.data,
                                                                          status:         0,
                                                                      });
        const upsert3 = await axios.post(Set.Upsert['exchangerate'], {
                                                                          A: Token['id'],
                                                                          B: Token['token'],
                                                                          C: Token['gadget'],
                                                                          D: Set.TimeZoned,
                                                                          ON: "get",
                                                                          id:             0,
                                                                          provider:       url3,
                                                                          datestamp:      now2,
                                                                          rates:          response3.data.rates,
                                                                          status:         0,
                                                                      });

        console.log("Currency upsert 1: "+ upsert1.data)
        console.log("Currency upsert 2: "+ upsert2.data)
        console.log("Currency upsert 3: "+ upsert3.data)
        console.info(formatDate(0))

        } catch (error) {
          console.error("Error fetching data: ", error);
        }
  }

  useLayoutEffect(() => {
      checkFXUSD()
  }, []);

  useInterval(() => {
      checkFXUSD()
  }, 2000000);


  return (
    <>
      <div className="ui segment basic left aligned">
        <h3 className="ui horizontal divider header">
          Insert / Update Exchange Rates
        </h3>
        <br />

        <div className="ui form fitted">

          <div className='two fields'>

              <div className="field">
                  <label>Application</label>
                  <input type="text" value={fxID} onChange={(e) => setfxID(e.currentTarget.value)}/>
              </div>

          </div>

        </div>

      </div>
    </>
  )

}
