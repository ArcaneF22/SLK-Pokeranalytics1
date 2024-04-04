
import { isNumeric } from '../utilities/tools'

export const DashboardPage = () => {

  const isToken = JSON.parse(localStorage.getItem('Token'))["id"]
  const getAuth = JSON.parse(localStorage.getItem('User'))
  const isNum = isNumeric(isToken)
  console.log(isNum)
  
  return (
    <div className="expand-centered">
      <h1>DashboardPage</h1>
      {isToken}

      <div className="ui placeholder segment">
        <div className="ui icon header">
          Welcome! {getAuth["nickname"]}
        </div>
        <div className="inline">
          <div className="ui text teal">{getAuth["rolename"]}</div>
        </div>
      </div>

    </div>
  );
};
