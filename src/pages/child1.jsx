import React from 'react';



export const ChildComponent1 = ({ updateValue }) => {


  const handleClick = () => {
    const array = [{
                    "id": 'value1', 
                    "name": 'value2', 
                    "image": 'value3'
                  }]
    updateValue(array);
  };

  return (
    <div>
      <h3>Child Component 1</h3>
      <button onClick={handleClick}>Go value</button>
    </div>
  );
}

