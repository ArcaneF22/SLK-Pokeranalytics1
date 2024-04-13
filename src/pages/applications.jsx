import { useEffect, useLayoutEffect, useState } from 'react';
import { FetchApplications } from '../utilities/fetch/tables/applications'
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
  const [recall, setRecall] = useState(0);

  const selectApplication = (newValue) => {
    setgotApplication(newValue)
  };

  const recallApplication = (re) => {
    setRecall(re)
  };

  useLayoutEffect(() => {
    if(recall==1){
      setRecall(0)
    }
  }, [recall]);

    return (
      <div className="expand-centered">
        <h2 className="ui header">
            <i className="cogs big icon text-purple"></i>
            <div className="content text-purple">
               Applications Page
                <div className="sub header text-purpled">Manage your preferences</div>
            </div>
        </h2>
        <UpsertApplications selectedApplication={gotApplication} recallApplication={recallApplication} />
        {recall === 1 ? (
            <div className="ui segment basic">
              <div className="ui active inverted dimmer">
                <div className="ui indeterminate text loader">Loading table...</div>
              </div>
            </div>
          ) : (
            <FetchApplications selectApplication={selectApplication} />
        )}

        
        
      </div>
    );
  };
  
