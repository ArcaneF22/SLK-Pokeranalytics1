import { FetchUsers } from '../utilities/fetch/tables/users'

export const UsersPage = () => {

    return (
      <div className="expand-centered">
        <h2 className="ui header">
            <i className="users big icon text-purple"></i>
            <div className="content text-purple">
               Users Page
                <div className="sub header text-purpled">Manage your preferences</div>
            </div>
        </h2>

        <FetchUsers />

      </div>
    );
  };
  