import { useState } from 'react';
import { Uplines } from '../raw/uplines'
import * as Set from '../../constants'

export const FetchUplines = ({ selectData }) => {

  const [clicked, setClicked] = useState(1)
  const data = Uplines().data
  const load = Uplines().load
  
  const editData = (id,clubID,clubIDD,downlineID,uplineID,percentage,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked"       :clicked,
                    "id"            : id, 
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

  function setStatus(i) {
    if (i.statusLabel == "Active") {
      return  <div className='ui label green basic center aligned fluid'>
                  <i className="check circle outline icon"></i>
                  Active
              </div>;
    } else if (i.statusLabel == "Pending") {
      return  <div className='ui label orange basic center aligned fluid'>
                  <i className="spinner icon"></i>
                  Pending
              </div>;
    } else {
      return  <div className='ui label red basic center aligned fluid'>
                  <i className="times circle outline icon"></i>
                  Inactive
              </div>;
    }
  }

  return (
<>

{load ? (
      <Set.LoadingData />
      ) : (
      <div className="ui segment basic">
        <h3 className="ui horizontal divider header">
          Uplines List
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
              <td>{setStatus(i)}</td>

              <td>
                <button className='ui icon button violet' onClick={()=> editData(i.id,i.clubID,i.clubIDD,i.downacctID,i.upacctID,i.percentage,i.status)}>
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
