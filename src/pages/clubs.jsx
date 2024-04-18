import { useLayoutEffect, useState } from 'react';
import { FetchClubs } from '../utilities/fetch/tables/clubs'
import { UpsertClubs } from '../utilities/upsert/clubs'

export const ClubsPage = () => {

  const arrayClub = {
    "id": 0, 
    "idd":"",
    "name": "",
    "image":"", 
    "app":"",
    "details": "", 
    "type": "", 
    "union": "", 
    "status": 0,
  }

  const [gotClub, setgotClub] = useState(arrayClub);

  const selectClub = (newValue) => {
    setgotClub(newValue)
  };

    return (
    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="layer group big icon"></i>
              <div className="content">
                  Clubs Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
        <UpsertClubs selectedClub={gotClub} />
        <FetchClubs selectClub={selectClub} />
    </>

    );
  };
  