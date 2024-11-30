import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';
import { FaExclamationCircle } from 'react-icons/fa'; 

const Myorders = () => {
  const { customer, token } = useContext(MyContext);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (customer) {
      apiGetOrdersByCustID(customer._id);
    }
  }, [customer]);

  const apiGetOrdersByCustID = (cid) => {
    const config = { headers: { 'x-access-token': token } };
    axios
      .get('/api/customer/orders/customer/' + cid, config)
      .then((res) => {
        if (res.data.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'No Orders Found',
            text: 'You do not have any orders yet!',
            confirmButtonText: 'OK',
          });
        }
        setOrders(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch orders. Please try again later.',
          confirmButtonText: 'OK',
        });
      });
  };

  const trItemClick = (item) => {
    setOrder(item);

    // Create HTML for order details with improved styling
    const orderDetailsHTML = item.items
      .map(
        (orderItem) => `
        <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee;">
          <img 
            src="data:image/jpg;base64,${orderItem.product.image}" 
            alt="${orderItem.product.name}" 
            style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); margin-right: 15px;" 
          />
          <div style="flex-grow: 1;">
            <p style="font-size: 16px; margin: 0; font-weight: 600;">${orderItem.product.name}</p>
            <p style="font-size: 14px; margin: 5px 0;">Price: <strong>${orderItem.product.price.toLocaleString()} VND</strong></p>
            <p style="font-size: 14px; margin: 5px 0;">Quantity: <strong>${orderItem.quantity}</strong></p>
            <p style="font-size: 14px; margin: 5px 0;">Total: <strong>${(orderItem.product.price * orderItem.quantity).toLocaleString()} VND</strong></p>
          </div>
        </div>
      `
      )
      .join('');

    // Show SweetAlert with enhanced detailed order information
    Swal.fire({
      icon: 'info',
      title: `<h2 style="font-size: 22px; font-weight: 700; margin-bottom: 10px;">Order ID: ${item._id}</h2>`,
      html: `
        <div style="text-align: left; font-size: 15px; line-height: 1.6;">
          <p><strong>Customer Name:</strong> ${item.customer.name}</p>
          <p><strong>Customer Phone:</strong> ${item.customer.phone}</p>
          <p><strong>Order Date:</strong> ${new Date(item.cdate).toLocaleString()}</p>
          <h3 style="margin-top: 15px; font-size: 18px; font-weight: 600;">Order Items:</h3>
          <div style="max-height: 300px; overflow-y: auto; padding-right: 10px;">
            ${orderDetailsHTML}
          </div>
          <hr style="margin: 15px 0;">
          <p style="font-size: 16px; font-weight: 600;">Total Amount: <span style="font-size: 18px; color: #c89979;">${item.total.toLocaleString()} VND</span></p>
        </div>
      `,
      confirmButtonText: 'OK',
      width: '600px',
      padding: '20px',
      background: '#f9f9f9',
      customClass: {
        popup: 'shadow-lg rounded-lg',
        confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded-lg',
      },
    });
  };

  if (token === '') {
    return <Navigate replace to="/login" />;
  }

  const orderList = orders.map((item) => (
    <tr key={item._id} className="border-b">
      <td className="px-4 py-2">{item._id}</td>
      <td className="px-4 py-2">{new Date(item.cdate).toLocaleString()}</td>
      <td className="px-4 py-2">{item.customer.name}</td>
      <td className="px-4 py-2">{item.customer.phone}</td>
      <td className="px-4 py-2">{item.total.toLocaleString()} VND</td>
      <td className="px-4 py-2">{item.status}</td>
      <td className="px-4 py-2 text-center">
        <FaExclamationCircle 
          onClick={() => trItemClick(item)} 
          className="cursor-pointer text-xl text-blue-500 hover:text-blue-700"
        />
      </td>
    </tr>
  ));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Creation Date</th>
              <th className="py-3 px-4 text-left">Customer Name</th>
              <th className="py-3 px-4 text-left">Customer Phone</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>{orderList}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Myorders;
