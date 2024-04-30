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
      <table class="ui table basic">
          <tr class="ui middle aligned divided list">
            <td className='center aligned'>
              <TabApplications />
            </td>
            <td class="left aligned collapsing top aligned" style={{minWidth:"300px", border:"none"}}>
              <div className=' ui segment' style={{marginTop:"68px"}}>
                  <h3 className='header center aligned'>Recent Activity</h3>
                  <div class="ui relaxed divided list">
                    <div class="item">
                    <i class="history large middle aligned icon grey"></i>
                      <div class="content">
                        <span class="header">Data ABCD</span>
                        <div class="description">Updated 10 mins ago</div>
                      </div>
                    </div>
                    <div class="item">
                    <i class="history large middle aligned icon grey"></i>
                      <div class="content">
                        <span class="header">Data ABCD</span>
                        <div class="description">Added 15 mins ago</div>
                      </div>
                    </div>
                  </div>
              </div>
            </td>
          </tr>
        </table>

      
    </>

    );
  };
  