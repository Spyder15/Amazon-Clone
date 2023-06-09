import React from "react";
import Image from "next/future/image";
import { AiFillStar } from "react-icons/ai";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../../firebase";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";


export async function getServerSideProps(context) {
  const id = context.query.id;
  const product = await fetch(
    `https://www.screentechnicals.com/api/ecommerce/products/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  const data = await product.json();

  return {
    props: {
      data,
    },
  };
}

const Id = ({ data, user }) => {
  let rating = data[0]?.ratings;
  let stars = [];
  if (rating >= 4.5 && rating <= 5) {
    rating = parseInt(rating);
    for (let index = 0; index <= parseInt(rating); index++) {
      stars.push(<AiFillStar />);
    }
  } else if (rating >= 4 && rating < 4.5) {
    rating = parseInt(rating) - 1;
    for (let index = 0; index <= parseInt(rating); index++) {
      stars.push(<AiFillStar />);
    }
  } else if (rating >= 3.5 && rating <= 4) {
    rating = parseInt(rating);
    for (let index = 0; index <= parseInt(rating); index++) {
      stars.push(<AiFillStar />);
    }
  } else if (rating >= 3 && rating <= 3.5) {
    rating = parseInt(rating) - 1;
    for (let index = 0; index <= parseInt(rating); index++) {
      stars.push(<AiFillStar />);
    }
  } else if (rating >= 2.5 && rating <= 3) {
    rating = parseInt(rating);
    for (let index = 0; index <= parseInt(rating); index++) {
      stars.push(<AiFillStar />);
    }
  } else if (rating >= 2 && rating <= 2.5) {
    rating = parseInt(rating) - 1;
    for (let index = 0; index <= parseInt(rating); index++) {
      stars.push(<AiFillStar />);
    }
  } else if (rating >= 1.5 && rating <= 2) {
    rating = parseInt(rating);
    for (let index = 0; index <= parseInt(rating); index++) {
      stars.push(<AiFillStar />);
    }
  } else if (rating >= 1 && rating <= 1.5) {
    rating = parseInt(rating) - 1;
    for (let index = 0; index <= parseInt(rating); index++) {
      stars.push(<AiFillStar />);
    }
  }
  const addToCart = async () => {
    if (user) {
      const docRef = await addDoc(collection(db, `cart`), {
        id: data[0]?.id,
        uid: user?.uid,
        name: data[0]?.name,
        price: data[0]?.price,
        description: data[0]?.description,
        image: data[0]?.image,
        createdAt: serverTimestamp()
      });
    }else {
      alert("Please Sign In!")
    }
  }
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const createCheckout = async () => {
    if (user) {
      const stripe = await stripePromise;
    const checkout = await axios.post(`/api/checkout`, {
      uid: user?.uid,
      cart: data,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkout.data.id,
    });
    if (result.error) return alert(result.error);
    } else {
      alert("Please Sign In!")
    }
  };

  return (
    <div className="w-full h-[88vh] overflow-y-auto md:py-0 py-10">
      <div className="flex md:flex-row justify-center text-left flex-col">
        <div className="w-[40%] max-h-[70%] mx-auto md:px-5 overflow-hidden flex items-center justify-center object-cover md:border rounded-xl md:shadow-md md:mt-5 md:ml-10">
          <Image
            src={data[0]?.image}
            alt="image"
            width={500}
            height={500}
            priority={true}
            quality={100}
            className="w-full"
          />
        </div>
        <div className="md:pt-20 p-5 w-[100%]">
          <p className="uppercase text-[#ff9900] font-light tracking-widest">
            {data[0]?.brand}
          </p>
          <h1 className="md:text-2xl xl:text-3xl text-xl font-bold">
            {data[0]?.name}
          </h1>
          <p className="md:text-xl texl-sm py-2">{data[0]?.description}</p>
          <div className="flex items-center flex-wrap space-x-3 md:justify-start justify-center">
            <span className="md:text-xl xl:text-2xl font-semibold ">
              &#8377;{data[0]?.price}
            </span>
            <span className="text-2xl flex items-center text-[#ffbf00]">
              {stars.map((star) => {
                return <span key={stars.indexOf(star)}>{star}</span>;
              })}
            </span>
          </div>
          <div className="md:space-x-5 mt-5">
            <button className="px-4 py-2 bg-gradient-to-b from-[#ffd900] to-[#ffb300] hover:bg-gradient-to-t transition-all rounded-md text-white md:w-auto w-full md:mb-0 mb-5" onClick={createCheckout}>
              Buy Now
            </button>
            <button className="px-4 py-2 bg-gradient-to-b from-[#ffd900] to-[#ffb300] hover:bg-gradient-to-t transition-all rounded-md text-white md:w-auto w-full " onClick={addToCart}>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Id;
