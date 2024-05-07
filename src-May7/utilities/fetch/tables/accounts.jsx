import { useState } from 'react';
import { Accounts } from '../raw/accounts'
import * as Set from '../../constants'

export const FetchAccounts = ({selectData}) => {

  const [clicked, setClicked] = useState(1)
  const data = Accounts().data
  const load = Accounts().load

  function setStatus(i) {
    if (i.statusLabel == "Active") {
      return  <button className='ui button green basic'>
                  <i className="check circle outline icon"></i>
                  Active
              </button>;
    } else if (i.statusLabel == "Pending") {
      return  <button className='ui button yellow basic'>
                  <i className="spinner icon"></i>
                  Pending
              </button>;
    } else {
      return  <button className='ui button red basic'>
                  <i className="times circle outline icon"></i>
                  Inactive
              </button>;
    }
  }

  const editData = (id,idd,accountNickname,accountRole,userID,appID,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "selected": 1,
                    "id": id,
                    "idd": idd, 
                    "nickname": accountNickname, 
                    "role": accountRole, 
                    "userID": userID, 
                    "appID": appID, 
                    "status": status
                  }
      setClicked(clicked+1)
      selectData(array);
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
        <h3 class="ui horizontal divider header">
          Accounts List
        </h3>
        <br />
        <table className='ui celled striped table small compact'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nickname</th>
            <th>Role</th>
            <th>Clubs</th>
            <th>User</th>
            <th>Application</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>{i.accountID}</td>
              <td>{i.accountNickname}</td>
              <td>{i.accountRole}</td>
              <td>{i.accountClubsCount}</td>
              <td>
                <h5 className="ui image header">
                    <img src={i.userAvatar ? i.userAvatar : "./images/joker.png" } className="ui mini rounded image" />
                    <div className="content">
                      {i.userNickname}
                      <div className='sub header'>
                       ID# {i.userID}
                      </div>
                    </div>
                </h5>
              </td>
              <td>{i.appName}</td>
              <td>{setStatus(i)}</td>
              <td>
                <button className='ui icon button violet' onClick={()=> editData(i.id,i.accountID,i.accountNickname,i.accountRoleID,i.userID,i.appID,i.status)}>
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
