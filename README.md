# Cross-Border Payment Debugger

A support engineering tool designed to help debug cross-border payment API integrations. Built to demonstrate technical troubleshooting skills for payment platform support roles.

## Purpose

After researching cross-border payment platforms like Zonos, I identified that support engineers spend significant time debugging API integration issues. This tool simulates the workflow I'd use to help customers troubleshoot payment problems:

1. Parse and validate API requests
2. Identify missing or malformed data
3. Calculate expected costs (duties, taxes, currency conversion)
4. Reference common error scenarios and solutions

## Features

### API Request Inspector
- Real-time JSON validation - Paste customer API requests and instantly identify issues
- Field-level error detection - Highlights missing required fields, invalid formats, and data type mismatches
- Warning system - Flags optional but recommended fields (customer_email, shipping_address)
- Currency and country validation - Ensures ISO standard compliance

### Landed Cost Calculator
- Accurate duty rates - Real average import duty rates by country
- VAT/GST calculation - Proper tax calculation on (product value + duties)
- Multi-currency support - Live currency conversion with 8+ currencies
- Visual transaction flow - Step-by-step breakdown of cost components

### GraphQL API
- Country data queries - Get supported countries with duty rates and currencies
- Currency exchange rates - Query current conversion rates
- Error scenario reference - Common integration errors with example requests and solutions

### Common Error Scenarios
- Pre-built examples of frequent integration issues
- Shows problematic request → expected error → solution path
- Helps support engineers quickly recognize patterns

## Tech Stack

**Backend:**
- Node.js + Express
- GraphQL (express-graphql)
- REST API endpoints

**Frontend:**
- React
- Fetch API for HTTP requests
- Responsive CSS Grid layout

**Why this stack?**
- Matches requirements for payment platform support roles
- GraphQL demonstrates modern API knowledge
- Simple architecture = easy to explain and extend

## Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
node server.js
```
Backend runs on http://localhost:5000
GraphQL playground: http://localhost:5000/graphql

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on http://localhost:3001

## Testing the API Inspector

Try pasting these example requests:

**Valid Request:**
```json
{"amount": 100, "currency": "USD", "destination_country": "CA", "customer_email": "test@example.com"}
```

**Invalid Request (triggers multiple errors):**
```json
{"amount": -50, "currency": "INVALID", "destination_country": "XX"}
```

**Missing Required Fields:**
```json
{"currency": "USD", "destination_country": "CA"}
```

## GraphQL Queries

**Get all supported countries:**
```graphql
{
  countries {
    code
    name
    currency
    dutyRate
  }
}
```

**Get currency exchange rates:**
```graphql
{
  currencies {
    code
    name
    exchangeRate
  }
}
```

**Get common error scenarios:**
```graphql
{
  errorScenarios {
    name
    description
    exampleRequest
    expectedError
    solution
  }
}
```

## What This Demonstrates

**Technical Skills:**
- API design and implementation (REST + GraphQL)
- Request validation and error handling
- JSON parsing and data transformation
- Cross-origin resource sharing (CORS)
- Frontend state management

**Support Engineering Mindset:**
- Customer-first tool design
- Clear error messaging
- Reproducible error scenarios
- Documentation and examples
- Debugging workflow simulation

**Domain Knowledge:**
- Cross-border payment concepts (duties, taxes, landed costs)
- Currency conversion
- International commerce requirements
- API integration patterns

## Built For

This project was specifically designed to showcase skills relevant to Customer Support Engineering roles at cross-border payment platforms. It demonstrates:

- Ability to debug complex API integrations
- Understanding of payment workflows
- Technical communication through UI/documentation
- Problem-solving approach to customer issues
- GraphQL and REST API proficiency

## Future Enhancements

If this were production-ready, I'd add:
- Real-time currency API integration (fixer.io, exchangerate-api)
- Webhook testing and log simulation
- More comprehensive country/product category duty rates
- Request/response logging for debugging sessions
- Export debugging reports as PDF
- Integration with actual payment APIs (Stripe, Zonos)

## About

Built by Ale - Game Developer transitioning to Customer Support Engineering with 2 years of experience building transaction systems at Moximo.

**Why support engineering?** I've discovered I'm most energized when solving technical problems for people, not just building features. Support engineering combines my technical skills with direct customer impact.

---

**Note:** Duty rates and exchange rates in this tool are approximations for demonstration purposes. Production implementations should use official customs databases and real-time exchange rate APIs.

## Live Demo

- **Application:** https://cross-border-payment-one.vercel.app
- **GraphQL Playground:** https://cross-border-payment.onrender.com/graphql
- **Source Code:** https://github.com/IamHermanto/Cross-Border-Payment