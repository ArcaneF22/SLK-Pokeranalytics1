import { FetchUsers } from '../utilities/fetch/tables/users'

export const UsersPage = () => {

    return (
      <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="users big icon"></i>
              <div className="content">
                  Users Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
      <FetchUsers />
      </>

    );
  };
  