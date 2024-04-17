import { createContext, useContext, useState, useEffect } from 'react';
import { RawNotificationCount } from '../fetch/raw/notification'

const OutsideContext = createContext();
export const useGlobalOutside = () => useContext(OutsideContext);

export const GlobalOutside = ({ children }) => {
    
    const myConstant = "sample only"
    const Yehey = "Yehey talaga!"

    const Token = JSON.parse( localStorage.getItem('Token') );

    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget']
            }; 

            const [countNotif, setcountNotif] = useState(false);
            
            const countNotification = (value) => {
                setcountNotif(value);
            };
          

    const userInteraction = () => {
        console.log("Moving....")
    };

    const events = ['click', 'load', 'keydown', 'resize', 'scroll', 'popstate', 'touchstart', 'mousemove'];
    events.forEach(event => window.addEventListener(event, userInteraction));
    return (
        <>
        <OutsideContext.Provider value={{ 
                                            myConstant,
                                            Yehey,
                                            countNotif
                                         }}>
            {children}
        </OutsideContext.Provider>
        <RawNotificationCount countNotification={countNotification} />
        </>
    );
};
