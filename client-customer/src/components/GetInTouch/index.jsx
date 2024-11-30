import React from 'react';
import GetInTouchBg from '../../assets/imgs/getInTouch.jpg';
import { FaTwitter, FaPinterestP, FaGooglePlusG, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
export default function GetInTouch() {
  return (
    <div
      className="relative bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${GetInTouchBg})`,
        backgroundPosition: '26% 58%',
      }}
    >
      <div className="py-16 px-6">
        <div className="bg-[#ffffffd8] p-20">
          <div className="flex gap-20">
            <div className="w-1/2 text-center">
              <h2 className="text-3xl font-medium mb-5 text-gray-800">LIÊN HỆ VỚI CHÚNG TÔI</h2>
              <p className="text-base text-gray-700 mb-5">
                Cửa hàng giày **HBV** tự hào mang đến cho bạn những sản phẩm giày chất lượng và phong cách hiện đại, phù hợp với mọi lứa tuổi.
              </p>
              <p className="text-sm mb-10 text-gray-700">
                Nếu bạn có bất kỳ thắc mắc nào về sản phẩm hoặc cần hỗ trợ, hãy điền thông tin vào form dưới đây để chúng tôi liên hệ lại với bạn sớm nhất.
              </p>
              <div className="flex justify-center gap-3 text-gray-500 mb-10">
                <FaTwitter className="text-base cursor-pointer hover:text-black" />
                <FaEnvelope className="text-base cursor-pointer hover:text-black" />
                <FaPinterestP className="text-base cursor-pointer hover:text-black" />
                <FaGooglePlusG className="text-base cursor-pointer hover:text-black" />
                <FaLinkedinIn className="text-base cursor-pointer hover:text-black" />
              </div>
            </div>

            <div className="w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 text-gray-700">
              <input
                type="text"
                placeholder="Họ và tên"
                className="p-2 w-full border border-gray-300 text-sm rounded-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 w-full border border-gray-300 text-sm rounded-sm"
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="p-2 w-full border border-gray-300 text-sm rounded-sm"
              />
              <input
                type="number"
                placeholder="Số lượng"
                className="p-2 w-full border border-gray-300 text-sm rounded-sm"
              />
            </div>

            <textarea
              placeholder="Lời nhắn"
              className="p-2 w-full border border-gray-300 text-sm rounded-sm mb-5"
              rows="4"
            ></textarea>

           <div className="text-center">
           <button className="bg-black text-white py-2 px-16 font-bold rounded-sm hover:bg-gray-800 transition duration-300">
              Gửi
            </button>
           </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
