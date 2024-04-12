import { FetchAccounts } from '../utilities/fetch/accounts'

export const AccountsPage = () => {

    return (
      <div className="expand-centered">
        <h2 className="ui header">
            <i className="user secret big icon text-purple"></i>
            <div className="content text-purple">
               Accounts Page
                <div className="sub header text-purpled">Manage your preferences</div>
            </div>
        </h2>
        <FetchAccounts />
      </div>
    );
  };
  