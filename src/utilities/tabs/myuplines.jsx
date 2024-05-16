import React, { useLayoutEffect, useState } from 'react';
import * as SUI from 'semantic-ui-react';
import * as Set from '../constants';

import { FetchMyUplines } from '../fetch/tables/myuplines'
import { UpsertMyUplines } from '../upsert/myuplines'

export const TabMyUplines = () => {

    const [gotData, setgotData] = useState([]);
    const [recall, setRecall] = useState(0);
    const [resetSelect, setresetSelect] = useState("false");
    const [activeIndex, setActiveIndex] = useState(0);
    
    const selectData = (newValue) => {
      setgotData(newValue)
    };
  
    const recallData = (re) => {
      setRecall(re)
    };
    
    const resetSelected = (se) => {
        setresetSelect(se)
    };

    useLayoutEffect(() => {
      if(recall==1){
        setRecall(0)
      }
    }, [recall]);

    useLayoutEffect(() => {
      if(resetSelect == "true"){
        setgotData([])
        selectData("")
        setresetSelect("false")
        resetSelected("false")
      } 
    }, [resetSelect]);

    useLayoutEffect(() => {
      if(gotData['proceed'] == "true"){
            gotData['proceed'] = "false"
            setActiveIndex(1)
            setgotData(gotData)
      } else {
            setgotData([])
      }
    }, [gotData['id']]);

    const panes = [
        {
          render: () => 
            <SUI.TabPane attached={false}>
                    {recall === 1 ? (
                        <Set.LoadingData/>
                    ) : (
                        <FetchMyUplines selectData={selectData} />
                    )}
            </SUI.TabPane>,
        },
        {
          render: () => 
            <SUI.TabPane attached={false}>
                <UpsertMyUplines selectedData={gotData} recallData={recallData} resetSelected={resetSelected} />
            </SUI.TabPane>,
        },
      ]

    return (
        <>
            <div className="ui two item menu">
                <a className={activeIndex == "0" ? "item active violet" : "item" } id='0' onClick={ ()=>setActiveIndex(0) }>
                <i className="tasks icon"></i>
                    LIST
                </a>
                <a className={activeIndex == "1" ? "item active violet" : "item" } id='1' onClick={ ()=>setActiveIndex(1) }>
                  {gotData.length === 0  ?
                      <><i className="plus icon"></i>INSERT</>
                    : <><i className="pencil alternate icon"></i>UPDATE</> }
                </a>
            </div>
            <SUI.Tab menu={{ text: true }} activeIndex={activeIndex} panes={panes} style={{marginTop:"-55px"}} />
        </>
      );
}
