import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import noPrds from '../../assets/imgs/noProduct.webp';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  console.log('products: ', products);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    apiGetAllProducts();
  }, []);

  useEffect(() => {
    filterProductsByPrice();
  }, [products, priceRange]);

  useEffect(() => {
    sortProducts(sortOption);
  }, [sortOption]);

  const apiGetAllProducts = () => {
    axios.get('/api/customer/all-products')
      .then((res) => {
        const productData = res.data || []; // Fallback to empty array if no data
        setProducts(productData);
        setFilteredProducts(productData);
        setPriceLimits(productData);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]); // Fallback to empty array on error
        setFilteredProducts([]); // Fallback to empty array on error
      });
  };

  const setPriceLimits = (productData) => {
    if (!productData.length) return; // Early return if no products

    const prices = productData.map((product) => product.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    setMinPrice(min);
    setMaxPrice(max);
    setPriceRange([min, max]);
  };

  const filterProductsByPrice = () => {
    const filtered = products.filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1]);
    setFilteredProducts(filtered);
  };

  const onPriceChange = (value, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts];

    if (option === 'priceAsc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === 'priceDesc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === 'nameAsc') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === 'nameDesc') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(sortedProducts);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const paginatedProducts = (filteredProducts || []).slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="mx-auto px-10 xl:px-20 py-20">
      {products.length === 0 ? (
        <div className="flex flex-col justify-center gap-5">
          <div className="text-center">
            <span className="text-4xl font-bold relative z-50 ml-2.5 inline-block before:absolute before:bottom-0 before:opacity-50 before:left-0 before:z-[-1] before:h-3 before:w-full before:bg-[#adfff8]">NO ITEMS</span>
          </div>
          <div className="flex justify-center">
            <img src={noPrds} alt="noProduct" className="w-96 h-80" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex">
            <div className="w-[20%] pr-4">
              <h3 className="font-bold text-lg mb-4">Filter by Price</h3>
              <div className="flex flex-col">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => onPriceChange(e.target.value, 0)}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: '#c89979' }}
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => onPriceChange(e.target.value, 1)}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: '#c89979' }}
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>{priceRange[0].toLocaleString()} VND</span>
                  <span>{priceRange[1].toLocaleString()} VND</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-lg mb-2">Sort by</h3>
                <div className="flex flex-col space-y-2">
                  {['priceAsc', 'priceDesc', 'nameAsc', 'nameDesc'].map((option) => (
                    <label className="w-full text-center" key={option}>
                      <input
                        type="radio"
                        name="sort"
                        value={option}
                        checked={sortOption === option}
                        onChange={handleSortChange}
                        className="hidden peer"
                      />
                      <span className={`w-full cursor-pointer block border border-gray-300 rounded-md p-2 peer-checked:border-[#c89979] peer-checked:text-[#b79178]`}>
                        {option === 'priceAsc'
                          ? 'Price: Low to High'
                          : option === 'priceDesc'
                          ? 'Price: High to Low'
                          : option === 'nameAsc'
                          ? 'Name: A to Z'
                          : 'Name: Z to A'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((item) => (
                <div
                  className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden relative wow fadeInUp"
                  data-wow-delay="0.5s"
                  key={item._id}
                >
                  <div className="overflow-hidden">
                    <img
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="object-cover w-full h-56 hover:scale-110 transition-all duration-300 cursor-pointer"
                      src={'data:image/jpg;base64,' + item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="pb-5 pt-1 text-center">
                    <span className="text-2xl font-bold relative z-50 ml-2.5 inline-block before:absolute before:bottom-0 before:opacity-50 before:left-0 before:z-[-1] before:h-3 before:w-full before:bg-[#adfff8]">
                      {item.name}
                    </span>
                    <div className="flex items-center justify-center text-center">
                      <p className="text-[#c89979] font-medium text-[14.5px] mt-3">{item.price.toLocaleString()} VND</p>
                    </div>
                    <button className="bg-[#c89979] mt-2 text-[12px] font-bold text-white px-4 py-2 hover:bg-[#ab8268] transition-all duration-300">
                      THÊM VÀO GIỎ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Pagination current={currentPage} pageSize={pageSize} total={filteredProducts.length} onChange={handlePaginationChange} />
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
