import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import SlideSlick from './SlideSlick';
import Banner from './Banner';
import ProductsGeneration from './ProductsGeneration';
import ProductsGeneration2 from './ProductGeneration2/ProductsGeneration2';
import ProductYoung from './ProductYoung';
import Contacts from './Contacts';
import WOW from 'wow.js';
import 'animate.css';
import Swal from 'sweetalert2'; 
import MyContext from '../contexts/MyContext';

const Home = () => {
  const [newprods, setNewprods] = useState([]);
  const [hotprods, setHotprods] = useState([]);
  const { mycart, setMycart } = useContext(MyContext);
  const [currentPageNew, setCurrentPageNew] = useState(1);
  const [currentPageHot, setCurrentPageHot] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    apiGetNewProducts();
    apiGetHotProducts();

    const wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();
  }, []);

  const apiGetNewProducts = () => {
    axios.get('/api/customer/products/new').then((res) => {
      setNewprods(res.data);
    });
  };

  const apiGetHotProducts = () => {
    axios.get('/api/customer/products/hot').then((res) => {
      setHotprods(res.data);
    });
  };

  const addToCart = (product) => {
    const quantity = 1; 
    const index = mycart.findIndex((item) => item.product._id === product._id);
    if (index === -1) {
      const newItem = { product: product, quantity: quantity };
      setMycart([...mycart, newItem]);
    } else {
      const updatedCart = mycart.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + quantity } : item
      );
      setMycart(updatedCart);
    }

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${product.name} has been added to your cart!`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const paginatedNewProds = newprods.slice((currentPageNew - 1) * pageSize, currentPageNew * pageSize);
  const paginatedHotProds = hotprods.slice((currentPageHot - 1) * pageSize, currentPageHot * pageSize);

  return (
    <div>
      <SlideSlick />
      <Banner />
      <ProductsGeneration />
      <ProductsGeneration2 />
      <ProductYoung />

      <div className="text-center wow fadeInUp" data-wow-delay="0.3s">
        <h1 className="text-4xl font-bold mb-4 tracking-wide">EXPLORE ALL NEW PRODUCTS</h1>
        <p className="text-gray-600 tracking-wide mb-4">
          Retro, new or personally customized, get the Air Max that’s right for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-20">
          {paginatedNewProds.map((item) => (
            <div
              className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden relative wow fadeInUp"
              data-wow-delay="0.5s"
              key={item._id}
            >
              <div className="overflow-hidden">
                <img
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="object-cover w-full h-80 hover:scale-110 transition-all duration-300 cursor-pointer"
                  src={'data:image/jpg;base64,' + item.image}
                  alt={item.name}
                />
              </div>
              <div className="pb-5 pt-1 text-center">
                <span className="text-2xl font-bold inline-block">{item.name}</span>
                <div className="flex items-center justify-center text-center">
                  <p className="text-[#c89979] font-medium text-[14.5px] mt-3">{item.price.toLocaleString()} VND</p>
                </div>
                <button
                  className="bg-[#c89979] mt-2 text-[12px] font-bold text-white px-4 py-2 hover:bg-[#ab8268] transition-all duration-300"
                  onClick={() => addToCart(item)}
                >
                  THÊM VÀO GIỎ
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end pr-20">
          <Pagination
            current={currentPageNew}
            pageSize={pageSize}
            total={newprods.length}
            onChange={(page) => setCurrentPageNew(page)}
            className="mt-5"
          />
        </div>
      </div>

      {hotprods.length > 0 && (
        <div className="text-center mt-10 wow fadeInUp" data-wow-delay="0.3s">
          <h1 className="text-4xl font-bold mb-4 tracking-wide">DISCOVER HOT PRODUCTS</h1>
          <p className="text-gray-600 tracking-wide mb-4">
            Trending, popular or fan favorites, explore the hottest Air Max collections today.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-20">
            {paginatedHotProds.map((item) => (
              <div
                className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden relative wow fadeInUp"
                data-wow-delay="0.5s"
                key={item._id}
              >
                <div className="overflow-hidden">
                  <img
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="object-cover w-full h-80 hover:scale-110 transition-all duration-300 cursor-pointer"
                    src={'data:image/jpg;base64,' + item?.image}
                    alt={item.name}
                  />
                </div>
                <div className="p-5 pt-1 text-center">
                  <span className="text-2xl font-bold inline-block">{item.name}</span>
                  <p className="text-[#c89979] font-medium text-[14.5px] mt-3">{item.price.toLocaleString()} VND</p>
                  <button
                    className="bg-[#c89979] mt-2 text-[12px] font-bold text-white px-4 py-2 hover:bg-[#ab8268] transition-all duration-300"
                    onClick={() => addToCart(item)}
                  >
                    THÊM VÀO GIỎ
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end pr-20">
            <Pagination
              current={currentPageHot}
              pageSize={pageSize}
              total={hotprods.length}
              onChange={(page) => setCurrentPageHot(page)}
              className="mt-5"
            />
          </div>
        </div>
      )}

      <Contacts />
    </div>
  );
};

export default Home;
