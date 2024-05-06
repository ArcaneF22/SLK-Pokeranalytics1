import { useState } from 'react';
import { Users } from '../raw/users'
import * as Set from '../../constants'

export const FetchUsers = ({ selectData }) => {

  const [clicked, setClicked] = useState(1)
  const data = Users().data
  const load = Users().load

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
  const editData = (id,nickname,role,email,telegram,username,password,avatar,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "id": id, 
                    "nickname": nickname, 
                    "role": role, 
                    "email": email, 
                    "telegram": telegram, 
                    "username": username, 
                    "password": password, 
                    "avatar": avatar, 
                    "status": status,
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
      <Set.LoadingData/>
      ) : (
      <div className="ui segment basic">
        <h3 class="ui horizontal divider header">
          Users List
        </h3>
        <br />
        <p>{JSON.stringify(fetch)}</p>
        <table className='ui celled striped table fluid small compact'>
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Role</th>
            <th>Contact Details</th>
            <th>Credentials</th>
            <th>Accounts</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>
                <h5 className="ui image header">
                    <img src={i.avatarFull} className="ui mini rounded image" />
                    <div className="content">
                      {i.nickname}
                      <div className="sub header">
                        ID: {i.idd}
                      </div>
                  </div>
                </h5>

              </td>
              <td>{i.roleName}</td>
              <td className="ui list">
                    {i.email ?  (
                        <div className="item">
                            <i className="envelope square icon orange"></i>
                            <a className="content">
                              Email
                            </a>
                        </div>
                    ) : null}
                    {i.telegram ?  (
                        <div className="item">
                            <i className="telegram icon teal"></i>
                            <a className="content">
                              Telegram
                            </a>
                        </div>
                    ) : null}

              </td>
              <td>
                UN: {i.username}
                <br />
                PW: {i.password}
              </td>
              <td>
                {i.activeAccounts == 0 ? null : i.activeAccounts == 1 ? (i.activeAccounts+" Active Account") : (i.activeAccounts+" Active Accounts")}
                <br />
                {i.pendingAccounts == 0 ? null : i.pendingAccounts == 1 ? ( i.pendingAccounts+" Pending Account") : (i.pendingAccounts+" Pending Accounts")}
                <br />
                {i.disabledAccounts == 0 ? null : i.disabledAccounts == 1 ? ( i.disabledAccounts+" Disabled Account") : (i.disabledAccounts+" Disabled Accounts")}
                </td>
              <td>{setStatus(i)}</td>
              <td>
                <button className='ui icon button violet' onClick={()=> editData(i.id,i.nickname,i.roleID,i.email,i.telegram,i.username,i.password,i.avatarID,i.status)}>
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
