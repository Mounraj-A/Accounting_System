import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ component }) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? component : null;
}

export default ProtectedRoute;
