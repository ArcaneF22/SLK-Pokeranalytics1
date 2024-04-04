
import { isNumeric } from '../utilities/tools'

export const DashboardPage = () => {

  const isToken = JSON.parse(localStorage.getItem('Token'))["id"]
  const getUser = JSON.parse(localStorage.getItem('User'))
  const isNum = isNumeric(isToken)
  console.log(isNum)
  
  return (
    <div className="expand-centered">
      <h1>DashboardPage</h1>

      <div className="ui vertical stripe quote segment">
        <div className="ui middle aligned stackable grid container">
          <div className="row">
            <div className="six wide right floated column">
              <h3>Welcome back {getUser["rolename"]}: {getUser["nickname"]}!</h3>
              <p>You have some work to do!</p>
            </div>
            <div className="eight wide left floated column">

              <h3 className="ui top attached header">
                Tasks
              </h3>
              
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
          </div>
        </div>
      </div>


    </div>
  );
};
