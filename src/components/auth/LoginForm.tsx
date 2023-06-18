import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserData } from './UserContext';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const user = useUserData();
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You can perform your login logic here
    loginRequest(username, password);
  };

  const loginRequest = async (username: String, password: String) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'mokke',
          password: '12334',
        }),
        credentials: 'include',
      });

      const data = await response.json();

      // Handle the response
      console.log(data);
      if (data.msg === 'Logged in!') {
        user.setUserInfo(data.username);
        auth.login();
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (error) {
      // Handle the error
      navigate('/');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-sm mx-auto mt-8 bg-gray-900 text-gray-300 rounded-md p-4'
    >
      <div className='mb-4'>
        <label htmlFor='username' className='block mb-2 font-medium'>
          Username:
        </label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={handleUsernameChange}
          className='w-full px-4 py-2 bg-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='password' className='block mb-2 font-medium'>
          Password:
        </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={handlePasswordChange}
          className='w-full px-4 py-2 bg-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
      </div>
      <button
        type='submit'
        className='w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
