import { FetchAccounts } from '../utilities/fetch/tables/accounts'

export const AccountsPage = () => {

    return (
    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="user secret big icon"></i>
              <div className="content">
              Accounts Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>

        <FetchAccounts />
    </>
      

    );
  };
  