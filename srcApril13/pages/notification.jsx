
import { useLayoutEffect, useState } from 'react';
import { FetchNotification } from '../utilities/fetch/notification'
import { ChildComponent1 } from './child1';
import { ChildComponent2 } from './child2';


export const NotificationPage = () => {

  const [vals, setVals] = useState('Orig');

  const updateValue = (newValue) => {
    setVals(JSON.stringify(newValue))
  };

    return (
      <div className="expand-centered">
        <h1>Notification Pages</h1>
        
      <FetchNotification />
      
      <ChildComponent1 updateValue={updateValue} />
      <ChildComponent2 constantValue={vals} />
      <p>Parent: {vals}</p>
      </div>
    );
  };
  