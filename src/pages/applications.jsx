import { useLayoutEffect, useState } from 'react';
import { FetchApplications } from '../utilities/fetch/applications'
import { UpsertApplications } from '../utilities/upsert/applications'

export const ApplicationsPage = () => {

  const arrayApp = {
                    "id": 0, 
                    "name": "", 
                    "image": "", 
                    "company": "", 
                    "details": "", 
                    "status": 0,
                  }

  const [gotApplication, setgotApplication] = useState(arrayApp);

  const selectApplication = (newValue) => {
    setgotApplication(newValue)
  };


    return (
      <div className="expand-centered">
        <h1>Applications Page</h1>
        <p>itemsJSON: {JSON.stringify(gotApplication)}</p>

        <UpsertApplications selectedApplication={gotApplication} />
        <FetchApplications selectApplication={selectApplication} />
        
      </div>
    );
  };
  