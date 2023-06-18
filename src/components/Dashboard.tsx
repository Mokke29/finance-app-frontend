import React from 'react';
import Panel from './Panel';
import Navbar from './Navbar';

const Dashboard: React.FC = () => {
  return (
    <div className='text-gray-300'>
      <Navbar>
        <Panel></Panel>
      </Navbar>
    </div>
  );
};

export default Dashboard;
