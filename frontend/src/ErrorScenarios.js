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
            category
          }
        }`
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.data && data.data.errorScenarios) {
        setScenarios(data.data.errorScenarios);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching scenarios:', err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading error scenarios...</div>;

  return (
    <div className="error-scenarios">
      <h2>Error Reference Guide</h2>
      <p>Common errors encountered when using the Zonos Landed Cost API and how to resolve them</p>

      <div className="scenarios-grid">
        {scenarios.map((scenario, i) => (
          <div key={i} className="scenario-card">
            <span className="scenario-category">{scenario.category}</span>
            <h3>{scenario.name}</h3>
            <p><strong>Description:</strong> {scenario.description}</p>
            
            <div className="code-block">
              <strong>Example Request:</strong>
              <pre>{scenario.exampleRequest}</pre>
            </div>
            
            <p className="error-text"><strong>Error Message:</strong><br />{scenario.expectedError}</p>
            <p className="solution-text"><strong>Solution:</strong><br />{scenario.solution}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ErrorScenarios;