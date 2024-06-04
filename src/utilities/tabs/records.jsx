import React, { useLayoutEffect, useState } from 'react';
import * as SUI from 'semantic-ui-react';
import * as Set from '../constants'

import { UpsertRecords } from '../upsert/records'
import { FetchRecords } from '../fetch/tables/records'
import { MultipleRecords } from '../upsert_multiple/records'

export const TabRecords = () => {

    const [returnedJSON, setreturnedJSON]   = useState([]);
    const [recall, setRecall]               = useState(0);
    const [activeIndex, setActiveIndex]     = useState(0);
    const [iShow, setiShow]                 = useState(true);
    const [calculated, setCalculated]       = useState(false);
    const [ifxChange, setifxChange]         = useState([]);

    const updateJSON = (i) => {
        setreturnedJSON(i)
      };

    const reRenders = (i) => {
        setiShow(i)
    };

    const onCalculated = (i) => {
        setCalculated(i)
        if(i == true){
            setActiveIndex(2)
        }
    };

    const fxChange = (i) => {
        setifxChange(i)
    };

    useLayoutEffect(() => {
        if(iShow == false){
            setiShow(true)
        }
    }, [iShow]);

        
    function Alas(){
        if(iShow == true){
                return <MultipleRecords updateJSON={updateJSON} 
                                        returnJSON={returnedJSON} 
                                        onCalculated={onCalculated} 
                                        reRenders={reRenders}
                                        fxChange={fxChange}
                                        returnfxChange={ifxChange}/>
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
                    <UpsertRecords selectedData={returnedJSON} />
                </SUI.TabPane>,
          },
      ]

    return (
        <>
            <div className={calculated ? "ui three item menu" : "ui two item menu"}>
                <a className={activeIndex == "0" ? "item active violet" : "item" } id='0' onClick={ ()=>setActiveIndex(0) }>
                <i className="tasks icon"></i>
                    LIST OF RECORDS
                </a>
                <a className={activeIndex == "1" ? "item active violet" : "item" } id='1'onClick={ ()=>(setActiveIndex(1),setCalculated(false)) }>
                    <i className="file excel outline icon"></i>
                    UPLOAD CSV
                </a>
                {calculated ? 
                <a className={activeIndex == "2" ? "item active violet" : "item" } id='1'onClick={ ()=>setActiveIndex(2) }>
                    <i className="calculator icon"></i>
                    COMPUTATION
                </a>
                : null }

            </div>

            <SUI.Tab menu={{ text: true }} activeIndex={activeIndex} panes={panes} style={{marginTop:"-55px"}} />

        </>
      );
}
