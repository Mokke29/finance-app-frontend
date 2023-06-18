import React from 'react';
import { useAuth } from './AuthContext';

const Logout: React.FC = () => {
  const auth = useAuth();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    auth.logout();
  };

  return (
    <button className='text-white hover:text-gray-300' onClick={handleSubmit}>
      Logout
    </button>
  );
};

export default Logout;
