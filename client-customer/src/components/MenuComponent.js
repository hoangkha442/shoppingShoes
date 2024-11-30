import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/imgs/logo.jpg';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [txtKeyword, setTxtKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();  // Get current location

  useEffect(() => {
    apiGetCategories();
  }, []);

  const apiGetCategories = () => {
    axios.get('/api/customer/categories').then((res) => {
      setCategories(res.data);
    });
  };

  const btnSearchClick = (e) => {
    e.preventDefault();
    if (!txtKeyword) {
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi',
        text: 'Vui lòng nhập tên sản phẩm cần tìm',
        confirmButtonColor: '#21499a'
      });
      return;
    }
    navigate('/product/search/' + txtKeyword);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-[70px] flex items-center justify-between overflow-hidden border-b pr-5">
      <div className="cursor-pointer flex items-center" onClick={() => { navigate('/home'); }}>
        <img src={logo} alt="logo" className="w-24 h-24  object-cover" />
        <span className="text-2xl font-bold relative z-50 inline-block before:absolute before:bottom-0 before:opacity-50 before:left-0 before:z-[-1] before:h-3 before:w-full before:bg-[#adfff8]">.store</span>
      </div>
      <div className="text-[#111111] text-[.9em] tracking-[.02em] font-semibold">
        <ul className='flex items-center gap-8'>
          {categories.map((item) => (
            <Link 
              to={'/product/category/' + item._id} 
              key={item._id} 
              className={`mt-1 pt-6 pb-5 border-b-4 px-2 hover:border-gray-800 transition-all duration-300 ${isActive('/product/category/' + item._id) ? 'border-gray-800' : 'border-white'}`}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/all-products" 
            className={`mt-1 pt-6 pb-5 border-b-4 hover:border-gray-800 px-2 transition-all duration-300 ${isActive('/all-products') ? 'border-gray-800' : 'border-white'}`}
          >
            STORE
          </Link>
          <Link 
            to="/get-in-touch" 
            className={`mt-1 pt-6 pb-5 border-b-4 hover:border-gray-800 px-2 transition-all duration-300 ${isActive('/get-in-touch') ? 'border-gray-800' : 'border-white'}`}
          >
            CONTACT-US
          </Link>
        </ul>
      </div>
      <div className="flex justify-center justify-items-center">
        <form className="relative w-full" onSubmit={btnSearchClick}>
          <input
            type="search"
            className="w-full border-2 border-gray-300 rounded py-3 pl-4 pr-10 focus:outline-none focus:border-gray-300 text-accent text-xs placeholder:text-[13px]"
            placeholder="Search"
            value={txtKeyword}
            onChange={(e) => setTxtKeyword(e.target.value)}
          />
          <button type="submit" className="absolute right-0 top-1 mt-2 mr-3 text-gray-400">
            <FaSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Menu;
