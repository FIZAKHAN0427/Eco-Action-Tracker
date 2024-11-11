import React from 'react';
import './ActionList.css';

function ActionList({ onAddAction }) {
  const actions = [
    { name: 'Use a reusable water bottle', carbonReduction: 0.5 },
    { name: 'Take public transport', carbonReduction: 2.6 },
    { name: 'Eat a plant-based meal', carbonReduction: 0.8 },
    { name: 'Use energy-efficient light bulbs', carbonReduction: 0.1 },
    { name: 'Recycle paper', carbonReduction: 0.2 },
  ];

  return (
    <div className="card">
      <h3>Eco-Friendly Actions</h3>
      {actions.map((action) => (
        <div key={action.name} className="action-item">
          <span>{action.name}</span>
          <span><pre>{action.carbonReduction} kg CO₂  <button onClick={() => onAddAction(action)} className="add-btn">╋</button></pre></span>
        </div>
      ))}
    </div>
  );
}

export default ActionList;
