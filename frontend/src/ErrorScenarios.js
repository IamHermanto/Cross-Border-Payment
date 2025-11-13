import React, { useState, useEffect } from 'react';
import API_URL from './config';

function ErrorScenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          errorScenarios {
            name
            description
            exampleRequest
            expectedError
            solution
          }
        }`
      })
    })
    .then(res => res.json())
    .then(data => {
      setScenarios(data.data.errorScenarios);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading scenarios...</div>;

  return (
    <div className="error-scenarios">
      <h2>Common Error Scenarios</h2>
      <div className="scenarios-grid">
        {scenarios.map((scenario, i) => (
          <div key={i} className="scenario-card">
            <h3>{scenario.name}</h3>
            <p><strong>Description:</strong> {scenario.description}</p>
            <div className="code-block">
              <strong>Example Request:</strong>
              <pre>{scenario.exampleRequest}</pre>
            </div>
            <p className="error-text"><strong>Error:</strong> {scenario.expectedError}</p>
            <p className="solution-text"><strong>Solution:</strong> {scenario.solution}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ErrorScenarios;