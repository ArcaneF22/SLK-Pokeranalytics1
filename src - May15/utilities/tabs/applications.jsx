import React, { useLayoutEffect, useState } from 'react';
import * as SUI from 'semantic-ui-react';
import * as Set from '../constants'

import { FetchApplications } from '../fetch/tables/applications'
import { MultipleApplications } from '../upsert_multiple/applications'
import { UpsertApplications } from '../upsert/applications'

export const TabApplications = () => {

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
      if(gotData['proceed'] == "true"){
            gotData['proceed'] = "false"
            setActiveIndex(1)
            setgotData(gotData)
      } else {
            setgotData([])
      }
    }, [gotData['id']]);

    useLayoutEffect(() => {
      if(resetSelect == "true"){
        setgotData([])
        selectData("")
        setresetSelect("false")
        resetSelected("false")
      } 
    }, [resetSelect]);

    const panes = [
        {
          render: () => 
            <SUI.TabPane attached={false}>
                    {recall === 1 ? (
                        <Set.LoadingData/>
                    ) : (
                        <FetchApplications selectData={selectData} />
                    )}
            </SUI.TabPane>,
        },
        {
          render: () => 
            <SUI.TabPane attached={false}>
                <UpsertApplications selectedData={gotData} recallData={recallData} resetSelected={resetSelected} />
            </SUI.TabPane>,
        },
        {
          render: () => 
            <SUI.TabPane attached={false}>
                <MultipleApplications />
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
