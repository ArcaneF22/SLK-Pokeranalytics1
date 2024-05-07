import React, { useLayoutEffect, useState } from 'react';
import * as SUI from 'semantic-ui-react';
import * as Set from '../constants'

import { FetchUnions } from '../fetch/tables/unions'
import { MultipleUnions } from '../upsert_multiple/unions'
import { UpsertUnions } from '../upsert/unions'

export const TabUnions = () => {

    const [gotData, setgotData] = useState([]);
    const [recall, setRecall] = useState(0);
  
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
          menuItem: 'List',
          render: () => 
            <SUI.TabPane attached={false}>
                    {recall === 1 ? (
                        <Set.LoadingData/>
                    ) : (
                        <FetchUnions selectData={selectData} />
                    )}
            </SUI.TabPane>,
        },
        {
          menuItem: 'Insert',
          render: () => 
            <SUI.TabPane attached={false}>
                <UpsertUnions selectedData={gotData} recallData={recallData} />
            </SUI.TabPane>,
        },
        {
          menuItem: 'Upload',
          render: () => 
            <SUI.TabPane attached={false}>
                <MultipleUnions />
            </SUI.TabPane>,
        },
      ]

    return (
        <div>
            <SUI.Tab menu={{ text: true }} panes={panes} />
        </div>
      );
}
