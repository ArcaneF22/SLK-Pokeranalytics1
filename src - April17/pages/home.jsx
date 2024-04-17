
import { isNumeric } from '../utilities/tools'
import { FetchNotificationPending } from '../utilities/fetch/items/notifications'
import { useGlobalOutside  } from '../utilities/context/global';

export const HomePage = () => {

  const { countNotif } = useGlobalOutside();
  const isToken = JSON.parse(localStorage.getItem('Token'))["id"]
  const getUser = JSON.parse(localStorage.getItem('User'))
  const isNum = isNumeric(isToken)
  console.log(isNum)
  const User =    JSON.parse( localStorage.getItem('User') );
  return (
    <>
    <div className="expand-centered">
        <h2 className="ui header">
            <i className="home big icon text-purple"></i>
            <div className="content text-purple">
            Home Page {countNotif}
                <div className="sub header text-purpled">Manage your preferences</div>
            </div>
        </h2>

      <div className="ui vertical stripe quote segment">
        <div className="ui middle aligned stackable grid container">
          <div className="row">
            <div className="six wide right floated column">
              <h3>Welcome back {getUser["rolename"]}: {getUser["nickname"]}!</h3>
              <p>You have some work to do! </p>
            </div>
            <div className="eight wide left floated column">
              <FetchNotificationPending />
            </div>
          </div>
        </div>
      </div>


    </div>

</>

  );
};
