import React, { useState } from 'react';
import API_URL from './config';

function MutationInspector() {
  const [mutation, setMutation] = useState(`mutation {
  landedCostCreate(input: {
    currencyCode: "USD"
    destinationCountry: "CA"
    items: [
      {
        sku: "TSHIRT-001"
        amount: 25.00
        quantity: 1
        hsCode: "6109.10"
        description: "Cotton T-shirt"
      }
    ]
    shippingCost: 10.00
  }) {
    id
    landedCostGuaranteeCode
    items {
      sku
      amount
      hsCode
    }
    duties {
      amount
      rate
      hsCode
    }
    taxes {
      amount
      formula
      description
    }
    amountSubtotals {
      items
      duties
      taxes
      shipping
      total
    }
  }
}`);

  const [result, setResult] = useState(null);
  const [debugLogs, setDebugLogs] = useState([]);

  const addDebugLog = (type, message, data = null) => {
    const timestamp = new Date().toISOString();
    setDebugLogs(prev => [...prev, { timestamp, type, message, data }]);
  };

  const handleExecute = async () => {
    setResult(null);
    setDebugLogs([]);
    
    addDebugLog('info', 'Starting mutation execution');
    
    try {
      // Parse and validate the mutation
      addDebugLog('info', 'Parsing GraphQL mutation');
      
      const response = await fetch(`${API_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
      });

      addDebugLog('info', `Response status: ${response.status}`);

      const data = await response.json();
      
      if (data.errors) {
        addDebugLog('error', 'GraphQL errors returned', data.errors);
        setResult({ success: false, errors: data.errors });
      } else {
        addDebugLog('success', 'Mutation executed successfully', data.data);
        setResult({ success: true, data: data.data });
      }
    } catch (error) {
      addDebugLog('error', 'Network or parsing error', error.message);
      setResult({ success: false, error: error.message });
    }
  };

  const loadExample = (exampleType) => {
    const examples = {
      basic: `mutation {
  landedCostCreate(input: {
    currencyCode: "USD"
    destinationCountry: "CA"
    items: [
      {
        sku: "TSHIRT-001"
        amount: 25.00
        quantity: 1
        hsCode: "6109.10"
      }
    ]
    shippingCost: 10.00
  }) {
    id
    amountSubtotals { total duties taxes }
  }
}`,
      multiItem: `mutation {
  landedCostCreate(input: {
    currencyCode: "EUR"
    destinationCountry: "DE"
    items: [
      {
        sku: "BAG-001"
        amount: 120.00
        quantity: 1
        hsCode: "4202.92"
      },
      {
        sku: "COSMETIC-001"
        amount: 45.00
        quantity: 2
        hsCode: "3304.99"
      }
    ]
    shippingCost: 25.00
  }) {
    id
    landedCostGuaranteeCode
    amountSubtotals {
      items
      duties
      taxes
      shipping
      total
    }
  }
}`,
      invalidHsCode: `mutation {
  landedCostCreate(input: {
    currencyCode: "USD"
    destinationCountry: "CA"
    items: [
      {
        sku: "TEST-001"
        amount: 50.00
        quantity: 1
        hsCode: "999999"
      }
    ]
  }) {
    id
    duties {
      amount
      rate
      hsCode
    }
    amountSubtotals {
      total
      duties
    }
  }
}`,
      missingFields: `mutation {
  landedCostCreate(input: {
    currencyCode: "USD"
    destinationCountry: "CA"
    items: [
      {
        sku: "TEST-001"
      }
    ]
  }) {
    id
  }
}`
    };
    setMutation(examples[exampleType]);
  };

  return (
    <div className="mutation-inspector">
      <h2>Landed Cost Mutation Inspector</h2>
      <p>Test landedCostCreate mutations and debug responses in real-time</p>

      <div className="example-buttons">
        <button onClick={() => loadExample('basic')} className="example-btn">Basic Example</button>
        <button onClick={() => loadExample('multiItem')} className="example-btn">Multi-Item</button>
        <button onClick={() => loadExample('invalidHsCode')} className="example-btn">Invalid HS Code</button>
        <button onClick={() => loadExample('missingFields')} className="example-btn">Missing Fields</button>
      </div>

      <div className="mutation-editor">
        <label><strong>GraphQL Mutation:</strong></label>
        <textarea
          value={mutation}
          onChange={(e) => setMutation(e.target.value)}
          rows={20}
          spellCheck="false"
        />
      </div>

      <button onClick={handleExecute} className="execute-btn">Execute Mutation</button>

      {result && (
        <div className={`mutation-result ${result.success ? 'success' : 'error'}`}>
          <h3>{result.success ? '✓ Success' : '✗ Error'}</h3>
          
          {result.success && result.data && (
            <div className="result-display">
              {result.data.landedCostCreate && (
                <>
                  <div className="result-section">
                    <h4>Landed Cost Details</h4>
                    <p><strong>ID:</strong> {result.data.landedCostCreate.id}</p>
                    {result.data.landedCostCreate.landedCostGuaranteeCode && (
                      <p><strong>Guarantee Code:</strong> {result.data.landedCostCreate.landedCostGuaranteeCode}</p>
                    )}
                  </div>

                  {result.data.landedCostCreate.amountSubtotals && (
                    <div className="result-section">
                      <h4>Cost Breakdown</h4>
                      <table className="breakdown-table">
                        <tbody>
                          <tr>
                            <td>Items:</td>
                            <td>${result.data.landedCostCreate.amountSubtotals.items?.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Duties:</td>
                            <td>${result.data.landedCostCreate.amountSubtotals.duties?.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Taxes:</td>
                            <td>${result.data.landedCostCreate.amountSubtotals.taxes?.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Shipping:</td>
                            <td>${result.data.landedCostCreate.amountSubtotals.shipping?.toFixed(2)}</td>
                          </tr>
                          <tr className="total-row">
                            <td><strong>Total:</strong></td>
                            <td><strong>${result.data.landedCostCreate.amountSubtotals.total?.toFixed(2)}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {result.data.landedCostCreate.items && result.data.landedCostCreate.items.length > 0 && (
                    <div className="result-section">
                      <h4>Items ({result.data.landedCostCreate.items.length})</h4>
                      {result.data.landedCostCreate.items.map((item, i) => (
                        <div key={i} className="item-detail">
                          <strong>{item.sku}</strong>: ${item.amount?.toFixed(2)} 
                          {item.hsCode && ` (HS: ${item.hsCode})`}
                        </div>
                      ))}
                    </div>
                  )}

                  {result.data.landedCostCreate.duties && result.data.landedCostCreate.duties.length > 0 && (
                    <div className="result-section">
                      <h4>Duties</h4>
                      {result.data.landedCostCreate.duties.map((duty, i) => (
                        <div key={i} className="duty-detail">
                          HS {duty.hsCode}: ${duty.amount?.toFixed(2)} ({(duty.rate * 100).toFixed(1)}%)
                        </div>
                      ))}
                    </div>
                  )}

                  {result.data.landedCostCreate.taxes && result.data.landedCostCreate.taxes.length > 0 && (
                    <div className="result-section">
                      <h4>Taxes</h4>
                      {result.data.landedCostCreate.taxes.map((tax, i) => (
                        <div key={i} className="tax-detail">
                          <strong>{tax.description}:</strong> ${tax.amount?.toFixed(2)}
                          <br />
                          <small>{tax.formula}</small>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="raw-json">
                    <h4>Raw Response:</h4>
                    <pre>{JSON.stringify(result.data, null, 2)}</pre>
                  </div>
                </>
              )}
            </div>
          )}

          {result.errors && (
            <div className="error-display">
              <h4>Errors:</h4>
              {result.errors.map((error, i) => (
                <div key={i} className="error-item">
                  <strong>{error.message}</strong>
                  {error.locations && (
                    <div className="error-location">
                      Line {error.locations[0].line}, Column {error.locations[0].column}
                    </div>
                  )}
                  {error.path && (
                    <div className="error-path">
                      Path: {error.path.join(' → ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {result.error && (
            <div className="error-display">
              <p>{result.error}</p>
            </div>
          )}
        </div>
      )}

      {debugLogs.length > 0 && (
        <div className="debug-console">
          <h3>Debug Console</h3>
          <div className="debug-logs">
            {debugLogs.map((log, i) => (
              <div key={i} className={`debug-log ${log.type}`}>
                <span className="log-timestamp">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                <span className={`log-type ${log.type}`}>{log.type.toUpperCase()}</span>
                <span className="log-message">{log.message}</span>
                {log.data && (
                  <pre className="log-data">{JSON.stringify(log.data, null, 2)}</pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MutationInspector;