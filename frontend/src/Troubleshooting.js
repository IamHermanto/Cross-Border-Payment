import React from 'react';

function Troubleshooting() {
  const issues = [
    {
      category: 'HS Code Classification',
      problem: 'Item Quoter gives wrong HS code',
      rootCause: 'AI classifier misidentified product',
      quickFix: 'Override with correct HS code in your API call',
      example: `items: [{ 
  sku: "YOUR-SKU",
  hsCode: "CORRECT-CODE"  // Override here
}]`
    },
    {
      category: 'Unexpected Fees',
      problem: '$2 fee on tariff-free items',
      rootCause: 'Service fee ≠ duties/taxes',
      quickFix: 'Service fee applies even when duties are $0. Use Calculator tab to see breakdown.',
      example: `Items: $50
Duties: $0 (under threshold)
Service Fee: $2 (processing)
Total: $52`
    },
    {
      category: 'Integration Sync',
      problem: 'Package returned - "doesn\'t meet customs requirements"',
      rootCause: 'Data mismatch between Zonos and carrier',
      quickFix: 'Check country codes (AU not AUS), currency matches destination, complete address',
      example: `destinationCountry: "AU"  // ISO alpha-2
currencyCode: "AUD"       // Match destination
shippingAddress: { ... }  // Complete`
    },
    {
      category: 'Account Access',
      problem: 'Can\'t log in or screen freezes',
      rootCause: 'Session/provisioning issues',
      quickFix: 'Clear cache, try incognito. API works independently of web UI.',
      example: `// Test API access directly:
query { countries { code name } }`
    },
    {
      category: 'Wrong Calculations',
      problem: 'Landed cost doesn\'t match actual charge',
      rootCause: 'Missing data = estimation not guarantee',
      quickFix: 'Provide: HS code, origin country, shipping cost, complete address',
      example: `hsCode: "6109.10"
countryOfOrigin: "CN"
shippingCost: 15.00
shippingAddress: { ... }`
    },
    {
      category: 'Business Email',
      problem: 'Personal email rejected',
      rootCause: 'Validation too strict',
      quickFix: 'Use business domain or contact sales with business docs. API can be provisioned separately.',
      example: `Use: yourname@business.com
Not: yourname@gmail.com`
    }
  ];

  return (
    <div className="troubleshooting-simple">
      <h2>Quick Troubleshooting Guide</h2>
      <p className="subtitle">Common issues from customer reviews and how to fix them</p>

      <div className="issues-grid">
        {issues.map((issue, i) => (
          <div key={i} className="issue-card">
            <div className="issue-category">{issue.category}</div>
            <h3>{issue.problem}</h3>
            
            <div className="issue-row">
              <strong>Why:</strong>
              <span>{issue.rootCause}</span>
            </div>

            <div className="issue-row fix">
              <strong>Fix:</strong>
              <span>{issue.quickFix}</span>
            </div>

            {issue.example && (
              <pre className="code-example">{issue.example}</pre>
            )}
          </div>
        ))}
      </div>

      <div className="tool-reminder">
        <strong>Use this tool to debug:</strong>
        <ul>
          <li><strong>API Inspector:</strong> Test mutations and see actual data sent</li>
          <li><strong>Calculator:</strong> Show cost breakdown to explain fees</li>
          <li><strong>Error Reference:</strong> Match error messages to solutions</li>
        </ul>
      </div>
    </div>
  );
}

export default Troubleshooting;