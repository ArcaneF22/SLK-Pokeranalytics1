import { useState } from 'react';
import { ExchangeRates } from '../raw/exchangerates'
import * as Set from '../../constants'
import * as SUI from 'semantic-ui-react'

export const FetchExchangeRates = () => {

  const [clicked, setClicked] = useState(0)
  const data = ExchangeRates().data
  const load = ExchangeRates().load


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


  function setStatus(i) {
    if (i.status == "Active") {
      return  <button className='ui button green basic'>
                  <i className="check circle outline icon"></i>
                  Active
              </button>;
    } else if (i.status == "Pending") {
      return  <button className='ui button yellow basic'>
                  <i className="spinner icon"></i>
                  Pending
              </button>;
    } else {
      return  <button className='ui button red basic'>
                  <i className="times circle outline icon"></i>
                  Inactive
              </button>;
    }
  }

  
  const editData = (id,provider,datestamp,rates,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "id": id, 
                    "provider": provider, 
                    "datestamp": datestamp, 
                    "rates": rates, 
                    "status": status
                  }
    //selectAccount(array);
    console.log(array)
  };


  return (
<>

{load ? (
      <Set.LoadingData />
      ) : (
      <div className="ui segment basic">
        <h3 className="ui horizontal divider header">
          Exchange Rates
        </h3>
        <br />
        <table className='ui celled striped table small compact'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Provider</th>
            <th>Date</th>
            <th>Rates (USD)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>{i.provider}</td>
              <td>{i.datestamp}</td>
              <td>
                <SUI.Dropdown
                        placeholder="Find a currency"
                        scrolling
                        clearable
                        fluid
                        selection
                        search={true}
                        multiple={false}
                        header="Find a currency"
                        options={setRates(i).map(i => {
                        return {
                            key: i.Currency,
                            text: i.Currency+": $"+i.Value,
                            value: i.Value,
                        };
                        })}
                    />

              </td>
              <td>{setStatus(i)}</td>
              <td>
                <button className='ui icon button violet' onClick={()=> editData(i.id,i.provider,i.datestamp,i.rates,i.status)}>
                    <i className="edit outline icon"></i>
                    Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}

</>

  );
}
