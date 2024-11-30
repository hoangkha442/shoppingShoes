import React from 'react';
import banner from '../../assets/imgs/banner.jpg';
import { useNavigate } from 'react-router-dom';
import useWowAnimation from '../../hooks/useWowAnimation';

export default function Banner() {
  useWowAnimation()

  const navigate = useNavigate();

  return (
    <section
      className="cursor-pointer wow animated fadeIn"
      data-wow-delay="0.3s"
      onClick={() => {
        navigate('/products');
      }}
    >
      <img
        src={banner}
        alt="banner"
        className="w-full h-full object-cover wow animated fadeInUp"
        data-wow-delay="0.3s"
      />
    </section>
  );
}
