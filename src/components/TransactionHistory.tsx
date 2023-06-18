import React, { useEffect, useState } from 'react';

interface DataItem {
  id: number | string;
  amount_spent: number;
  description: string;
  category: string;
  day: string;
  payment_method: string;
  posting_date: string;
}

const TransactionHistory: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [todaySum, setTodaySum] = useState<number>();
  useEffect(() => {
    fetchData();
  }, []);
  const compareFunction = (item: DataItem) => {
    if (
      new Date(item.posting_date).getFullYear() === new Date().getFullYear() &&
      new Date(item.posting_date).getMonth() === new Date().getMonth() &&
      new Date(item.posting_date).getDate() === new Date().getDate()
    ) {
      return 'w-1/5 text-slate-300';
    } else {
      return 'w-1/5 text-slate-400';
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/e/recent', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await response.json();
      const headerObj = {
        id: 'header',
        amount_spent: 'Amount spent',
        description: 'Description',
        category: 'Category',
        day: 'Day',
        payment_method: 'Payment method',
        posting_date: 'Posting date',
      };

      setData(jsonData.data.reverse());

      const responseSum = await fetch('http://127.0.0.1:5000/e/todaysum', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonDataSum = await responseSum.json();
      setTodaySum(jsonDataSum.data);
      console.log(jsonDataSum.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='mt-4'>
      <h1 className='text-2xl font-bold text-slate-300 mb-4'>
        Transaction History
      </h1>
      <div className='border border-slate-400 border-opacity-40'>
        <div className='flex items-center mb-2 ml-4 text-blue-500 text-opacity-70'>
          <span className='w-1/5'>Category</span>
          <span className='w-1/5'>Amount spent</span>
          <span className='w-1/5'>Payment method</span>
          <span className='w-1/5'>Posting date</span>
          <span className='w-1/5'>Description</span>
        </div>
        {data.map((item) => (
          <div key={item.id} className='flex items-center mb-2 ml-4'>
            <span className={compareFunction(item)}>{item.category}</span>
            <span className={compareFunction(item)}>{item.amount_spent}</span>
            <span className={compareFunction(item)}>{item.payment_method}</span>
            <span className={compareFunction(item)}>{item.posting_date}</span>
            <span className={compareFunction(item)}>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
