import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {
  const [txtUsername, setTxtUsername] = useState('');
  const [txtPassword, setTxtPassword] = useState('');
  const [txtName, setTxtName] = useState('');
  const [txtPhone, setTxtPhone] = useState('');
  const [txtEmail, setTxtEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();  // Use navigate from react-router-dom

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!txtUsername || !txtPassword || !txtName || !txtPhone || !txtEmail) {
      setFormError('Please fill in all the fields');
      return;
    }

    const account = {
      username: txtUsername,
      password: txtPassword,
      name: txtName,
      phone: txtPhone,
      email: txtEmail,
    };

    apiSignup(account);
  };

  const apiSignup = (account) => {
    setLoading(true); // Set loading to true when the API call starts
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;

      // Display SweetAlert2 popup to confirm email check
      Swal.fire({
        title: 'Signup Successful!',
        text: 'Your account has been created and a confirmation email with your ID and token has been sent. Do you want to open your email now?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Yes, open my email',
        cancelButtonText: 'No, thanks',
      }).then((response) => {
        if (response.isConfirmed) {
          // Open email provider in a new tab (_blank)
          window.open('https://mail.google.com', '_blank');
        }
        // Redirect to active account page
        navigate('/active');  // Use navigate to redirect
      });

    }).catch((error) => {
      setFormError('An error occurred. Please try again later.');
    }).finally(() => {
      setLoading(false); // Set loading to false when the API call is complete
    });
  };

  return (
    <div className="flex items-center justify-center bg-[#fff] w-[80%] mx-auto py-10">
      <div className="w-full container space-y-2 bg-[#fff]">
        <h2 className="text-xl font-bold text-left text-[#1c1c1c]">SIGN-UP</h2>
        {loading ? ( // Show loading indicator if loading is true
          <div className="text-center py-5">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Signing you up...</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="username" className="block text-sm font-bold text-[#222] mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="txtUsername"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                  value={txtUsername}
                  onChange={(e) => setTxtUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-[#222] mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="txtPassword"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                  value={txtPassword}
                  onChange={(e) => setTxtPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[#222] mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="txtName"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                  value={txtName}
                  onChange={(e) => setTxtName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-[#222] mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="txtPhone"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                  value={txtPhone}
                  onChange={(e) => setTxtPhone(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-bold text-[#222] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="txtEmail"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                  value={txtEmail}
                  onChange={(e) => setTxtEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {formError && <div className="text-red-500">{formError}</div>}

            <div className="flex items-center space-x-5">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-primary hover:bg-primary transition-all duration-300 focus:outline-none focus:shadow-outline"
              >
                SIGN-UP
              </button>
            </div>
            <div className="text-left mt-2 flex flex-col">
              <a href="/login" className="text-[#555555] hover:text-[#333] text-base transition-all duration-300">
                Already have an account? <span className="font-bold">Login</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
