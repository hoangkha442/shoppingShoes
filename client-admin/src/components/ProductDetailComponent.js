import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';

const ProductDetail = (props) => {
  const context = useContext(MyContext);

  const [categories, setCategories] = useState([]);
  const [txtID, setTxtID] = useState('');
  const [txtName, setTxtName] = useState('');
  const [txtPrice, setTxtPrice] = useState('0'); // Store as a string to display formatted value
  const [cmbCategory, setCmbCategory] = useState('');
  const [imgProduct, setImgProduct] = useState('');
  const [txtDescription, setTxtDescription] = useState('');

  useEffect(() => {
    apiGetCategories();
    if (props.item) {
      setTxtID(props.item._id);
      setTxtName(props.item.name);
      setTxtPrice(props.item.price.toLocaleString()); // Format the price when setting
      setCmbCategory(props.item.category?._id);
      setImgProduct('data:image/jpg;base64,' + props.item.image);
      setTxtDescription(props.item.description || '');
    }
  }, [props.item]);

  const apiGetCategories = () => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      setCategories(res.data);
    });
  };

  const clearAllInputs = () => {
    setTxtID('');
    setTxtName('');
    setTxtPrice('0');
    setCmbCategory(categories.length ? categories[0]._id : '');
    setImgProduct('');
    setTxtDescription('');
  };

  const previewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImgProduct(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    const formattedValue = Number(value).toLocaleString(); // Format the number
    setTxtPrice(formattedValue); // Update the formatted price
  };

  const btnAddClick = (e) => {
    e.preventDefault();
    const price = Number(txtPrice.replace(/,/g, '')); // Convert formatted string to a number
    const prod = {
      name: txtName,
      price: price,
      category: cmbCategory,
      image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''),
      description: txtDescription,
    };
    if (txtID) {
      apiUpdateProduct(prod);
    } else {
      apiPostProduct(prod);
    }
  };

  const apiPostProduct = (prod) => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      if (res.data) {
        Swal.fire({
          title: 'Success',
          text: 'Product Added Successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        props.onSuccess(); 
        clearAllInputs();
      }
    });
  };

  const apiUpdateProduct = (prod) => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.put(`/api/admin/products/${txtID}`, prod, config).then((res) => {
      if (res.data) {
        Swal.fire({
          title: 'Success',
          text: 'Product Updated Successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        props.onSuccess(); 
        clearAllInputs();
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mt-5">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Product Detail</h2>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product ID */}
        <div className="col-span-3">
          <label htmlFor="id" className="block text-gray-500 mb-2">Product ID</label>
          <input
            type="text"
            value={txtID}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            disabled
          />
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-gray-500 mb-2">Product Name</label>
          <input
            type="text"
            value={txtName}
            onChange={(e) => setTxtName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-gray-500 mb-2">Price</label>
          <input
            type="text"
            value={txtPrice}
            onChange={handlePriceChange} // Use custom handler for price input
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-gray-500 mb-2">Category</label>
          <select
            value={cmbCategory}
            onChange={(e) => setCmbCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {categories.map((cate) => (
              <option key={cate._id} value={cate._id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="col-span-3">
          <label htmlFor="description" className="block text-gray-500 mb-2">Description</label>
          <textarea
            value={txtDescription}
            onChange={(e) => setTxtDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Image Upload and Preview */}
        <div className="col-span-3 flex flex-col md:flex-row md:space-x-4 items-center">
          <div className="w-full md:w-1/2">
            <label htmlFor="image" className="block text-gray-500 mb-2">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={previewImage}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="col-span-3">
          {imgProduct && (
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <img
                src={imgProduct}
                alt="Preview"
                className="max-h-48 object-contain border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="col-span-3 flex justify-end space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={btnAddClick}
          >
            {txtID ? 'Update' : 'Add New'}
          </button>
          {txtID && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={(e) => {
                e.preventDefault();
                props.onDelete(txtID);
              }}
            >
              Delete
            </button>
          )}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={(e) => {
              e.preventDefault();
              clearAllInputs();
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
