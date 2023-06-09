import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import SuccessGif from "../public/gifs/success.gif";

const Success = ({user}) => {

  const cartRef = collection(db, `cart`);
  const q = query(cartRef, orderBy("createdAt", "desc"));
  const [cartSnapshots, loading] = useCollection(q);
  useEffect(()=>{
    cartSnapshots?.docs?.filter(item=> item.data().uid === user?.uid)?.forEach(async(item) => {
      await deleteDoc(doc(db, `cart`, item?.id));
    });
  })
  return (
    <div className="absolute w-full h-screen bg-white z-[999] text-center p-5">
      <div className="space-y-3 pt-10">
        <h1 className="text-3xl md:text-4xl font-semibold">✅ Congratulations!</h1>
        <p>Your Order Was Successfull</p>
        <Image
          src={SuccessGif}
          alt=""
          width={500}
          height={500}
          className="w-[300px] mx-auto"
        />
      </div>
    </div>
  );
};

export default Success;
