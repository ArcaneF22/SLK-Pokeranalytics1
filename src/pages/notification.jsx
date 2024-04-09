import { FetchNotification } from '../utilities/fetch/notification'
import ChildComponent1 from './child1';
import ChildComponent2 from './child2';


export const NotificationPage = () => {
  const [constantValue, setConstantValue] = useState('Initial Value');
  const updateConstantValue = (newValue) => {
    setConstantValue(newValue);
  };
    return (
      <div className="expand-centered">
        <h1>Notification Pages</h1>
        <FetchNotification />
        <ChildComponent1 constantValue={constantValue} updateConstantValue={updateConstantValue} />
        <ChildComponent2 constantValue={constantValue} updateConstantValue={updateConstantValue} />
      </div>
    );
  };
  