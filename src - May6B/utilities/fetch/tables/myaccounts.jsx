import { useState } from 'react';
import { MyAccounts } from '../raw/accounts'
import * as Set from '../../constants'

export const FetchMyAccounts = ({selectMyAccount}) => {

  const [clicked, setClicked] = useState(0)
  const data = MyAccounts().data
  const load = MyAccounts().load

  function setStatus(i) {
    if (i.status == "Active") {
      return  <button className='ui button green basic'>
                  <i className="check circle outline icon"></i>
                  Active
              </button>;
    } else if (i.status == "Pending") {
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

  const editMyAccount = (accountID,accountNickname,accountRole,userID,appID,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "accountID": accountID, 
                    "accountNickname": accountNickname, 
                    "accountRole": accountRole, 
                    "userID": userID, 
                    "appID": appID, 
                    "status": status
                  }
    //selectAccount(array);
    console.log(array)
  };


  return (
<>

{load ? (
      <Set.LoadingData />
      ) : (
      <div className="ui segment ">
        <h3 class="ui horizontal divider header">
          My Accounts List
        </h3>
        <br />
        <table className='ui celled striped table small compact'>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Nickname</th>
            <th>Account Role</th>
            <th>Account Clubs</th>
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
                    <img src={i.userAvatar} className="ui mini rounded image" />
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
                <button className='ui icon button violet' onClick={()=> editAccount(i.accountID,i.accountNickname,i.accountRole,i.userID,i.appID,i.status)}>
                    <i className="edit outline icon"></i>
                    Edit
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
