import React, { useLayoutEffect, useState, setState } from 'react';
import * as SUI from 'semantic-ui-react';

import { FetchAccounts } from '../fetch/tables/accounts'
import { MultipleAccounts } from '../upsert_multiple/accounts'
import { UpsertAccounts } from '../upsert/accounts'

export const TabAccounts = () => {

    const [gotData, setgotData] = useState([]);
    const [recall, setRecall] = useState(0);
    const [selected, setSelected] = useState(0);

    const selectData = (newValue) => {
      setgotData(newValue)
      setSelected(newValue.selected)
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
  
    useLayoutEffect(() => {
      if(selected===true){
        setSelected(false)

      }
    }, [selected]);



    const panes = [
        {
          menuItem: 'List'+selected,
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
                        <FetchAccounts selectData={selectData} />
                    )}
            </SUI.TabPane>,
        },
        {
          menuItem: 'Insert',
          render: () => 
            <SUI.TabPane attached={false}>
                <UpsertAccounts selectedData={gotData} recallData={recallData} />
            </SUI.TabPane>,
        },
        {
          menuItem: 'Upload',
          render: () => 
            <SUI.TabPane attached={false} >
                <MultipleAccounts />
            </SUI.TabPane>,
        },
      ]



    return (
        <div>
            <SUI.Tab menu={{ text: true }} panes={panes} activeIndex={selected} />
        </div>
      );
}
