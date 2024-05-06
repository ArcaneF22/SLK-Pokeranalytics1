import React, { useLayoutEffect, useState } from 'react';
import * as SUI from 'semantic-ui-react';
import * as Set from '../constants';

import { FetchUsers } from '../fetch/tables/users'
import { MultipleUsers } from '../upsert_multiple/users'
import { UpsertUsers } from '../upsert/users'

export const TabUsers = () => {

    const [gotData, setgotData] = useState([]);
    const [recall, setRecall] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const selectData = (newValue) => {
      setgotData(newValue)
    };
    const selectImage = (newValue) => {
      setgotData(newValue)
    };
  
    const recallData = (re) => {
      setRecall(re)
    };
    
    useLayoutEffect(() => {
      if(recall==1){
        setRecall(0)
      }
    }, [recall]);
  

    const panes = [
        {
          render: () => 
            <SUI.TabPane attached={false}>
                    {recall === 1 ? (
                        <Set.LoadingData/>
                    ) : (
                        <FetchUsers selectData={selectData} />
                    )}
            </SUI.TabPane>,
        },
        {
          render: () => 
            <SUI.TabPane attached={false}>
                <UpsertUsers selectedData={gotData} recallData={recallData} />
            </SUI.TabPane>,
        },
        {
          render: () => 
            <SUI.TabPane attached={false}>
                <MultipleUsers />
            </SUI.TabPane>,
        },
      ]

    return (
        <>
            <div className="ui three item menu">
                <a className={activeIndex == "0" ? "item active violet" : "item" } id='0' onClick={ ()=>setActiveIndex(0) }>
                <i className="tasks icon"></i>
                    LIST
                </a>
                <a className={activeIndex == "1" ? "item active violet" : "item" } id='1' onClick={ ()=>setActiveIndex(1) }>
                    <i className="plus icon"></i>
                    INSERT
                </a>
                <a className={activeIndex == "2" ? "item active violet" : "item" } id='2'onClick={ ()=>setActiveIndex(2) }>
                    <i className="file excel outline icon"></i>
                    UPLOAD
                </a>
            </div>
            <SUI.Tab menu={{ text: true }} activeIndex={activeIndex} panes={panes} style={{marginTop:"-55px"}} />
        </>
      );
}
