# Zonos Landed Cost Calculator & API Inspector

A full-stack tool for calculating international shipping costs, including duties, taxes, and fees for cross-border commerce.

## What I Built

Built a complete testing and debugging platform for the Zonos Landed Cost API with real-time calculation visualization and comprehensive error handling.

### Backend (Node.js + GraphQL)
- GraphQL API with express-graphql handling landed cost calculations
- Mock data for 8 countries with VAT rates, currency exchange, and de minimis thresholds
- Product categories with HS codes and duty rate ranges
- Calculation engine that processes items, duties, and taxes based on destination country
- Validation helpers for currency codes, country codes, and HS code formats
- Error scenario database with solutions for common API issues

### Frontend (React)
- **Landed Cost Calculator**: Interactive UI to calculate total delivered costs with duty/tax breakdowns
- **API Inspector**: GraphQL mutation tester with real-time debugging console and example mutations
- **Troubleshooting Guide**: Solutions for common integration issues from actual customer pain points
- **Common Scenarios**: Pre-built examples showing real-world use cases (apparel, electronics, EU multi-item)
- **Error Reference**: Searchable database of error messages with solutions organized by category

### Key Features
- Live mutation execution with formatted results showing items, duties, taxes, and totals
- Debug console that logs each step of the API call process
- Example mutations you can load instantly (basic, multi-item, invalid cases)
- Cost breakdown tables with currency conversion
- Country-specific tax and duty calculations
- HS code validation and product classification
- Support for 8 currencies and 8 destination countries

## Running the Project

Start the backend:
```bash
node server.js
```

Start the frontend:
```bash
npm start
```

Backend runs on port 5000, frontend on port 3000. GraphiQL interface available at http://localhost:5000/graphql

## Stack
- React for UI with tabbed navigation
- Node.js + Express backend
- GraphQL with express-graphql
- Mock data simulating real Zonos API behavior
- No external database - all data stored in memory

## Live Demo

- **Application:** https://cross-border-payment-one.vercel.app
- **GraphQL Playground:** https://cross-border-payment.onrender.com/graphql
- **Source Code:** https://github.com/IamHermanto/Cross-Border-Payment