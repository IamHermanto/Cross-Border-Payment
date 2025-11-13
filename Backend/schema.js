const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat, GraphQLSchema, GraphQLInt, GraphQLNonNull, GraphQLInputObjectType } = require('graphql');

// Product Category Type (HS Code categories)
const ProductCategoryType = new GraphQLObjectType({
  name: 'ProductCategory',
  fields: () => ({
    hsCode: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    dutyRateRange: { type: GraphQLString }
  })
});

// Country Type
const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    currency: { type: GraphQLString },
    vatRate: { type: GraphQLFloat },
    deMinimisThreshold: { type: GraphQLFloat },
    requiresEORI: { type: GraphQLString }
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

// Item Type for Landed Cost
const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLString },
    sku: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    hsCode: { type: GraphQLString },
    description: { type: GraphQLString },
    quantity: { type: GraphQLInt }
  })
});

// Tax Type
const TaxType = new GraphQLObjectType({
  name: 'Tax',
  fields: () => ({
    amount: { type: GraphQLFloat },
    formula: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString }
  })
});

// Duty Type
const DutyType = new GraphQLObjectType({
  name: 'Duty',
  fields: () => ({
    amount: { type: GraphQLFloat },
    rate: { type: GraphQLFloat },
    hsCode: { type: GraphQLString }
  })
});

// Amount Subtotals Type
const AmountSubtotalsType = new GraphQLObjectType({
  name: 'AmountSubtotals',
  fields: () => ({
    items: { type: GraphQLFloat },
    duties: { type: GraphQLFloat },
    taxes: { type: GraphQLFloat },
    shipping: { type: GraphQLFloat },
    total: { type: GraphQLFloat }
  })
});

// Landed Cost Type
const LandedCostType = new GraphQLObjectType({
  name: 'LandedCost',
  fields: () => ({
    id: { type: GraphQLString },
    landedCostGuaranteeCode: { type: GraphQLString },
    currencyCode: { type: GraphQLString },
    items: { type: new GraphQLList(ItemType) },
    duties: { type: new GraphQLList(DutyType) },
    taxes: { type: new GraphQLList(TaxType) },
    amountSubtotals: { type: AmountSubtotalsType }
  })
});

// Landed Cost Scenario Type
const LandedCostScenarioType = new GraphQLObjectType({
  name: 'LandedCostScenario',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    exampleMutation: { type: GraphQLString },
    expectedResult: { type: GraphQLString },
    commonIssues: { type: new GraphQLList(GraphQLString) }
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
    solution: { type: GraphQLString },
    category: { type: GraphQLString }
  })
});

// Mock data
const productCategories = [
  { hsCode: '6109.10', description: 'T-shirts, singlets and other vests, of cotton', category: 'Apparel', dutyRateRange: '16.5% - 32%' },
  { hsCode: '8517.12', description: 'Smartphones and cellular phones', category: 'Electronics', dutyRateRange: '0% - 2.5%' },
  { hsCode: '6403.99', description: 'Footwear, outer soles of rubber/plastics', category: 'Footwear', dutyRateRange: '8% - 37.5%' },
  { hsCode: '9503.00', description: 'Toys, scale models and puzzles', category: 'Toys', dutyRateRange: '0% - 6.8%' },
  { hsCode: '3304.99', description: 'Beauty and cosmetic preparations', category: 'Cosmetics', dutyRateRange: '0% - 6.5%' },
  { hsCode: '4202.92', description: 'Travel bags, handbags, backpacks', category: 'Bags/Luggage', dutyRateRange: '17.6% - 20%' }
];

