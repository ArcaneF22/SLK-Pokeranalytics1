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
        <h2 className="ui header">
            <i className="cogs big icon text-purple"></i>
            <div className="content text-purple">
               Applications Page
                <div className="sub header text-purpled">Manage your preferences</div>
            </div>
        </h2>
        
        <UpsertApplications selectedApplication={gotApplication} />
        <FetchApplications selectApplication={selectApplication} />
        
      </div>
    );
  };
  