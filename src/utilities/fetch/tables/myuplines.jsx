import { useState } from 'react';
import { MyUplines } from '../raw/uplines'
import * as Set from '../../constants'
import * as Func from '../../functions'

export const FetchMyUplines = ({ selectData }) => {

  const [clicked, setClicked] = useState(1)
  const data = MyUplines().data
  const load = MyUplines().load
  
  const editData = (id,appID,clubID,clubIDD,downlineID,uplineID,percentage,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked"       :clicked,
                    "proceed"       : "true",
                    "id"            : id, 
                    "appID"         : appID,
                    "clubID"        : clubID, 
                    "clubIDD"       : clubIDD, 
                    "downlineID"    : downlineID, 
                    "uplineID"      : uplineID, 
                    "percentage"    : percentage, 
                    "status"        : status,
                  }
      setClicked(clicked+1)
      selectData(array)
      setTimeout(
        window.scrollTo({ top: 0, behavior: 'smooth' })
      , 1000)
  };

  return (
<>

{load ? (
      <Set.LoadingData />
      ) : (
      <div className="ui segment basic">
        <h3 className="ui horizontal divider header">
          My Uplines List
        </h3>
        <br />
        <table className='ui unstackable celled long scrolling table small compact'>
        <thead>
          <tr>
            <th>Club</th>
            <th>Downline</th>
            <th>Upline</th>
            <th>Percentage</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>
                <h5 className="ui image header">
                    <img src={i.appImage ? i.appImage : "./images/default.png"} className="ui mini rounded image" />
                    <div className="content">
                    <span className='mobileOnly'>CLUB: </span> {i.clubName}
                      <div className="sub header">
                        ID: {i.clubIDD}
                        <br />
                        Stated: {i.stated}
                      </div>
                  </div>
                </h5>
              </td>
              <td>
                <h5 className="ui image header">
                    <img src={i.downAvatar ? i.downAvatar : "./images/joker.png"} className="ui mini rounded image" />
                    <div className="content">
                      <span className='mobileOnly'>DOWNLINE </span>ID: {i.downacctID}
                      <div className="sub header">
                        {i.downacctRole}: {i.downacctNickname}
                        <br />
                        <i>(User: {i.downuserNickname}) </i>
                        <br />
                        Status: {i.downacctStatus}
                      </div>
                  </div>
                </h5>
              </td>
              <td>
              <h5 className="ui image header">
                    <img src={i.upAvatar ? i.upAvatar : "./images/joker.png"} className="ui mini rounded image" />
                    <div className="content">
                      <span className='mobileOnly'>UPLINE </span> ID: {i.upacctID}
                      <div className="sub header">
                      {i.upacctRole}: {i.upacctNickname}
                        <br />
                        <i>(User: {i.upuserNickname}) </i>
                        <br />
                        Status: {i.upacctStatus}
                      </div>
                  </div>
                </h5>

              </td>
              <td>{i.percentage}% </td>
              <td>{Func.toStatus(i.statusLabel)}</td>

              <td>
                <button className='ui icon button violet' onClick={()=> editData(i.id,i.appID,i.clubID,i.clubIDD,i.downacctID,i.upacctID,i.percentage,i.status)}>
                    <i className="pencil icon"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}

</>

  );
}
