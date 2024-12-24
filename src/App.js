import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import SignUp from './SignUp';
import DataEntryForm from './DataEntryForm';
import TransactionHistory from './TransactionHistory';
import Report from './Report';
import Alert from './Alert';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import axios from 'axios';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the backend (db.json)
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/transactions');
        setTransactions(response.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    fetchTransactions();
  }, []);

  // Function to add a new transaction
  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            {/* The default route for the login page */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected routes (only accessible after login) */}
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute component={<Dashboard transactions={transactions} />} />} 
            />
            <Route 
              path="/data-entry" 
              element={<ProtectedRoute component={<DataEntryForm onAddTransaction={addTransaction} />} />} 
            />
            <Route 
              path="/transaction-history" 
              element={<ProtectedRoute component={<TransactionHistory />} />} 
            />
            <Route 
              path="/report" 
              element={<ProtectedRoute component={<Report />} />} 
            />
            <Route 
              path="/alert" 
              element={<ProtectedRoute component={<Alert />} />} 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
