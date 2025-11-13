const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat, GraphQLSchema } = require('graphql');

// Country Type
const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    currency: { type: GraphQLString },
    dutyRate: { type: GraphQLFloat }
  })
});

// Currency Type
const CurrencyType = new GraphQLObjectType({
  name: 'Currency',
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    exchangeRate: { type: GraphQLFloat }
  })
});

// Error Scenario Type
const ErrorScenarioType = new GraphQLObjectType({
  name: 'ErrorScenario',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    exampleRequest: { type: GraphQLString },
    expectedError: { type: GraphQLString },
    solution: { type: GraphQLString }
  })
});

// Mock data
const countries = [
  { code: 'US', name: 'United States', currency: 'USD', dutyRate: 0.0 },
  { code: 'CA', name: 'Canada', currency: 'CAD', dutyRate: 0.18 },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', dutyRate: 0.20 },
  { code: 'AU', name: 'Australia', currency: 'AUD', dutyRate: 0.05 },
  { code: 'DE', name: 'Germany', currency: 'EUR', dutyRate: 0.19 },
  { code: 'JP', name: 'Japan', currency: 'JPY', dutyRate: 0.0 },
  { code: 'CN', name: 'China', currency: 'CNY', dutyRate: 0.13 },
  { code: 'MX', name: 'Mexico', currency: 'MXN', dutyRate: 0.16 }
];

const currencies = [
  { code: 'USD', name: 'US Dollar', exchangeRate: 1.0 },
  { code: 'CAD', name: 'Canadian Dollar', exchangeRate: 1.36 },
  { code: 'EUR', name: 'Euro', exchangeRate: 0.92 },
  { code: 'GBP', name: 'British Pound', exchangeRate: 0.79 },
  { code: 'AUD', name: 'Australian Dollar', exchangeRate: 1.53 },
  { code: 'JPY', name: 'Japanese Yen', exchangeRate: 149.50 },
  { code: 'CNY', name: 'Chinese Yuan', exchangeRate: 7.24 },
  { code: 'MXN', name: 'Mexican Peso', exchangeRate: 17.15 }
];

const errorScenarios = [
  {
    name: 'Invalid Currency',
    description: 'Currency code not supported',
    exampleRequest: '{"amount": 100, "currency": "INVALID", "destination_country": "CA"}',
    expectedError: 'Currency \'INVALID\' not commonly supported',
    solution: 'Use ISO 4217 currency codes (USD, EUR, GBP, etc.)'
  },
  {
    name: 'Missing Amount',
    description: 'Payment amount not provided',
    exampleRequest: '{"currency": "USD", "destination_country": "CA"}',
    expectedError: 'Missing required field: amount',
    solution: 'Include amount field as a positive number'
  },
  {
    name: 'Negative Amount',
    description: 'Payment amount is negative',
    exampleRequest: '{"amount": -50, "currency": "USD", "destination_country": "CA"}',
    expectedError: 'Amount must be greater than 0',
    solution: 'Ensure amount is a positive number'
  },
  {
    name: 'Invalid Country Code',
    description: 'Destination country not supported',
    exampleRequest: '{"amount": 100, "currency": "USD", "destination_country": "XX"}',
    expectedError: 'Country code \'XX\' may not be supported',
    solution: 'Use ISO 3166-1 alpha-2 country codes'
  }
];

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    countries: {
      type: new GraphQLList(CountryType),
      resolve() {
        return countries;
      }
    },
    country: {
      type: CountryType,
      args: { code: { type: GraphQLString } },
      resolve(parent, args) {
        return countries.find(c => c.code === args.code);
      }
    },
    currencies: {
      type: new GraphQLList(CurrencyType),
      resolve() {
        return currencies;
      }
    },
    currency: {
      type: CurrencyType,
      args: { code: { type: GraphQLString } },
      resolve(parent, args) {
        return currencies.find(c => c.code === args.code);
      }
    },
    errorScenarios: {
      type: new GraphQLList(ErrorScenarioType),
      resolve() {
        return errorScenarios;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});