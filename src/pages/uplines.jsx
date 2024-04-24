import { FetchUplines } from '../utilities/fetch/tables/uplines'

export const UplinesPage = () => {

    return (
    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="layer group big icon"></i>
              <div className="content">
                  Uplines Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>

      <FetchUplines />
    </>

    );
  };
  