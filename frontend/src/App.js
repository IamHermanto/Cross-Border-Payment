import React, { useState } from 'react';
import './App.css';
import MutationInspector from './MutationInspector';
import ErrorScenarios from './ErrorScenarios';
import TransactionFlow from './TransactionFlow';
import LandedCostScenarios from './LandedCostScenarios';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="App">
      <h1>Zonos Landed Cost Calculator & API Inspector</h1>
      <p className="subtitle">
        Calculate total delivered costs including duties, taxes, and shipping for cross-border commerce
      </p>

      <div className="tabs-nav">
        <button 
          className={`tab-button ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          Landed Cost Calculator
        </button>
        <button 
          className={`tab-button ${activeTab === 'inspector' ? 'active' : ''}`}
          onClick={() => setActiveTab('inspector')}
        >
          API Inspector
        </button>
        <button 
          className={`tab-button ${activeTab === 'scenarios' ? 'active' : ''}`}
          onClick={() => setActiveTab('scenarios')}
        >
          Common Scenarios
        </button>
        <button 
          className={`tab-button ${activeTab === 'errors' ? 'active' : ''}`}
          onClick={() => setActiveTab('errors')}
        >
          Error Reference
        </button>
      </div>

      {activeTab === 'calculator' && <TransactionFlow />}
      {activeTab === 'inspector' && <MutationInspector />}
      {activeTab === 'scenarios' && <LandedCostScenarios />}
      {activeTab === 'errors' && <ErrorScenarios />}
    </div>
  );
}

export default App;