import React, { useState } from 'react';
import './App.css';
import ErrorScenarios from './ErrorScenarios';
import TransactionFlow from './TransactionFlow';
import API_URL from './config';

function App() {
  const [apiRequest, setApiRequest] = useState('');
  const [result, setResult] = useState(null);

  const handleInspect = async () => {
    try {
      const response = await fetch(`${API_URL}/api/inspect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiRequest })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ valid: false, issues: [{ field: 'Error', issue: error.message }] });
    }
  };

  return (
    <div className="App">
      <h1>Cross-Border Payment API Inspector</h1>
      
      <div className="inspector-container">
        <textarea
          placeholder='Paste your API request JSON here...'
          value={apiRequest}
          onChange={(e) => setApiRequest(e.target.value)}
          rows={15}
        />
        
        <button onClick={handleInspect}>Inspect Request</button>
        
        {result && (
          <div className={`result ${result.valid ? 'valid' : 'invalid'}`}>
            <h3>{result.valid ? '✓ Valid Request' : '✗ Invalid Request'}</h3>
            
            {result.issues && result.issues.length > 0 && (
              <div className="issues">
                <h4>Errors:</h4>
                {result.issues.map((issue, i) => (
                  <div key={i} className="issue error">
                    <strong>{issue.field}:</strong> {issue.issue}
                  </div>
                ))}
              </div>
            )}

            {result.warnings && result.warnings.length > 0 && (
              <div className="warnings">
                <h4>Warnings:</h4>
                {result.warnings.map((warning, i) => (
                  <div key={i} className="issue warning">
                    <strong>{warning.field}:</strong> {warning.issue}
                  </div>
                ))}
              </div>
            )}
            
            {result.parsed && (
              <div className="parsed">
                <h4>Parsed Data:</h4>
                <pre>{JSON.stringify(result.parsed, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>

      <TransactionFlow />
      <ErrorScenarios />
    </div>
  );
}

export default App;