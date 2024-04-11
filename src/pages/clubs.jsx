import { useLayoutEffect, useState } from 'react';
import { FetchClubs } from '../utilities/fetch/clubs'
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
        <h1>Clubs Page</h1>
        <p>itemsJSON: {JSON.stringify(gotClub)}</p>

        <UpsertClubs selectedClub={gotClub} />
        <FetchClubs selectClub={selectClub} />

      </div>
    );
  };
  