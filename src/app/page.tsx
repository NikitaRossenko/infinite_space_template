"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const InfiniteSpace = () => {
  return (
    <div className="w-screen h-screen bg-cover bg-black flex flex-col justify-center items-center gap-4 ">
      <h1 className='text-white text-[40px] z-10 opacity-75'>Infinite Space Template</h1>
      <Link 
        className='bg-slate-200 flex items-center justify-center rounded-md p-2 hover:bg-orange-300 text-[40px] text-[#11597E] z-10 opacity-75'
        href="/infinite-space"
        >
          Infinite Space
      </Link>
      <Image
        src="/bg.jpg" alt=""
        fill={true}
        quality={100}
        className='pointer-events-none'
        style={{
          objectFit: 'cover',
          opacity: 0.6,
        }}
      />
    </div>
  )
}

export default InfiniteSpace