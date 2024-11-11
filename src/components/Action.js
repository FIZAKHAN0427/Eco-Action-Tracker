import React from 'react';
import './Action.css';

function Action({ name, count, carbonReduction, onRemove, onSubtract }) {
  return (
    <div className="tracked-action">
      <span>{name}</span>
      
      <span>
        <pre>{count} x {carbonReduction.toFixed(1)} kg CO₂  <button onClick={onSubtract} className="subtract-btn">━</button>
        <button onClick={onRemove} className="delete-btn">🗑️</button>
        </pre>
        </span>
      
    </div>
  );
}

export default Action;