const countries = [
  { code: 'US', name: 'United States', currency: 'USD', vatRate: 0.0, deMinimisThreshold: 800, requiresEORI: 'No' },
  { code: 'CA', name: 'Canada', currency: 'CAD', vatRate: 0.05, deMinimisThreshold: 20, requiresEORI: 'No' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', vatRate: 0.20, deMinimisThreshold: 135, requiresEORI: 'Yes' },
  { code: 'AU', name: 'Australia', currency: 'AUD', vatRate: 0.10, deMinimisThreshold: 1000, requiresEORI: 'No' },
  { code: 'DE', name: 'Germany', currency: 'EUR', vatRate: 0.19, deMinimisThreshold: 150, requiresEORI: 'Yes' },
  { code: 'JP', name: 'Japan', currency: 'JPY', vatRate: 0.10, deMinimisThreshold: 10000, requiresEORI: 'No' },
  { code: 'CN', name: 'China', currency: 'CNY', vatRate: 0.13, deMinimisThreshold: 50, requiresEORI: 'No' },
  { code: 'MX', name: 'Mexico', currency: 'MXN', vatRate: 0.16, deMinimisThreshold: 50, requiresEORI: 'No' }
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

const landedCostScenarios = [
  {
    name: 'Basic Apparel Shipment',
    description: 'Single t-shirt shipment to Canada with standard duties and taxes',
    exampleMutation: `mutation {
  landedCostCreate(input: {
    currencyCode: USD
    destinationCountry: "CA"
    items: [{ 
      sku: "TSHIRT-001", 
      amount: 25.00, 
      quantity: 1,
      hsCode: "6109.10"
    }]
    shippingCost: 10.00
  }) { id amountSubtotals { total } }
}`,
    expectedResult: 'Duties (~16.5%) + GST (5%) calculated on item + shipping',
    commonIssues: ['Missing HS code', 'Incorrect product classification', 'Missing shipping address for accurate tax']
  },
  {
    name: 'Electronics Below De Minimis',
    description: 'Low-value electronics shipment exempt from duties',
    exampleMutation: `mutation {
  landedCostCreate(input: {
    currencyCode: USD
    destinationCountry: "US"
    items: [{ 
      sku: "PHONE-CASE-001", 
      amount: 15.00, 
      quantity: 1,
      hsCode: "8517.12"
    }]
  }) { id amountSubtotals { total duties } }
}`,
    expectedResult: 'No duties (below $800 threshold), no US sales tax at federal level',
    commonIssues: ['State-level taxes not calculated', 'Threshold confusion']
  },
  {
    name: 'Multi-Item EU Shipment',
    description: 'Multiple items to Germany requiring EORI number',
    exampleMutation: `mutation {
  landedCostCreate(input: {
    currencyCode: EUR
    destinationCountry: "DE"
    items: [
      { sku: "BAG-001", amount: 120.00, quantity: 1, hsCode: "4202.92" },
      { sku: "COSMETIC-001", amount: 45.00, quantity: 2, hsCode: "3304.99" }
    ]
    shippingCost: 25.00
    endUse: NOT_FOR_RESALE
  }) { id landedCostGuaranteeCode }
}`,
    expectedResult: 'Different duty rates per item + 19% VAT on total',
    commonIssues: ['Missing EORI number', 'Incorrect endUse value', 'Currency conversion errors']
  }
];

const errorScenarios = [
  {
    name: 'Invalid HS Code',
    description: 'HS code format incorrect or not in database',
    exampleRequest: `mutation {
  landedCostCreate(input: {
    items: [{ sku: "TEST", amount: 50, hsCode: "999999" }]
    destinationCountry: "CA"
  })
}`,
    expectedError: 'HS code "999999" is not valid or not found in tariff database',
    solution: 'Use valid 6-10 digit HS codes. Use Classify API to auto-classify products',
    category: 'Product Classification'
  },
  {
    name: 'Missing Required Item Fields',
    description: 'Item missing critical fields for landed cost calculation',
    exampleRequest: `mutation {
  landedCostCreate(input: {
    items: [{ sku: "TEST" }]
    destinationCountry: "GB"
  })
}`,
    expectedError: 'Missing required field: amount. Missing required field: hsCode',
    solution: 'Include amount, hsCode, and quantity for each item',
    category: 'Data Validation'
  },
  {
    name: 'Unsupported Currency',
    description: 'Currency code not supported in the system',
    exampleRequest: `mutation {
  landedCostCreate(input: {
    currencyCode: XXX
    items: [{ sku: "TEST", amount: 100, hsCode: "6109.10" }]
    destinationCountry: "CA"
  })
}`,
    expectedError: 'Currency code "XXX" is not supported. Use ISO 4217 codes',
    solution: 'Use standard currency codes: USD, EUR, GBP, CAD, etc.',
    category: 'Currency'
  },
  {
    name: 'Restricted Product for Destination',
    description: 'Product cannot be imported to specified country',
    exampleRequest: `mutation {
  landedCostCreate(input: {
    items: [{ sku: "RESTRICTED-001", amount: 200, hsCode: "9306.30" }]
    destinationCountry: "AU"
  })
}`,
    expectedError: 'Product with HS code 9306.30 is restricted for import to AU',
    solution: 'Check country-specific restrictions with Restrict API before attempting landed cost calculation',
    category: 'Compliance'
  },
  {
    name: 'Invalid Destination Country',
    description: 'Country code not recognized or not supported',
    exampleRequest: `mutation {
  landedCostCreate(input: {
    items: [{ sku: "TEST", amount: 50, hsCode: "6109.10" }]
    destinationCountry: "XX"
  })
}`,
    expectedError: 'Country code "XX" is not valid. Use ISO 3166-1 alpha-2 codes',
    solution: 'Use 2-letter country codes (US, CA, GB, etc.)',
    category: 'Geography'
  },
  {
    name: 'Missing Shipping Cost for Taxable Country',
    description: 'Some countries tax shipping costs - missing value causes incorrect calculation',
    exampleRequest: `mutation {
  landedCostCreate(input: {
    items: [{ sku: "TEST", amount: 100, hsCode: "6109.10" }]
    destinationCountry: "CA"
  })
}`,
    expectedError: 'Warning: Shipping cost not provided. Total may be inaccurate as Canada taxes shipping',
    solution: 'Include shippingCost field when destination country taxes shipping',
    category: 'Tax Calculation'
  },
  {
    name: 'EORI Number Required but Missing',
    description: 'EU countries require EORI for customs clearance',
    exampleRequest: `mutation {
  landedCostCreate(input: {
    items: [{ sku: "TEST", amount: 500, hsCode: "6109.10" }]
    destinationCountry: "DE"
  })
}`,
    expectedError: 'EORI number required for shipments to EU countries over €150',
    solution: 'Include EORI number in customer or shipping data for EU destinations',
    category: 'Compliance'
  },
  {
    name: 'De Minimis Threshold Confusion',
    description: 'Calculation doesn\'t account for country-specific thresholds',
    exampleRequest: `mutation {
  landedCostCreate(input: {
    items: [{ sku: "TEST", amount: 25, hsCode: "6109.10" }]
    destinationCountry: "CA"
  })
}`,
    expectedError: 'None - but calculated duties for shipment under CAD $20 threshold',
    solution: 'Verify de minimis thresholds. CA=$20 CAD, US=$800 USD, GB=£135, AU=$1000 AUD',
    category: 'Duties'
  }
];

// Input types for mutations
const ItemInputType = new GraphQLInputObjectType({
  name: 'ItemInput',
  fields: {
    sku: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLFloat) },
    quantity: { type: GraphQLInt },
    hsCode: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});

const LandedCostInputType = new GraphQLInputObjectType({
  name: 'LandedCostInput',
  fields: {
    currencyCode: { type: new GraphQLNonNull(GraphQLString) },
    destinationCountry: { type: new GraphQLNonNull(GraphQLString) },
    items: { type: new GraphQLNonNull(new GraphQLList(ItemInputType)) },
    shippingCost: { type: GraphQLFloat },
    endUse: { type: GraphQLString }
  }
});

// Helper function to calculate landed cost
function calculateLandedCost(input) {
  const { currencyCode, destinationCountry, items, shippingCost = 0, endUse = 'NOT_FOR_RESALE' } = input;
  
  const country = countries.find(c => c.code === destinationCountry);
  if (!country) {
    throw new Error(`Country code "${destinationCountry}" not found`);
  }

  const currency = currencies.find(c => c.code === currencyCode);
  if (!currency) {
    throw new Error(`Currency code "${currencyCode}" not supported`);
  }

  let itemsTotal = 0;
  let dutiesTotal = 0;
  const calculatedDuties = [];
  const calculatedItems = [];

  items.forEach((item, idx) => {
    const itemAmount = item.amount * (item.quantity || 1);
    itemsTotal += itemAmount;

    // Find duty rate based on HS code
    const productCategory = productCategories.find(pc => pc.hsCode === item.hsCode);
    let dutyRate = 0.15; // Default rate if HS code not found
    
    if (productCategory) {
      // Parse duty rate range (e.g., "16.5% - 32%" -> use lower bound)
      const rateMatch = productCategory.dutyRateRange.match(/(\d+\.?\d*)%/);
      if (rateMatch) {
        dutyRate = parseFloat(rateMatch[1]) / 100;
      }
    }

    const dutyAmount = itemAmount * dutyRate;
    dutiesTotal += dutyAmount;

    calculatedDuties.push({
      amount: dutyAmount,
      rate: dutyRate,
      hsCode: item.hsCode || 'UNCLASSIFIED'
    });

    calculatedItems.push({
      id: `item_${idx + 1}`,
      sku: item.sku,
      amount: itemAmount,
      hsCode: item.hsCode,
      description: item.description,
      quantity: item.quantity || 1
    });
  });

  // Calculate taxes (VAT/GST) on items + duties + shipping
  const taxableAmount = itemsTotal + dutiesTotal + shippingCost;
  const taxAmount = taxableAmount * country.vatRate;

  const calculatedTaxes = [{
    amount: taxAmount,
    formula: `${(country.vatRate * 100).toFixed(2)}% of (items + duties + shipping)`,
    description: country.code === 'CA' ? 'GST' : country.code === 'GB' ? 'VAT' : 'Sales Tax',
    type: 'VAT'
  }];

  const total = itemsTotal + dutiesTotal + taxAmount + shippingCost;

  return {
    id: `landed_cost_${Date.now()}`,
    landedCostGuaranteeCode: `LCG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    currencyCode,
    items: calculatedItems,
    duties: calculatedDuties,
    taxes: calculatedTaxes,
    amountSubtotals: {
      items: itemsTotal,
      duties: dutiesTotal,
      taxes: taxAmount,
      shipping: shippingCost,
      total: total
    }
  };
}

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
    productCategories: {
      type: new GraphQLList(ProductCategoryType),
      resolve() {
        return productCategories;
      }
    },
    landedCostScenarios: {
      type: new GraphQLList(LandedCostScenarioType),
      resolve() {
        return landedCostScenarios;
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

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    landedCostCreate: {
      type: LandedCostType,
      args: {
        input: { type: new GraphQLNonNull(LandedCostInputType) }
      },
      resolve(parent, args) {
        return calculateLandedCost(args.input);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});