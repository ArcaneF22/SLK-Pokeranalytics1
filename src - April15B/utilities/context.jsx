import { createContext, useContext, useState, useEffect } from 'react';

const OnContext = createContext();
export const useGlobal = () => useContext(OnContext);

export const GlobalContext = ({ children }) => {
    const [myConstant, setMyConstant] = useState("Global Value");
    const Yehey = "Yehey talaga!"

    const userInteraction = () => {
        console.log("Moving....")
    };

    const events = ['click', 'load', 'keydown', 'resize', 'scroll', 'popstate', 'touchstart', 'mousemove'];
    events.forEach(event => window.addEventListener(event, userInteraction));
    return (
        <OnContext.Provider value={{ 
                                            myConstant,
                                            Yehey,
                                         }}>
            {children}
        </OnContext.Provider>
    );
};