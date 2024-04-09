import { FetchApplications } from '../utilities/fetch/applications'
import { UpsertApplications } from '../utilities/upsert/applications'

export const ApplicationsPage = () => {

    return (
      <div className="expand-centered">
        <h1>ApplicationsPage</h1>
        <UpsertApplications />
        <FetchApplications />
      </div>
    );
  };
  