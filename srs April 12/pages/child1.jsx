import React from 'react';

function ChildComponent1({ constantValue, updateConstantValue }) {
  const handleClick = () => {
    updateConstantValue('New Value from Child 1');
  };

  return (
    <div>
      <h3>Child Component 1</h3>
      <p>Constant Value: {constantValue}</p>
      <button onClick={handleClick}>Update Constant Value</button>
    </div>
  );
}

export default ChildComponent1;