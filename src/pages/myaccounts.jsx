import { FetchMyAccounts } from '../utilities/fetch/tables/myaccounts'

import {ItemsMyAccount} from '../utilities/fetch/items/myaccounts'

export const MyAccountsPage = () => {

    return (

    <>
      <div className='ui segment message purple-box div-animated'>
        <h2 className="ui header inverted">
              <i className="user secret big icon"></i>
              <div className="content">
                  My Accounts Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
      <FetchMyAccounts />

      <div className="ui two cards stackable padded noBorder">
          
          <div className="ui card fluid basic">
              <div className="content">
                  <h2 className="ui header">
                      ADD ACCOUNT
                  </h2>
                  <div className='ui message'>
a
                  </div>
              </div>
          </div>
          <div className="ui card fluid basic">
              <div className="content">
                  <h2 className="ui header">
                      MY ACCOUNTS
                  </h2>
                  <div className='ui message'>
                    <ItemsMyAccount />
                  </div>
              </div>
          </div>
      </div>
      </>
    );
  };
  