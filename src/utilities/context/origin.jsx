import React, { createContext, useState } from 'react';

const MyContext = createContext({ MY_CONSTANT: null }); // Initial value can be anything

export default MyContext;