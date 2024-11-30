import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import MyContext from '../contexts/MyContext';

const Myprofile = () => {
  const { customer, token, setCustomer } = useContext(MyContext);
  const [txtUsername, setTxtUsername] = useState('');
  const [txtPassword, setTxtPassword] = useState('');
  const [txtName, setTxtName] = useState('');
  const [txtPhone, setTxtPhone] = useState('');
  const [txtEmail, setTxtEmail] = useState('');

  useEffect(() => {
    if (customer) {
      setTxtUsername(customer.username);
      setTxtPassword(customer.password);
      setTxtName(customer.name);
      setTxtPhone(customer.phone);
      setTxtEmail(customer.email);
    }
  }, [customer]);

  const btnUpdateClick = (e) => {
    e.preventDefault();
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const updatedCustomer = {
        username: txtUsername,
        password: txtPassword,
        name: txtName,
        phone: txtPhone,
        email: txtEmail,
      };
      apiPutCustomer(customer._id, updatedCustomer);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please input username, password, name, phone, and email',
        confirmButtonText: 'OK',
      });
    }
  };

  const apiPutCustomer = (id, customer) => {
    const config = { headers: { 'x-access-token': token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!',
          confirmButtonText: 'OK',
        });
        setCustomer(result);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Failed to update profile. Please try again later.',
          confirmButtonText: 'OK',
        });
      }
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update profile. Please try again later.',
        confirmButtonText: 'OK',
      });
    });
  };

  if (token === '') {
    return <Navigate replace to='/login' />;
  }

  return (
    <div className="w-[80%] mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300"
            value={txtUsername}
            onChange={(e) => setTxtUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300"
            value={txtPassword}
            onChange={(e) => setTxtPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300"
            value={txtName}
            onChange={(e) => setTxtName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300"
            value={txtPhone}
            onChange={(e) => setTxtPhone(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300"
            value={txtEmail}
            onChange={(e) => setTxtEmail(e.target.value)}
          />
        </div>

        <div className="md:col-span-2 text-center">
          <button
            onClick={btnUpdateClick}
            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            UPDATE PROFILE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Myprofile;
