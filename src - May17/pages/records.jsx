import { useLayoutEffect, useState } from 'react';
import { TabRecords } from '../utilities/tabs/records'
//import { FetchRecords } from '../utilities/fetch/tables/records'

export const RecordsPage = () => {

    return (
    <>
      <div className='ui segment message purple-box div-animated'>
        <h2 className="ui header inverted">
              <i className="layer group big icon"></i>
              <div className="content">
                  Records Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
        
      <TabRecords />



    </>

    );
  };
  