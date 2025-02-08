import React from 'react'

function Sizechart() {
  document.title="SIZE CHART - Protees.pk"
  return (
    <div className='w-[95%] lg:max-w-[60%] mx-auto'>
        <h1 className='text-5xl text-center font-semibold py-8 mb-7 mt-10'>SIZE CHART</h1>
        <div className='my-5'>
            <h2 className='text-4xl font-semibold py-5'>NOTE:</h2>
            <ul className='list-disc px-7 leading-relaxed mb-20'>
                <li>All sizes are given in inches.</li>
                <li>Chest size is for the front of the t-shirt.</li>
                <li>Chest size is measured from under the arm .</li>
                <li>Shirt lengths are measure from bottom to high point neck.</li>
                <li>Tolerance of half an inch (plus or minus).</li>
            </ul>
            <img src={"/Fullsleeve.webp"} alt='photo' />
            <img src={"/Oversize.webp"} alt='photo'/>
            <img src={"/Puffer.webp"} alt='photo'/>
            <img src={"/Trouser.webp"} alt='photo'/>
            <img src={"/halfsleeve.webp"} alt='photo'/>
            <img src={"/hoodies.webp"} alt='photo'/>
            <img src={"/tanktop.webp"} alt='photo'/>
        </div>
    </div>
  )
}

export default Sizechart