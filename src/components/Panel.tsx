import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FormData {
  amount_spent: number;
  category: string;
  description: string;
  payment_method: string;
  date: string;
}

interface DataItem {
  id: number;
  amount_spent: number;
  description: string;
  category: string;
  day: string;
  payment_method: string;
  posting_date: string;
}

const Panel: React.FC = () => {
  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, '0');
  let currentMonth = String(date.getMonth() + 1).padStart(2, '0');
  let currentYear = date.getFullYear();
  let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

  const [formData, setFormData] = useState<FormData>({
    amount_spent: 0,
    category: '',
    description: '',
    payment_method: '',
    date: currentDate,
  });
  const [todaySum, setTodaySum] = useState<number>();
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

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
      setData(jsonData.data);
      console.log(jsonData.data[0]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Do something with the form data
    console.log(formData);
    sv(
      formData.amount_spent,
      formData.category,
      formData.description,
      formData.payment_method,
      formData.date
    );
    // Reset the form
    setFormData({
      amount_spent: 0,
      category: '',
      description: '',
      payment_method: '',
      date: currentDate,
    });
  };

  function sv(
    amount_spent: number,
    category: String,
    description: String,
    payment_method: string,
    date: string
  ) {
    fetch('http://127.0.0.1:5000/e/add', {
      method: 'POST',
      //mode: 'cors',
      credentials: 'include', // include credentials in the request
      body: JSON.stringify({
        amount_spent: amount_spent,
        category: category,
        description: description,
        payment_method: payment_method,
        date: date,
      }),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log('Gotcha');
        fetchData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function deleteExpense(id: number) {
    fetch('http://127.0.0.1:5000/e/delete', {
      method: 'POST',
      //mode: 'cors',
      credentials: 'include', // include credentials in the request
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log('Delete response');
        fetchData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className='flex justify-center h-screen mt-10 ml-20'>
      <div className='max-w-md w-full p-4'>
        <h2 className='text-lg font-bold mb-4'>Add expense</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4'>
            <label className='flex justify-between'>
              Amount Spent:
              <input
                type='number'
                name='amount_spent'
                value={formData.amount_spent}
                onChange={handleChange}
                className='bg-gray-800 px-2 py-1 rounded-md'
              />
            </label>
            <label className='flex justify-between'>
              Category:
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='bg-gray-800 px-2 py-1 rounded-md'
              >
                <option value=''>Select a category</option>
                <option value='Food'>Food</option>
                <option value='Bills'>Bills</option>
                <option value='Entertainment'>Entertainment</option>
                <option value='Groceries'>Shopping</option>
                <option value='Merchandise'>Other</option>
                <option value='Transportation'>Transportation</option>
                <option value='Pharmacy'>Pharmacy</option>
                <option value='Travel'>Travel</option>
                <option value='Other'>Other</option>
              </select>
            </label>
            <label className='flex justify-between'>
              Description:
              <input
                type='text'
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='bg-gray-800 px-2 py-1 rounded-md'
              />
            </label>
            <label className='flex justify-between'>
              Payment Method:
              <select
                name='payment_method'
                value={formData.payment_method}
                onChange={handleChange}
                className='bg-gray-800 px-2 py-1 rounded-md'
              >
                <option value=''>Select a payment method</option>
                <option value='Cash'>Cash</option>
                <option value='Credit Card'>Credit Card</option>
                <option value='Debit Card'>Debit Card</option>
                <option value='Mobile Payment'>Mobile Payment</option>
              </select>
            </label>
            <label className='flex justify-between'>
              Date:
              <input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                className='bg-gray-800 px-2 py-1 rounded-md'
              />
            </label>
          </div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Panel List</h1>
        <p>{todaySum}</p>
        {data.map((item) => (
          <div key={item.id} className='border p-4 mb-4'>
            <p>{item.category}</p>
            <p>{item.amount_spent}</p>
            <p>{item.day}</p>
            <p>{item.payment_method}</p>
            <p>{item.posting_date}</p>
            <p>{item.description}</p>
            <button
              onClick={() => {
                deleteExpense(item.id);
              }}
              className='border'
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panel;
