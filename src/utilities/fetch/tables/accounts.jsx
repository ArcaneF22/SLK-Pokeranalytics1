import { useState } from 'react';
import { Accounts } from '../raw/accounts'
import * as Set from '../../constants'
import * as Func from '../../functions'

export const FetchAccounts = ({selectData}) => {

  const [clicked, setClicked] = useState(1)
  const data = Accounts('ALL').data
  const load = Accounts('ALL').load

  const editData = (id,idd,accountNickname,accountRole,userID,appID,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "proceed": "true",
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
        <h3 className="ui horizontal divider header">
          Accounts List
        </h3>
        <br />
        <table className='ui celled striped table small compact'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NICKNAME</th>
            <th>ROLE</th>
            <th>USER</th>
            <th>APPLICATION</th>
            <th>STATUS</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td className='center aligned'>
                <b>{i.accountID}</b>
              </td>
              <td>{i.accountNickname}</td>
              <td>{i.accountRole}</td>
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
              <td>
                <h5 className="ui header">
                    <div className="content">
                    {i.appName}
                      <div className='sub header'>
                       {i.accountClubsCount == 0 ? "No club" : i.accountClubsCount == 1 ? "1 club" : i.accountClubsCount+" clubs" }
                      </div>
                    </div>
                </h5>
              </td>
              <td>{Func.toStatus(i.statusLabel)}</td>
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
