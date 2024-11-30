import axios from 'axios';
import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert

const Mycart = () => {
  const { mycart, setMycart, customer, token } = useContext(MyContext);
  const navigate = useNavigate();

  // Remove item from cart with SweetAlert confirmation
  const lnkRemoveClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = mycart.filter((item) => item.product._id !== id);
        setMycart(updatedCart);
        Swal.fire('Removed!', 'Your item has been removed.', 'success');
      }
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = mycart.map((item) => {
      if (item.product._id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setMycart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = mycart.map((item) => {
      if (item.product._id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setMycart(updatedCart);
  };

  // Checkout confirmation with SweetAlert
  const lnkCheckoutClick = () => {
    if (mycart.length > 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to proceed with checkout?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, checkout!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          const total = CartUtil.getTotal(mycart);
          if (customer) {
            apiCheckout(total, mycart, customer);
          } else {
            navigate('/myorders');
          }
        }
      });
    } else {
      Swal.fire('Oops...', 'Your cart is empty!', 'warning');
    }
  };

  // API call for checkout
  const apiCheckout = (total, items, customer) => {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        Swal.fire('Success!', 'Your order has been placed successfully!', 'success');
        setMycart([]); // Clear the cart
        navigate('/home');
      } else {
        Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">My Cart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">No.</th>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {mycart.map((item, index) => (
              <tr key={item.product._id} className="border-t border-gray-200">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{item.product._id}</td>
                <td className="py-3 px-4">{item.product.name}</td>
                <td className="py-3 px-4">{item.product.category.name}</td>
                <td className="py-3 px-4">
                  <img
                    src={"data:image/jpg;base64," + item.product.image}
                    className="w-20 h-20 object-cover"
                    alt={item.product.name}
                  />
                </td>
                <td className="py-3 px-4">{item.product.price.toLocaleString()} VND</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <button
                      className="px-2 border border-gray-300 py-1 hover:bg-gray-400"
                      onClick={() => decreaseQuantity(item.product._id)}
                    >
                      -
                    </button>
                    <span className='border border-gray-300 py-1 px-4'>{item.quantity}</span>
                    <button
                      className="px-2 border border-gray-300 py-1 hover:bg-gray-400"
                      onClick={() => increaseQuantity(item.product._id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">{(item.product.price * item.quantity).toLocaleString()} VND</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                    onClick={() => lnkRemoveClick(item.product._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 border-t border-gray-200">
              <td colSpan="6"></td>
              <td className="py-3 px-4 font-bold">Total</td>
              <td className="py-3 px-4 font-bold">{CartUtil.getTotal(mycart).toLocaleString()} VND</td>
              <td>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={lnkCheckoutClick}
                >
                  Checkout
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mycart;
