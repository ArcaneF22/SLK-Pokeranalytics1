import { useState } from 'react';
import { Users } from '../raw/users'
import * as Set from '../../constants'
import * as Func from '../../functions'

export const FetchUsers = ({ selectData }) => {

  const [clicked, setClicked] = useState(1)
  const data = Users().data
  const load = Users().load

  const editData = (id,nickname,role,email,telegram,username,password,avatar,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "proceed": "true",
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
        <h3 className="ui horizontal divider header">
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
                    <img src={i.avatarFull ? i.avatarFull : "./images/joker-colored.png"} className="ui mini rounded image" />
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
              <td className='ui list'>
                {Func.toListState(i.activeAccounts,"active")}
                {Func.toListState(i.pendingAccounts,"pending")}
                {Func.toListState(i.disabledAccounts,"disabled")}
                {i.activeAccounts == 0 ? null : i.activeAccounts == 1 ? (i.activeAccounts+" Active Account") : (i.activeAccounts+" Active Accounts")}
                </td>
              <td>{Func.toStatus(i.statusLabel)}</td>
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
