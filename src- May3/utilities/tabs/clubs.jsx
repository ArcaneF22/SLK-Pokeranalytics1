import React, { useLayoutEffect, useState } from 'react';
import * as SUI from 'semantic-ui-react';

import { FetchClubs } from '../fetch/tables/clubs'
import { MultipleClubs } from '../upsert_multiple/clubs'
import { UpsertClubs } from '../upsert/clubs'

export const TabClubs = () => {

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
                        <SUI.Segment>
                            <SUI.Dimmer active>
                                <SUI.Loader indeterminate>
                                    Preparing Table
                                </SUI.Loader>
                            </SUI.Dimmer>
                        </SUI.Segment>
                    ) : (
                        <FetchClubs selectData={selectData} />
                    )}
            </SUI.TabPane>,
        },
        {
          menuItem: 'Insert',
          render: () => 
            <SUI.TabPane attached={false}>
                <UpsertClubs selectedData={gotData} recallData={recallData} />
            </SUI.TabPane>,
        },
        {
          menuItem: 'Upload',
          render: () => 
            <SUI.TabPane attached={false}>
                <MultipleClubs />
            </SUI.TabPane>,
        },
      ]

    return (
        <div>
            <SUI.Tab menu={{ text: true }} panes={panes} />
        </div>
      );
}
