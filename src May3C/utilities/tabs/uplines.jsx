import React, { useLayoutEffect, useState } from 'react';
import * as SUI from 'semantic-ui-react';

import { FetchUplines } from '../fetch/tables/uplines'
import { MultipleUplines } from '../upsert_multiple/uplines'
import { UpsertUplines } from '../upsert/uplines'

export const TabUplines = () => {

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
                            <SUI.Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        </SUI.Segment>
                    ) : (
                        <FetchUplines selectData={selectData} />
                    )}
            </SUI.TabPane>,
        },
        {
          menuItem: 'Insert',
          render: () => 
            <SUI.TabPane attached={false}>
                <UpsertUplines selectedData={gotData} recallData={recallData} />
            </SUI.TabPane>,
        },
        {
          menuItem: 'Upload',
          render: () => 
            <SUI.TabPane attached={false}>
                <MultipleUplines />
            </SUI.TabPane>,
        },
      ]

    return (
        <div>
            <SUI.Tab menu={{ text: true }} panes={panes} />
        </div>
      );
}