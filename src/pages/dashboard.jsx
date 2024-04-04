
import { isNumeric } from '../utilities/tools'

export const DashboardPage = () => {
  const isToken = JSON.parse(localStorage.getItem('Token'))["id"]

  const isNum = isNumeric(isToken)
  console.log(isNum)
  
  return (
    <div className="expand-centered">
      <h1>DashboardPage</h1>
      {isToken}
    </div>
  );
};
