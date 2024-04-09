import { FetchUsers } from '../utilities/fetch/users'

export const UsersPage = () => {

    return (
      <div className="expand-centered">
        <h1 className='purple'>Users Page</h1>

        <FetchUsers />

      </div>
    );
  };
  