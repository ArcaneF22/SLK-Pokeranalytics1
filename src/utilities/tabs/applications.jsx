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


            <SUI.Tab menu={{ text: true }} activeIndex={activeIndex} panes={panes} style={{marginTop:"-55px"}} />
        </>
      );
}
