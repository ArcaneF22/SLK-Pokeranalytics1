import { UpsertProfile } from '../utilities/upsert/profile'

export const MyProfilePage = () => {

    return (
      <>

      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="user secret big icon"></i>
              <div className="content">
                  My Profile Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>

      < UpsertProfile />
      </>

    );
  };
  