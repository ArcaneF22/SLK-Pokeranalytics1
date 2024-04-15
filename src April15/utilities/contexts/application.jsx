import { createContext, useContext, useState, useEffect } from 'react';

const app_Context = createContext();
export const appContexts = () => useContext(app_Context);

export const GlobalAutoVerification = ({ children }) => {

    const iii = "aaaa";
    const iiii = "aaaa";
    const eventlistening = () => {
        console.log("Event listener...")
      };

    // Event listeners
    const events = ['click', 'load', 'keydown', 'resize', 'scroll', 'popstate', 'touchstart', 'mousemove'];
    events.forEach(event => window.addEventListener(event, eventlistening));

    return (
        <>
        
        <app_Context.Provider value={{ 
                                              iii,
                                              iiii, 
                                            }}>
  
          {children}
        </app_Context.Provider>
        </>
   
        );

}