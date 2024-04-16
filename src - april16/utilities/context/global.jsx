import { createContext, useContext, useState, useEffect } from 'react';

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


    const userInteraction = () => {
        console.log("Moving....")
    };

    const events = ['click', 'load', 'keydown', 'resize', 'scroll', 'popstate', 'touchstart', 'mousemove'];
    events.forEach(event => window.addEventListener(event, userInteraction));
    return (
        <OutsideContext.Provider value={{ 
                                            myConstant,
                                            Yehey,
                                         }}>
            {children}
        </OutsideContext.Provider>
    );
};
