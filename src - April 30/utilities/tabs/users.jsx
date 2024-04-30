import React, { useLayoutEffect, useState } from 'react';
import * as SUI from 'semantic-ui-react';

import { FetchUsers } from '../fetch/tables/users'
import { MultipleUsers } from '../upsert_multiple/users'
import { UpsertUsers } from '../upsert/users'

export const TabUsers = () => {

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
                        <FetchUsers selectData={selectData} />
                    )}
            </SUI.TabPane>,
        },
        {
          menuItem: 'Insert',
          render: () => 
            <SUI.TabPane attached={false}>
                <UpsertUsers selectedData={gotData} recallData={recallData} />
            </SUI.TabPane>,
        },
        {
          menuItem: 'Upload',
          render: () => 
            <SUI.TabPane attached={false}>
                <MultipleUsers />
            </SUI.TabPane>,
        },
      ]

    return (
        <div>
            <SUI.Tab menu={{ text: true }} panes={panes} />
        </div>
      );
}
