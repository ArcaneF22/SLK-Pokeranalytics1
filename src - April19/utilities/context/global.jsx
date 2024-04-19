import { createContext, useContext, useState, useEffect } from 'react';
import { RawNotificationCount } from '../fetch/raw/notification'
import useInterval from 'use-interval'
import { RawProfile } from '../fetch/raw/profile'
import { RawApplications } from '../fetch/raw/applications'

const OutsideContext = createContext();
export const useGlobalOutside = () => useContext(OutsideContext);

export const GlobalOutside = ({ children }) => {

    const Timezoned = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const Token     = JSON.parse( localStorage.getItem('Token') );
    const User      = JSON.parse( localStorage.getItem('User') );

    const [countDown, setcountDown] = useState(0);

    const [loadprofile, setloadProfile] = useState("");
    const [profile, setProfile] = useState("");
    const loadingProfile  = (value) => { setloadProfile( value ); };
    const itemProfile     = (value) => { setProfile( value ); }

    const [countNotif, setcountNotif] = useState(false);
    const countNotification = (value) => { setcountNotif(value); };
    
    const [ListOfApps, setListOfApps] = useState(0);
    const [DropdownApps, setDropdownApps] = useState(0)
    const [ListOfAppsLoading, setListOfAppsLoading] = useState(false);
    const itemApplication = (value) => { setListOfApps(value)  };
    const dropdownApplication = (value) => { setDropdownApps(value)  };
    const loadingApplication = (value) => {   };
    const Auth = {
                A: Token['id'],
                B: Token['token'],
                C: Token['gadget'],
            }; 

    const Profile = {
                rolename:   profile['rolename'],
                nickname:   profile['nickname'],
                avatar:     profile['avatarpath'],
            };
            
    

    if(JSON.stringify(Profile) === JSON.stringify(User)){

    } else {

    }
    

    //Update constants details every 10 seconds
    useInterval(() => {
        setcountDown(seconds => seconds + 1);
      }, 1000);

    const userInteraction = () => {

    };

    const events = ['click', 'load', 'keydown', 'resize', 'scroll', 'popstate', 'touchstart', 'mousemove'];
    events.forEach(event => window.addEventListener(event, userInteraction));
    return (
        <>
        <OutsideContext.Provider value={{ 
                                            countNotif,
                                            loadprofile,
                                            Profile,
                                            ListOfApps, 
                                            dropdownApplication
                                         }}>
            {children}
        </OutsideContext.Provider>
        <RawNotificationCount countNotification={countNotification} />
        <RawProfile loadingProfile={loadingProfile} itemProfile={itemProfile} />
        <RawApplications itemApplication={itemApplication} loadingApplication={loadingApplication} dropdownApplication={dropdownApplication} />
        </>
    );
};
