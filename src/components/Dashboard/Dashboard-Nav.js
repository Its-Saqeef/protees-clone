import Link from 'next/link'
import React from 'react'

function Nav() {
  return (
    <main>
        <nav className='bg-[#c10000] text-white w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[50%] mx-auto my-5 p-3 rounded-md flex gap-3'>
            <Link href={"/dashboard/addproduct"}>Add Product</Link>
            <Link href={"/dashboard/allproducts"}>All Products</Link>
            <Link href={"/dashboard/allorders"}>All Orders</Link>
        </nav>
    </main>
  )
}

export default Nav
