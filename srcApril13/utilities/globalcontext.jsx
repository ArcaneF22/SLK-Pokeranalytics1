import { createContext, useContext, useState, useEffect } from 'react';

const GlobalVerification = createContext();
export const getContext = () => useContext(GlobalVerification);

export const GlobalAutoVerification = ({ children }) => {
    return (
        <>
        
        <GlobalVerification.Provider value={{ 
                                              pathAvatar,
                                              pathIcon, 
                                            }}>
  
          {children}
        </GlobalVerification.Provider>
        </>
   
        );

}