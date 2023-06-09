import React, { useEffect, useState } from 'react'
import Image from 'next/future/image'
import { MdDelete } from 'react-icons/md'
import { doc, deleteDoc } from "firebase/firestore";
import { ImSpinner2 } from 'react-icons/im';
import { db } from '../firebase';

const CartCard = ({ item, user }) => {

   const deleteFromCart = async() => {
    await deleteDoc(doc(db, `cart`, item?.id));
   }
  

  return (
    <div>
        <div className='bg-white border rounded-xl shadow-sm flex w-full items-center overflow-hidden relative p-5 space-x-5'>
          <button className='absolute text-3xl right-3 top-3 text-red-600' onClick={deleteFromCart}><MdDelete /></button>
          <Image src={item?.data()?.image} alt="image" width={200} height={200} priority={true} quality={100} className="2xl:w-[200px] w-[100px]" />
          <div>
            <h1 className='md:text-2xl'>{item?.data()?.name?.slice(0, 50)}</h1>
            <p className='md:text-sm text-xs md:block hidden'>{item?.data()?.description?.slice(0, 150)}...</p>
            <span className='md:text-xl xl:text-2xl font-semibold '>&#8377;{item?.data()?.price}</span>
          </div>
        </div>
    </div>
  )
}

export default CartCard
