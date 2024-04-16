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
      <div className="expand-centered">

        <h2 className="ui header">
            <i className="layer group big icon text-purple"></i>
            <div className="content text-purple">
            Clubs Page
                <div className="sub header text-purpled">Manage your preferences</div>
            </div>
        </h2>

        <UpsertClubs selectedClub={gotClub} />
        <FetchClubs selectClub={selectClub} />

      </div>
    );
  };
  