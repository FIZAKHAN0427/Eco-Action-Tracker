import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import Action from './Action';
import './ImpactSummary.css';

function ImpactSummary({ trackedActions, totalCarbonReduction, onClearActions, onRemoveAction, onSubtractAction }) {
  const treesSaved = Math.floor(totalCarbonReduction / 10);
  const certificateRef = useRef();

  const getImpactMessageStyle = () => {
    if (totalCarbonReduction < 0.5) return { color: 'red' };
    if (totalCarbonReduction < 1) return { color: 'orange' };
    return { color: 'green' };
  };

  const generateCertificate = () => {
    const certificateElement = certificateRef.current;
    if (!certificateElement) {
      alert('Certificate element not found.');
      return;
    }

    html2canvas(certificateElement, { scale: 2 })
      .then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement('a');
            link.download = 'EcoAction_Certificate.png';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);  // Clean up URL
          } else {
            alert('Failed to generate the certificate image.');
          }
        });
      })
      .catch((error) => {
        console.error('Error generating certificate:', error);
        alert('An error occurred while generating the certificate.');
      });
  };

  return (
    <div className="card impact-summary">
      <h3>Your Impact</h3>
      <button onClick={onClearActions} className="clear-btn">♻️ Clear All</button>
      {trackedActions.length === 0 ? (
        <p>No actions tracked yet. Start adding eco-friendly actions!</p>
      ) : (
        <>
          {trackedActions.map((action) => (
            <Action
              key={action.name}
              name={action.name}
              count={action.count}
              carbonReduction={action.carbonReduction}
              onRemove={() => onRemoveAction(action.name)}
              onSubtract={() => onSubtractAction(action.name)}
            />
          ))}
          <div className="total">
            <strong>Total CO₂ Saved</strong>
            <p style={getImpactMessageStyle()}>
              {totalCarbonReduction.toFixed(1)} kg
            </p>
            <p className="tree-message">
              You've saved the equivalent of {treesSaved} trees planted!
            </p>
            {treesSaved >= 1 && (
              <button onClick={generateCertificate} className="certificate-btn">
                🎉 Download Certificate
              </button>
            )}
          </div>
        </>
      )}

      {/* Hidden certificate element for rendering */}
      <div ref={certificateRef} className="certificate" style={{ display: 'none', width: '600px', height: '400px' }}>
        <h2>Eco Action Certificate</h2>
        <p>Congratulations on your eco-friendly efforts!</p>
        <p>You have saved the equivalent of {treesSaved} tree(s) planted!</p>
        <p>Keep up the great work in helping the planet!</p>
        <p>Presented on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default ImpactSummary;
