import React from 'react';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons'; // Import Ant Design icons

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="w-[70%] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold mb-3">FIND A STORE</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Sign Up for Email</a></li>
              <li><a href="#" className="hover:underline">Become a Member</a></li>
              <li><a href="#" className="hover:underline">Site Feedback</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold mb-3">GET HELP</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline text-xs text-[#666666] font-medium hover:text-gray-400 transition-all">Order Status</a></li>
              <li><a href="#" className="hover:underline text-xs text-[#666666] font-medium hover:text-gray-400 transition-all">Delivery</a></li>
              <li><a href="#" className="hover:underline text-xs text-[#666666] font-medium hover:text-gray-400 transition-all">Returns</a></li>
              <li><a href="#" className="hover:underline text-xs text-[#666666] font-medium hover:text-gray-400 transition-all">Payment Options</a></li>
              <li><a href="#" className="hover:underline text-xs text-[#666666] font-medium hover:text-gray-400 transition-all">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-3">ABOUT MONA</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline text-xs text-[#666666] font-medium hover:text-gray-400 transition-all">News</a></li>
              <li><a href="#" className="hover:underline text-xs text-[#666666] font-medium hover:text-gray-400 transition-all">Careers</a></li>
              <li><a href="#" className="hover:underline text-xs text-[#666666] font-medium hover:text-gray-400 transition-all">Investors</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="flex space-x-4 justify-center lg:justify-start">
            <a href="#" className="hover:text-gray-400 text-[#666666] transition-all">
              <FacebookOutlined className="text-2xl" />
            </a>
            <a href="#" className="hover:text-gray-400 text-[#666666] transition-all">
              <InstagramOutlined className="text-2xl" /> 
            </a>
            <a href="#" className="hover:text-gray-400 text-[#666666] transition-all">
              <TwitterOutlined className="text-2xl" /> 
            </a>
            <a href="#" className="hover:text-gray-400 text-[#666666] transition-all">
              <YoutubeOutlined className="text-2xl" /> 
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>&copy; All rights reserved. <span className="text-2xl font-bold relative z-50 ml-2.5 inline-block before:absolute before:bottom-0 before:opacity-50 before:left-0 before:z-[-1] before:h-3 before:w-full before:bg-[#adfff8]">HBV</span></p>
        </div>
      </div>
    </footer>
  );
}
