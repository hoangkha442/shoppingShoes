import React from 'react';
import bgContact from "../../assets/imgs/backgroundContact.jpg"; // Ensure the correct path to your image

export default function Contacts() {
  return (
    <div className="pt-20">
        <div
      className='pt-20 pb-8 relative w-full flex flex-col items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: `url(${bgContact})` }}
    >
      <div className="flex flex-col items-center text-center">

        {/* Heading */}
        <h1 className='text-2xl sm:text-3xl font-medium mb-2 text-[#666666] mt-2 hover:text-gray-800 transition-all'>SIGN UP FOR NIKE EMAIL</h1>

        {/* Subheading */}
        <p className='text-[#999] mb-4 mt-2'>
          Be the first to know about the latest products, exclusives, and offers from Nike.
        </p>

        {/* Sign-up Button */}
        <button className=" text-[#666666] text-sm font-medium uppercase tracking-wider hover:text-gray-800 transition-all">
          SIGN UP
        </button>
      </div>
    </div>
    </div>
  );
}
