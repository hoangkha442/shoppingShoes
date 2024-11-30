import axios from 'axios';
import React, { Component } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: '',
      loading: false, // Initialize loading state
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  btnActiveClick = (e) => {
    e.preventDefault();
    const { txtID, txtToken } = this.state;
    if (txtID && txtToken) {
      this.apiActive(txtID, txtToken);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please input both ID and token to activate your account.',
      });
    }
  };

  apiActive = (id, token) => {
    this.setState({ loading: true }); // Set loading to true before API call
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body)
      .then((res) => {
        const result = res.data;
        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Account Activated!',
            text: 'Your account has been activated successfully. You will now be redirected to the login page to sign in.',
            confirmButtonText: 'OK',
          }).then(() => {
            // Redirect to the login page after the success popup
            window.location.href = '/login';
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Activation Failed',
            text: 'Activation failed, please try again.',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong! Please try again later.',
        });
      })
      .finally(() => {
        this.setState({ loading: false }); // Set loading to false after API call
      });
  };

  render() {
    const { txtID, txtToken, loading } = this.state;

    return (
      <div className="flex items-center justify-center bg-[#fff] w-[80%] mx-auto py-10">
        <div className="w-full container space-y-2 bg-[#fff]">
          <h2 className="text-xl font-bold text-left text-[#1c1c1c]">Activate Account</h2>
          <form className="space-y-6" onSubmit={this.btnActiveClick}>
            <div>
              <label htmlFor="id" className="block text-sm font-bold text-[#222] mb-2">
                ID *
              </label>
              <input
                type="text"
                id="id"
                name="txtID"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                value={txtID}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="token" className="block text-sm font-bold text-[#222] mb-2">
                Token *
              </label>
              <input
                type="text"
                id="token"
                name="txtToken"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                value={txtToken}
                onChange={this.handleInputChange}
                required
              />
            </div>

            {loading && <div className="text-blue-500">Loading...</div>}

            <div className="flex items-center space-x-5">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? 'Activating...' : 'Activate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Active;
