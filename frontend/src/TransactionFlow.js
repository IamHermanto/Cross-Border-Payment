import React, { useState } from 'react';

function TransactionFlow() {
  const [amount, setAmount] = useState('100');
  const [currency, setCurrency] = useState('USD');
  const [country, setCountry] = useState('CA');
  const [calculation, setCalculation] = useState(null);

  const calculateLandedCost = () => {
    const baseAmount = parseFloat(amount);
    
    const dutyRates = {
      'CA': 0.065,
      'GB': 0.025,
      'AU': 0.05,
      'DE': 0.042,
      'MX': 0.16,
      'CN': 0.075,
      'US': 0.0,
      'JP': 0.0
    };

    const taxRates = {
      'CA': 0.05,
      'GB': 0.20,
      'AU': 0.10,
      'DE': 0.19,
      'MX': 0.16,
      'CN': 0.13,
      'US': 0.0,
      'JP': 0.10
    };

    const exchangeRates = {
      'USD': 1.0,
      'CAD': 1.36,
      'EUR': 0.92,
      'GBP': 0.79,
      'AUD': 1.53,
      'JPY': 149.50,
      'CNY': 7.24,
      'MXN': 17.15
    };

    const duties = baseAmount * (dutyRates[country] || 0);
    const taxes = (baseAmount + duties) * (taxRates[country] || 0);
    const total = baseAmount + duties + taxes;
    const convertedTotal = total * (exchangeRates[currency] || 1);

    setCalculation({
      baseAmount,
      duties,
      taxes,
      total,
      convertedTotal,
      currency,
      dutyRate: (dutyRates[country] || 0) * 100,
      taxRate: (taxRates[country] || 0) * 100,
      steps: [
        { name: 'Product Value', value: baseAmount, status: 'complete' },
        { name: 'Import Duties', value: duties, status: 'complete' },
        { name: 'VAT/GST/Sales Tax', value: taxes, status: 'complete' },
        { name: 'Landed Cost (USD)', value: total, status: 'complete' },
        { name: `Landed Cost (${currency})`, value: convertedTotal, status: 'complete' }
      ]
    });
  };

  return (
    <div className="transaction-flow">
      <h2>Landed Cost Calculator</h2>
      <p>Calculate total cost including import duties and taxes for cross-border transactions</p>

      <div className="flow-inputs">
        <div className="input-group">
          <label>Product Value (USD):</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Destination Country:</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="MX">Mexico</option>
            <option value="CN">China</option>
            <option value="US">United States</option>
            <option value="JP">Japan</option>
          </select>
        </div>

        <div className="input-group">
          <label>Display Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
            <option value="JPY">JPY</option>
            <option value="CNY">CNY</option>
            <option value="MXN">MXN</option>
          </select>
        </div>

        <button onClick={calculateLandedCost}>Calculate Landed Cost</button>
      </div>

      {calculation && (
        <div className="flow-visualization">
          <div className="flow-steps">
            {calculation.steps.map((step, i) => (
              <div key={i} className="flow-step">
                <div className="step-indicator">✓</div>
                <div className="step-content">
                  <h4>{step.name}</h4>
                  <p className="step-value">
                    {step.value.toFixed(2)} {i < 4 ? 'USD' : calculation.currency}
                  </p>
                </div>
                {i < calculation.steps.length - 1 && <div className="step-arrow">↓</div>}
              </div>
            ))}
          </div>

          <div className="breakdown">
            <h3>Cost Breakdown</h3>
            <table>
              <tbody>
                <tr>
                  <td>Product Value:</td>
                  <td>${calculation.baseAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Import Duties ({calculation.dutyRate.toFixed(1)}%):</td>
                  <td>${calculation.duties.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>VAT/GST/Tax ({calculation.taxRate.toFixed(1)}%):</td>
                  <td>${calculation.taxes.toFixed(2)}</td>
                </tr>
                <tr className="total-row">
                  <td><strong>Landed Cost (USD):</strong></td>
                  <td><strong>${calculation.total.toFixed(2)}</strong></td>
                </tr>
                <tr className="total-row">
                  <td><strong>Landed Cost ({calculation.currency}):</strong></td>
                  <td><strong>{calculation.convertedTotal.toFixed(2)} {calculation.currency}</strong></td>
                </tr>
              </tbody>
            </table>
            <p style={{fontSize: '12px', color: '#666', marginTop: '15px'}}>
              * Duty rates are averages and vary by product category. Tax applied on product value + duties.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionFlow;