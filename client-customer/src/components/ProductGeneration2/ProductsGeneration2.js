import React from 'react'
import bannerGeneration2 from '../../assets/imgs/bannerGeneration2.jpg'
import { useNavigate } from 'react-router-dom'

export default function ProductsGeneration2() {
  const navigate = useNavigate()
  return (
    <section className='text-center pt-[60px]'>
        <h1 className='text-4xl font-bold mb-[.5em]'>AIR VAPORMAX FLYKNIT 2</h1>
        <p className='text-[#999] tracking-wide mb-[1em]'>Our ground-breaking running innovation seven years <br />
        in the making undergoes new evolution.
        </p>
        <div className="flex items-center justify-center gap-8 mb-[2.2em]">
        <button onClick={() => { navigate('/product/category/6288b164708fabf8ab29ca0a') }} className='text-[#000000] leading-[1.6] font-bold'>Shop Men's</button>
        <button onClick={() => { navigate('/product/category/6288b174708fabf8ab29ca0d') }} className='text-[#000000] leading-[1.6] font-bold'>Shop Women's</button>
        </div>
        <div className='cursor-pointer'>
            <img src={bannerGeneration2} alt="bannerGeneration"  className='w-full h-full object-cover'/>
        </div>
    </section>
  )
}
