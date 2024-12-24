import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import './Forms.css';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout-related operations like clearing user session
    localStorage.removeItem('isLoggedIn'); // Example: clear login status from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    
    <header className="header">
      <h1 className="ac">Accounting System</h1>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/data-entry">Data Entry</Link></li>
          <li><Link to="/transaction-history">Transaction History</Link></li>
          <li><Link to="/report">Report</Link></li>
          <li><Link to="/alert">Alert</Link></li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;
