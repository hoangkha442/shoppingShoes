import React from 'react'
import bannerYoung from '../../assets/imgs/bannerYoung.jpg'
import { useNavigate } from 'react-router-dom'
export default function ProductYoung() {
  const navigate = useNavigate()
  return (
    <section className='text-center'>
        <h1 className='text-4xl font-bold mb-[.5em]'>AIR MAX FOR YOUNG ATHLETES</h1>
        <p className='text-[#999] tracking-wide mb-[1em]'>The Air Max styles kids love—from the ’87 original, Air Max 1, to the new larger-than-life Air Max 270.
        </p>
        <div className="flex items-center justify-center gap-8 mb-[2.2em]">
        <button onClick={() => { navigate('/product/category/6288b164708fabf8ab29ca0a') }} className='text-[#000000] leading-[1.6] font-bold'>Shop All Girls</button>
        <button onClick={() => { navigate('/product/category/6288b174708fabf8ab29ca0d') }} className='text-[#000000] leading-[1.6] font-bold'>Shop All Boys</button>
        </div>
        <div className='cursor-pointer'>
            <img src={bannerYoung} alt="bannerGeneration"  className='w-full h-full object-cover'/>
        </div>
    </section>
  )
}
