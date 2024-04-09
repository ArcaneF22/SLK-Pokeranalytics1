import React from 'react';

function ChildComponent2({ constantValue, updateConstantValue }) {
  const handleClick = () => {
    updateConstantValue('New Value from Child 2');
  };

  return (
    <div>
      <h3>Child Component 2</h3>
      <p>Constant Value: {constantValue}</p>
      <button onClick={handleClick}>Update Constant Value</button>
    </div>
  );
}

export default ChildComponent2;