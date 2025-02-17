import React from "react"
import  Link  from "next/link";

function Banner() {
    const categoryImages = [
        {   
            id :1,
            category : 'BEYOND CAMO',
            sub_category : 'beyond active',
            image : "/img1.png",
            link : "beyond active"
        },
        {
            id :2,
            category : 'OVERSIZED TEES',
            sub_category : 'oversized_tees',
            image : "img2.png",

        },
        {
            id :3,
            category : 'SUPERHERO TEES',
            sub_category : 'cotton_tees',
            image : "/smoke-superman.png",
            link : "superheroes"
        },
        {
            id :4,
            category : 'SUPERHEROES FULL SLEEVES',
            sub_category : 'graphic_tees',
            image : "/superhero- full.png"
        },
        {
            id :5,
            category : 'BASIC',
            sub_category : 'basic',
            image : "/img5.png",
            link : "basic"
        },
        {
            id :6,
            category : 'SUPER BOTTOMS',
            sub_category : 'yearly',
            image : "/bottom-.png"
        },
        {
            id :7,
            category : 'DESIGNER HOODIES',
            sub_category : 'yearly',
            image : "/designer.png"
        },
        {
            id :8,
            category : 'SWEATSHIRTS',
            sub_category : 'yearly',
            image : "/sweatshirt-.png",
            link : "sweatshirt"
        },
        {
            id :9,
            category : 'SUPER HOODIES',
            sub_category : 'yearly',
            image : "/superhoodie-.png"
        },
        {
            id :10,
            category : 'PUFFER JACKETS',
            sub_category : 'yearly',
            image : "/puffer-.png"
        },
        {
            id :11,
            category : 'DIGITAL GRAPHIC TEES',
            sub_category : 'yearly',
            image : "/digitaltee-.png",
            link : "graphic"
        },
        {
            id :12,
            category : 'FOOTBALL TEES',
            sub_category : 'yearly',
            image : "/football-.png"
        },
    ]
    
    
  return (
    <div>
        <div className="bg-black">
            <img src='/BANNER-1.webp' alt='Banner' className='md:h-[70vh] object-cover w-full ' data-aos="fade-up" data-aos-duration="300"/>
        </div>
        
       <div className="w-[90%] lg:w-[80%] mx-auto">
         <h1 className='font-bold text-2xl lg:text-4xl my-[40px] lg:my-[60px] text-center text-gray-800 tracking-widest'>SHOP BY CATEGORY</h1>
       
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] sm:gap-[40px]">
            {
                categoryImages.map((item)=>{
                   return(
                   <Link href={`/collections/${item.link}`} key={item.id}>
                   <div   className="bg-gray-200 transition ease-out duration-[1.5s] hover:bg-gray-300 relative hover:cursor-pointer " data-aos="fade-up">
                   <img  className="transition ease-out duration-[1s] hover:scale-[105%] "  src={item.image} /> 
                    <p className="absolute top-[50%] w-[90%] border bg-white p-1 ml-[5%] text-center text-sm xl:text-lg">{item.category}</p>
                   </div>
                   </Link>
                   )
                })
            }
            </div>
        </div>
    </div>
  )
}

export default Banner