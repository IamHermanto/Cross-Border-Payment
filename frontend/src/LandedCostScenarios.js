import React, { useState, useEffect } from 'react';
import API_URL from './config';

function LandedCostScenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          landedCostScenarios {
            name
            description
            exampleMutation
            expectedResult
            commonIssues
          }
        }`
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.data && data.data.landedCostScenarios) {
        setScenarios(data.data.landedCostScenarios);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching scenarios:', err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading scenarios...</div>;

  return (
    <div className="scenarios-section">
      <h2>Common Landed Cost Scenarios</h2>
      <p>Real-world examples showing how landedCostCreate works in different situations</p>

      <div className="scenarios-grid">
        {scenarios.map((scenario, i) => (
          <div key={i} className="scenario-card">
            <h3>{scenario.name}</h3>
            <p><strong>Use Case:</strong> {scenario.description}</p>
            
            <div className="code-block">
              <strong>Example Mutation:</strong>
              <pre>{scenario.exampleMutation}</pre>
            </div>

            <p><strong>Expected Result:</strong></p>
            <p>{scenario.expectedResult}</p>

            {scenario.commonIssues && scenario.commonIssues.length > 0 && (
              <div className="common-issues">
                <h5>Common Issues:</h5>
                <ul>
                  {scenario.commonIssues.map((issue, j) => (
                    <li key={j}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandedCostScenarios;