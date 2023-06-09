import Image from 'next/future/image'
import Link from 'next/link'
import React from 'react'

const Card = ({product}) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className='sm:w-[250px] flex flex-col justify-center items-center cursor-pointer hover:scale-90 transition-transform'>
        <div className='bg-white border px-5 rounded-xl shadow-sm overflow-hidden w-[220px] h-[320px] flex justify-center items-center'>
          <Image src={product.image} alt="image" width={200} height={200} priority={true} quality={100} className="" />
        </div>
        <div>
          <h2 className='font-semibold'>{product.name.slice(0, 25)}...</h2>
          <h2 className='font-semibold space-x-4'><span>&#8377;{product.price}</span></h2>
        </div>
    </div>
    </Link>
  )
}

export default Card
