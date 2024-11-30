import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { MdEmail, MdPhone } from 'react-icons/md';
import { Dropdown, Menu, Avatar } from 'antd';
import {  FaShoppingCart } from 'react-icons/fa';

const Inform = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate()
  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/myprofile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/myorders">My Orders</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => context.setToken('')}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
  <div className="flex justify-between items-center px-6 border-b border-gray-200 h-10">
      <li className="flex">
        <ul id="header-contact" className="flex items-center gap-3">
          <li className="">
            <a href="mailto:hbv@cybersecurity.global" className="flex items-center text-accent gap-1">
              <MdEmail size={18} />
              <span className="text-[.8em]">hbv@cybersecurity.global</span>
            </a>
          </li>
          <div className="">
            <div className="h-[15px] w-px bg-gray-300"></div>
          </div>
          <li className="">
            <a href="tel:0313728397" className="flex items-center gap-1 text-accent">
              <MdPhone size={18} />
              <span className="text-[.8em]">0313728397</span>
            </a>
          </li>
        </ul>
      </li>
      <div className="">
        {context.token === '' ?
          <div className='flex items-center gap-2' >
            <span onClick={() => { navigate('/login') }} className='tracking-wide hover:text-secondary transition-all duration-300 font-medium cursor-pointer text-[.8em] text-accent'>Login</span>
            <div className="relative flex items-end">
              <Link to='/mycart' className="flex items-center text-gray-700">
                <FaShoppingCart size={16} className="text-accent" />
                <span className="absolute top-[5px] -right-3 text-[#7f13c4] rounded-full h-5 w-5 flex items-center justify-center text-sm font-semibold">
                  {context.mycart.length}
                </span>
              </Link>
            </div>  
          </div>
          :
          <div className="flex items-center gap-3">
             
          <Dropdown overlay={userMenu} trigger={['click']}>
            <span className="ant-dropdown-link cursor-pointer">
              <Avatar><p className='uppercase'>{context.customer.name.charAt(0)}</p></Avatar>
            </span>
          </Dropdown>
          <div className="relative flex items-end">
              <Link to='/mycart' className="flex items-center text-gray-700">
                <FaShoppingCart size={16} className="text-accent" />
                <span className="absolute top-[5px] -right-3 text-[#7f13c4] rounded-full h-5 w-5 flex items-center justify-center text-sm font-semibold">
                  {context.mycart.length}
                </span>
              </Link>
            </div>  
          </div>
        }
      </div>
    </div>
  );
};

export default Inform;
