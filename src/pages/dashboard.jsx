
import { isNumeric } from '../utilities/tools'

export const DashboardPage = () => {

  const isToken = JSON.parse(localStorage.getItem('Token'))["id"]
  const getUser = JSON.parse(localStorage.getItem('User'))
  const isNum = isNumeric(isToken)
  console.log(isNum)
  
  return (
    <div className="expand-centered">
      <h1>DashboardPage</h1>
      {isToken}

      <div className="ui message">
        <i className="close icon"></i>
        <div className="header">
          Welcome back {getUser["rolename"]}: {getUser["nickname"]}!
        </div>
        <p>You have some work to do!</p>
      </div>

      <h5 className="ui top attached header">
        Tasks
      </h5>
      
      <div className="ui attached segment">
        <div className="ui relaxed divided list">
          <div className="item">
            <i className="check circle outline middle aligned icon"></i>
            <div className="content">
              <a className="header">Requesting Account Approval</a>
              <div className="description">ID: 9330898</div>
            </div>
          </div>
          <div className="item">
            <i className="check circle middle aligned icon"></i>
            <div className="content">
              <a className="header">Approved Account Request</a>
              <div className="description">ID: 940898</div>
            </div>
          </div>
          <div className="item">
            <i className="times circle middle aligned icon"></i>
            <div className="content">
              <a className="header">Denied Account Request</a>
              <div className="description">ID: 45940898</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
