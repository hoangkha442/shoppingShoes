import React, { useEffect } from 'react';
import bannerGeneration from '../../assets/imgs/bannerGeneration.jpg';
import bannerNikeMax from '../../assets/imgs/bannerNikeMax.jpg';
import { useNavigate } from 'react-router-dom';
import WOW from 'wow.js';
import 'animate.css';

export default function ProductsGeneration() {
  const navigate = useNavigate();

  useEffect(() => {
    const wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
    });

    wow.init();
  }, []); // Initialize WOW.js on component mount

  return (
    <section className='pt-[60px] wow animated fadeIn' data-wow-delay="0.3s">
      <div className='py-8 text-center'>
        <h1 className='text-4xl font-bold mb-[.5em] wow animated fadeInUp' data-wow-delay="0.4s">AIR MAX 270</h1>
        <p className='text-[#999] tracking-wide mb-[1em] wow animated fadeInUp' data-wow-delay="0.5s">
          Boasting the biggest heel air bag yet, bringing you
          <br />
          even closer to the feeling of walking on air.
        </p>
        <div className="flex items-center justify-center gap-8 mb-[2.2em] wow animated fadeInUp" data-wow-delay="0.6s">
          <button
            onClick={() => { navigate('/product/category/6288b164708fabf8ab29ca0a') }}
            className='text-[#000000] leading-[1.6] font-bold'
          >
            Shop Men's
          </button>
          <button
            onClick={() => { navigate('/product/category/6288b174708fabf8ab29ca0d') }}
            className='text-[#000000] leading-[1.6] font-bold'
          >
            Shop Women's
          </button>
        </div>
        <div className='cursor-pointer wow animated fadeIn' data-wow-delay="0.7s">
          <img
            src={bannerGeneration}
            alt="bannerGeneration"
            className='w-full h-full object-cover'
          />
        </div>
        <div className='cursor-pointer wow animated fadeInUp' data-wow-delay="0.8s" onClick={() => { navigate('/product/search/nike') }}>
          <img
            src={bannerNikeMax}
            alt="bannerNikeMax"
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </section>
  );
}
