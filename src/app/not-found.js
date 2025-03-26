import React from 'react'
import Link from 'next/link'

function Pagenotfound() {
  return (
    <div className='w-[90%] mx-auto'>
      <div className='flex flex-col justify-center items-center my-56 gap-2'>
        <h1 className='text-5xl'>404 PAGE NOT FOUND </h1>
        <p className='text-lg'>The page you are looking for does not exist.</p>
        <Link href='/'><h2 className='custom text-lg relative border-b-2 '>Continue Shopping</h2></Link>
      </div>
    </div>
  )
}

export default Pagenotfound