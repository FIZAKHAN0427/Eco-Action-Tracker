import React, { useState, useEffect } from 'react';
import './App.css';
import ActionList from './components/ActionList';
import ImpactSummary from './components/ImpactSummary';

function App() {
  const [trackedActions, setTrackedActions] = useState(() => {
    return JSON.parse(localStorage.getItem('trackedActions')) || [];
  });

  useEffect(() => {
    localStorage.setItem('trackedActions', JSON.stringify(trackedActions));
  }, [trackedActions]);

  const addAction = (action) => {
    setTrackedActions((prevActions) => {
      const existingAction = prevActions.find((a) => a.name === action.name);
      if (existingAction) {
        return prevActions.map((a) =>
          a.name === action.name ? { ...a, count: a.count + 1 } : a
        );
      }
      return [...prevActions, { ...action, count: 1 }];
    });
  };

  const subtractAction = (actionName) => {
    setTrackedActions((prevActions) => {
      const existingAction = prevActions.find((a) => a.name === actionName);
      if (existingAction && existingAction.count > 1) {
        return prevActions.map((a) =>
          a.name === actionName ? { ...a, count: a.count - 1 } : a
        );
      }
      return prevActions.filter((a) => a.name !== actionName);
    });
  };

  const clearActions = () => setTrackedActions([]);

  const removeAction = (actionName) => {
    setTrackedActions((prevActions) =>
      prevActions.filter((a) => a.name !== actionName)
    );
  };

  const totalCarbonReduction = trackedActions.reduce(
    (total, action) => total + action.carbonReduction * action.count,
    0
  );

  return (
    <div className="app">
      <h1>Eco Action Tracker</h1>
      <div className="container">
        <ActionList onAddAction={addAction} />
        <ImpactSummary
          trackedActions={trackedActions}
          totalCarbonReduction={totalCarbonReduction}
          onClearActions={clearActions}
          onRemoveAction={removeAction}
          onSubtractAction={subtractAction}
        />
      </div>
    </div>
  );
}

export default App;
