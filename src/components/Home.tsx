import React from 'react';
import Panel from './Panel';
import Navbar from './Navbar';
import PieChart from './PieChart';
import TransactionHistory from './TransactionHistory';
import CurrentMonthExpenses from './CurrentMonthExpenses';

const data = [
  { category: 'Food', amount: 250, date: '2023.02.15' },
  { category: 'Bills', amount: 150, date: '2023.02.15' },
  { category: 'Entertainment', amount: 150, date: '2023.02.15' },
  { category: 'Groceries', amount: 200, date: '2023.02.15' },
  { category: 'Merchandise', amount: 50, date: '2023.02.15' },
  { category: 'Transportation', amount: 75, date: '2023.02.15' },
  { category: 'Pharmacy', amount: 120, date: '2023.02.15' },
  { category: 'Travel', amount: 300, date: '2023.02.15' },
  { category: 'Other', amount: 80, date: '2023.02.15' },
];

const Home: React.FC = () => {
  return (
    <div className='text-gray-300'>
      <Navbar>
        <div className='flex flex-col ml-16 mt-16'>
          <div className='flex flex-row'>
            <CurrentMonthExpenses expenses={data}></CurrentMonthExpenses>
            <PieChart data={data} />
          </div>
          <TransactionHistory></TransactionHistory>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
