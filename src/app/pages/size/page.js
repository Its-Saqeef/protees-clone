import React from 'react'
export const metadata={
  title : "SIZE CHART - Protees.pk"
}
function Sizechart() {
 
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
            <img src={"/sizes/Fullsleeve.webp"} alt='photo' />
            <img src={"/sizes/Oversize.webp"} alt='photo'/>
            <img src={"/sizes/Puffer.webp"} alt='photo'/>
            <img src={"/sizes/Trouser.webp"} alt='photo'/>
            <img src={"/sizes/halfsleeve.webp"} alt='photo'/>
            <img src={"/sizes/hoodies.webp"} alt='photo'/>
            <img src={"/sizes/tanktop.webp"} alt='photo'/>
        </div>
    </div>
  )
}

export default Sizechart