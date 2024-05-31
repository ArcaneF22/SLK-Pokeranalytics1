import React, { useLayoutEffect, useState } from 'react';
import * as SUI from 'semantic-ui-react';
import * as Set from '../constants'


import { UpsertRecords } from '../upsert/records'
import { FetchRecords } from '../fetch/tables/records'
import { MultipleRecords } from '../upsert_multiple/records'
import { json } from 'react-router-dom';

export const TabRecords = () => {

    const [gotData, setgotData]             = useState([]);
    const [returnedJSON, setreturnedJSON]   = useState([]);
    const [ireRenders, setireRenders]       = useState(true);
    const [recall, setRecall]               = useState(0);
    const [activeIndex, setActiveIndex]     = useState(0);
    const [iShow, setiShow]                 = useState(true);

    const updateJSON = (i) => {
        setreturnedJSON(i)
      };

    const reRenders = (i) => {
        setiShow(i)
        console.log("Received: "+i)
    };

    useLayoutEffect(() => {
        if(iShow == false){
            setiShow(true)
            console.log("Received: "+iShow)
        }
    }, [iShow]);

        
    function Alas(){
        if(iShow == true){
                return <MultipleRecords updateJSON={updateJSON} returnJSON={returnedJSON} reRenders={reRenders}/>
        } else {
                return  "Loading"+String(iShow)
        }
    }
    const panes = [
        {
            render: () => 
                <SUI.TabPane attached={false}>
                        {recall === 1 ? (
                            <Set.LoadingData/>
                        ) : (
                            <FetchRecords  />
                        )}
                </SUI.TabPane>,
        },
        {
            render: () => 
                <SUI.TabPane attached={false}>
                    {Alas()}
                </SUI.TabPane>,
        },
        {
            render: () => 
                <SUI.TabPane attached={false}>
                    <UpsertRecords selectedData={gotData} />
                </SUI.TabPane>,
          },
      ]

    return (
        <>
            <div className="ui three item menu">
                <a className={activeIndex == "0" ? "item active violet" : "item" } id='0' onClick={ ()=>setActiveIndex(0) }>
                <i className="tasks icon"></i>
                    LIST {String(iShow)}
                </a>
                <a className={activeIndex == "1" ? "item active violet" : "item" } id='1'onClick={ ()=>setActiveIndex(1) }>
                    <i className="file excel outline icon"></i>
                    UPLOAD
                </a>
                <a className={activeIndex == "2" ? "item active violet" : "item" } id='1'onClick={ ()=>setActiveIndex(2) }>
                    <i className="calculator icon"></i>
                    COMPUTATION
                </a>
            </div>

            <SUI.Tab menu={{ text: true }} activeIndex={activeIndex} panes={panes} style={{marginTop:"-55px"}} />

        </>
      );
}
