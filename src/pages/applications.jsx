import { TabApplications } from '../utilities/tabs/applications'

export const ApplicationsPage = () => {

    return (
    <>
      <div className='ui segment message purple-box div-animated'>
        <h2 className="ui header inverted">
              <i className="layer group big icon"></i>
              <div className="content">
                  Applications Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
      <table className="ui table basic">
        <tbody>
          <tr className="ui middle aligned divided list">
            <td className='center aligned'>
              <TabApplications />
            </td>
            <td className="left aligned collapsing top aligned" style={{minWidth:"300px", border:"none"}}>
              <div className=' ui message info' style={{marginTop:"68px"}}>
                  <h2 className='header'>Recent Activity</h2>
                  <div className="ui relaxed divided list">
                    <div className="item">
                    <i className="history large middle aligned icon"></i>
                      <div className="content">
                        <span className="header">Data ABCD</span>
                        <div className="description">Updated 10 mins ago</div>
                      </div>
                    </div>
                    <div className="item">
                    <i className="history large middle aligned icon"></i>
                      <div className="content">
                        <span className="header">Data ABCD</span>
                        <div className="description">Added 15 mins ago</div>
                      </div>
                    </div>
                  </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>

      
    </>

    );
  };
  