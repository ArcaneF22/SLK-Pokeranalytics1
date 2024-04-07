import { FetchUsers } from '../utilities/fetch/users'

export const UsersPage = () => {

    return (
      <div className="expand-centered">
        <h1 className='purple'>UsersPage</h1>

        <FetchUsers />

      </div>
    );
  };
  