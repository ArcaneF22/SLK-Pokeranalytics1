import { useState } from 'react';
import { MyAccounts } from '../raw/accounts'

export const ItemsMyAccount = () => {

  const data = MyAccounts().data
  const load = MyAccounts().load

  return (
<>

{load ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">Loading table...</div>
        </div>
      </div>
      ) : (

        <div className="ui middle aligned divided list" >
            {data.map((i, index) => (

                <div className="item" key={index}>
                    <div className="right floated content">
                        <div className="ui button icon purple basic circular">
                            <i className="edit outline icon large"></i>
                        </div>
                        <div className="ui button icon red basic circular">
                            <i className="ban icon large"></i>
                        </div>
                    </div>
                    <img className="ui avatar image" src={i.userAvatar} />
                    <div className="content">
                        <a className="header">{i.accountRole}: {i.accountNickname}</a>
                        <div className="description">
                            <div className="ui label basic">
                                <i className="arrow down icon"></i>
                                {i.accountID}
                            </div>
                            <div className="ui label basic" tool-tip="yey">
                                <i className="arrow up icon"></i>   
                                {i.userID} : {i.userNickname}
                            </div>
                            <div className="ui label basic" tool-tip="yey">
                                <i className="arrow up icon"></i>   
                                Clubs Joined: {i.accountClubsCount}
                            </div>
                        </div>
                    </div>
                </div>    

            ))}
        </div>
      )}

</>

  );
}
