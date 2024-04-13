import { FetchHistory } from '../utilities/fetch/history'

export const HistoryPage = () => {

    return (
      <div className="expand-centered">
        <h2 className="ui header">
            <i className="history big icon text-purple"></i>
            <div className="content text-purple">
            History Page
                <div className="sub header text-purpled">Manage your preferences</div>
            </div>
        </h2>
        <FetchHistory />
      </div>
    );
  };
  