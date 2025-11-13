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
  const validCountries = ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'CN', 'MX'];
  return validCountries.includes(country?.toUpperCase());
};

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});