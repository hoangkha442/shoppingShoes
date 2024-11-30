import { useEffect } from 'react';
import WOW from 'wow.js';
import 'animate.css';

const useWowAnimation = () => {
  useEffect(() => {
    const wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,     
    });

    wow.init();

    return () => {
      wow.sync();
    };
  }, []);
};

export default useWowAnimation;
