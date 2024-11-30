import React, { Component } from 'react';
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import Footer from './Footer';
import AllProducts from './AllProducts';
import GetInTouch from './GetInTouch';
import ScrollToTop from './ScrollToTop';
import BackToTop from './BackToTop';
import { Desktop, Tablet } from '../responsive/responsive';
import IsTablet from './IsTablet/Index';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: true,
      lastScrollY: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
    } else if (currentScrollY > this.state.lastScrollY && currentScrollY > 50) {
      this.setState({ showHeader: false });
    } else if (currentScrollY < this.state.lastScrollY && currentScrollY > 50) {
      this.setState({ showHeader: true });
    }

    this.setState({ lastScrollY: currentScrollY });
  };

  render() {
    const { showHeader } = this.state;

    return (
      <div>
        <Desktop>
          <ScrollToTop />
          <div className={`sticky-header ${showHeader ? 'visible' : 'hidden'} transition-all duration-300`}>
            <Inform />
            <Menu />
          </div>
          <div className="mt-[110px]">
            <Routes>
              <Route path='/' element={<Navigate replace to='/home' />} />
              <Route path='/home' element={<Home />} />
              <Route path='/product/category/:cid' element={<Product />} />
              <Route path='/products' element={<Product />} />
              <Route path='/all-products' element={<AllProducts />} />
              <Route path='/get-in-touch' element={<GetInTouch />} />
              <Route path='/product/search/:keyword' element={<Product />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/active' element={<Active />} />
              <Route path='/login' element={<Login />} />
              <Route path='/myprofile' element={<Myprofile />} />
              <Route path='/mycart' element={<Mycart />} />
              <Route path='/myorders' element={<Myorders />} />
            </Routes>
          </div>
          <BackToTop />
          <Footer />
        </Desktop>
        <Tablet>
          <IsTablet />
        </Tablet>
      </div>
    );
  }
}

export default Main;
