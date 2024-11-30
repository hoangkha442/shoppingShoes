import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import Swal from 'sweetalert2';
import { message } from 'antd';

class Login extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      rememberMe: false,
      emailError: '',
      passwordError: '',
      formError: '',
    };
  }

  validateEmail = (email) => email.length > 0;
  validatePassword = (password) => password.length > 0;

  handleEmailChange = (e) => {
    this.setState({ txtUsername: e.target.value });
    this.setState({
      formError: '',
      emailError: this.validateEmail(e.target.value) ? '' : 'Username cannot be empty.',
    });
  };

  handlePasswordChange = (e) => {
    this.setState({ txtPassword: e.target.value });
    this.setState({
      formError: '',
      passwordError: this.validatePassword(e.target.value) ? '' : 'Password cannot be empty.',
    });
  };

  handleRememberMeChange = (e) => {
    this.setState({ rememberMe: e.target.checked });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword, emailError, passwordError } = this.state;

    if (emailError || passwordError || !txtUsername || !txtPassword) {
      this.setState({ formError: 'Please fill out the required fields below.' });
      return;
    }

    const account = { username: txtUsername, password: txtPassword };
    this.apiLogin(account);
  };

  // API call
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login successful.',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        alert(result.message);
      }
    });
  }

  render() {
    const { txtUsername, txtPassword, rememberMe, emailError, passwordError, formError } = this.state;

    return (
      <div className="flex items-center justify-center bg-[#fff] w-[80%] mx-auto py-10">
        <div className="w-full container space-y-2 bg-[#fff]">
          <h2 className="text-xl font-bold text-left text-[#1c1c1c]">Login</h2>
          <form className="space-y-6" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[#222] mb-2">
                Username or Email Address *
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                value={txtUsername}
                onChange={this.handleEmailChange}
                required
              />
              {emailError && <div className="text-red-500">{emailError}</div>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[#222] mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                value={txtPassword}
                onChange={this.handlePasswordChange}
                required
              />
              {passwordError && <div className="text-red-500">{passwordError}</div>}
            </div>
            {formError && <div className="text-red-500">{formError}</div>}
            <div className="flex items-center space-x-5">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-primary hover:bg-primary transition-all duration-300 focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  checked={rememberMe}
                  onChange={this.handleRememberMeChange}
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>
            <div className="text-left mt-2">
              <a onClick={() => { message.warning('Feature undeveloped!') }} className="text-[#555555] cursor-pointer font-medium hover:text-[#333] text-base transition-all duration-300">
                Forgot password?
              </a>
            </div>
            <div className="text-left">
              <span>Don't have an account? <a href='/signup' className="text-[#555555] cursor-pointer font-medium hover:text-[#333] text-base transition-all duration-300">
                Sign up
              </a></span>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
