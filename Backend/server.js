const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Validation helpers
const validateCurrency = (currency) => {
  const validCurrencies = ['USD', 'CAD', 'EUR', 'GBP', 'AUD', 'JPY', 'CNY', 'MXN'];
  return validCurrencies.includes(currency?.toUpperCase());
};

const validateCountry = (country) => {
  const validCountries = ['US', 'CA', 'GB', 'AU', 'DE', 'JP', 'CN', 'MX'];
  return validCountries.includes(country?.toUpperCase());
};

const validateHsCode = (hsCode) => {
  if (!hsCode) return false;
  // HS codes are typically 6-10 digits, may include periods
  const hsPattern = /^\d{4,6}(\.\d{2})?$/;
  return hsPattern.test(hsCode);
};

// Landed Cost validation endpoint
app.post('/api/validate-landed-cost', (req, res) => {
  const { mutation } = req.body;
  
  try {
    const issues = [];
    const warnings = [];
    
    // This is a simplified validation - in production, you'd parse GraphQL properly
    const mutationText = mutation.toLowerCase();
    
    // Check for required fields
    if (!mutationText.includes('currencycode')) {
      issues.push({ 
        field: 'currencyCode', 
        issue: 'Missing required field', 
        severity: 'error',
        line: 'N/A'
      });
    }
    
    if (!mutationText.includes('destinationcountry')) {
      issues.push({ 
        field: 'destinationCountry', 
        issue: 'Missing required field', 
        severity: 'error',
        line: 'N/A'
      });
    }
    
    if (!mutationText.includes('items')) {
      issues.push({ 
        field: 'items', 
        issue: 'Missing required items array', 
        severity: 'error',
        line: 'N/A'
      });
    }
    
    // Check for common issues
    if (!mutationText.includes('hscode')) {
      warnings.push({ 
        field: 'hsCode', 
        issue: 'HS code not specified - may result in incorrect duty calculation', 
        severity: 'warning'
      });
    }
    
    if (!mutationText.includes('shippingcost')) {
      warnings.push({ 
        field: 'shippingCost', 
        issue: 'Shipping cost not included - some countries tax shipping', 
        severity: 'warning'
      });
    }
    
    res.json({
      valid: issues.length === 0,
      issues: issues,
      warnings: warnings
    });
  } catch (error) {
    res.json({
      valid: false,
      issues: [{ field: 'Mutation', issue: 'Invalid GraphQL syntax: ' + error.message, severity: 'error' }],
      warnings: []
    });
  }
});

// Legacy inspect endpoint (keeping for backwards compatibility)
app.post('/api/inspect', (req, res) => {
  const { apiRequest } = req.body;
  
  try {
    const parsed = JSON.parse(apiRequest);
    const issues = [];
    const warnings = [];
    
    if (!parsed.amount) {
      issues.push({ field: 'amount', issue: 'Missing required field', severity: 'error' });
    } else if (typeof parsed.amount !== 'number') {
      issues.push({ field: 'amount', issue: 'Must be a number', severity: 'error' });
    } else if (parsed.amount <= 0) {
      issues.push({ field: 'amount', issue: 'Must be greater than 0', severity: 'error' });
    }
    
    if (!parsed.currency) {
      issues.push({ field: 'currency', issue: 'Missing required field', severity: 'error' });
    } else if (!validateCurrency(parsed.currency)) {
      warnings.push({ field: 'currency', issue: `Currency '${parsed.currency}' not commonly supported`, severity: 'warning' });
    }
    
    if (!parsed.destination_country) {
      issues.push({ field: 'destination_country', issue: 'Missing required field', severity: 'error' });
    } else if (!validateCountry(parsed.destination_country)) {
      warnings.push({ field: 'destination_country', issue: `Country code '${parsed.destination_country}' may not be supported`, severity: 'warning' });
    }
    
    if (!parsed.customer_email) {
      warnings.push({ field: 'customer_email', issue: 'Recommended for transaction tracking', severity: 'warning' });
    }
    
    if (!parsed.shipping_address) {
      warnings.push({ field: 'shipping_address', issue: 'Required for accurate duty calculation', severity: 'warning' });
    }
    
    res.json({
      valid: issues.length === 0,
      issues: issues,
      warnings: warnings,
      parsed: parsed
    });
  } catch (error) {
    res.json({
      valid: false,
      issues: [{ field: 'JSON', issue: 'Invalid JSON format: ' + error.message, severity: 'error' }],
      warnings: [],
      error: error.message
    });
  }
});

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  console.log(`GraphiQL interface available at: http://localhost:${PORT}/graphql`);
});