
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

      <div className="ui placeholder segment">
        <div className="ui icon header">
          Welcome! {getUser["nickname"]}
        </div>
        <div className="inline">
          <div className="ui text button teal">
            {getUser["rolename"]}
          </div>
        </div>
      </div>

    </div>
  );
};
