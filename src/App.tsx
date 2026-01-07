import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionsList from './pages/TransactionsList';
import TransactionDetail from './pages/TransactionDetail';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TransactionsList />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

