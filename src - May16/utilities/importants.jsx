import React, { useState, useEffect } from 'react';

export const screenResized = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return ({screenWidth});
  }
