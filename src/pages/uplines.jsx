import { TabUplines } from '../utilities/tabs/uplines'

export const UplinesPage = () => {

    return (
    <>
      <div className='ui segment message purple-box div-animated glass'>
        <h2 className="ui header inverted ">
              <i className="layer group big icon"></i>
              <div className="content">
                  Uplines Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>

      <table className="ui table basic noBorder">
          <tbody>
              <tr className="ui middle aligned divided list">
                <td className='center aligned'>
                  <TabUplines />
                </td>
                <td className="left aligned collapsing top aligned" style={{minWidth:"300px", border:"none"}}>
                  <div className=' ui message info' style={{marginTop:"55px"}}>
                      <h3 className='header'>Recent Activity</h3>
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
  