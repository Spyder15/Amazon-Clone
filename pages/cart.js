import React, { useEffect } from "react";
import CartGif from "../public/gifs/cart.gif";
import EmptyCartGif from "../public/gifs/emptycart.gif";
import Image from "next/future/image";
import CartCard from "../components/CartCard";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";

const Cart = ({ user }) => {
  const cartRef = collection(db, `cart`);
  const q = query(cartRef, orderBy("createdAt", "desc"));
  const [cartSnapshots, loading] = useCollection(q);
  const [cartSnapshotsData] = useCollectionData(q);
  let subtotal = 0;
  cartSnapshots?.docs
    ?.filter((item) => item.data().uid === user?.uid)
    ?.forEach((item) => {
      subtotal += parseFloat(item?.data()?.price);
    });

  // CREATE CHECKOUT
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const cart = cartSnapshotsData?.filter((item) => item.uid === user?.uid);
  const createCheckout = async () => {
    const stripe = await stripePromise;
    const checkout = await axios.post(`/api/checkout`, {
      uid: user?.uid,
      cart: cart,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkout.data.id,
    });
    if (result.error) return alert(result.error);
  };

  return (
    <div className="w-full  h-[88vh] overflow-y-auto p-5 md:p-[32.5px]">
      <div className="w-full h-[80vh] bg-white shadow-md rounded-xl md:px-10 px-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="xl:text-4xl md:text-2xl text-xs font-bold relative top-2">
              Your Shopping Cart
            </h1>
            <Image
              src={CartGif}
              alt="cart"
              width={500}
              height={500}
              className="w-[80px]"
            />
          </div>
          <div>
            <p className="relative top-2 uppercase font-light tracking-wide md:text-xl text-xs">
              {cartSnapshots?.docs?.filter(
                (item) => item.data().uid === user?.uid
              )?.length > 0 ? (
                <span>
                  {
                    cartSnapshots?.docs?.filter(
                      (item) => item.data().uid === user?.uid
                    )?.length
                  }{" "}
                  Items for &#8377;{subtotal}
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
        {user ? (
          <div className="w-full h-[63vh] space-y-3 overflow-y-auto relative">
            {!loading ?
            cartSnapshots?.docs?.filter(
              (item) => item?.data().uid === user?.uid
            )?.length > 0 ? (
              cartSnapshots?.docs
                ?.filter((item) => item?.data().uid === user?.uid)
                ?.map((item) => <CartCard key={item?.id} item={item} />)
            ) : (
              <div>
                <Image
                  src={EmptyCartGif}
                  alt="empty cart"
                  width={500}
                  height={500}
                  priority={true}
                  className="mx-auto"
                />
              </div>
            ) : <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                  <ImSpinner2 className='inline animate-spin text-5xl md:text-8xl text-[#ff9900]' />
              </div>
            }
          </div>
        ) : (
          <div className="w-full h-[60vh] space-y-3 overflow-y-auto">
            <Image
              src={EmptyCartGif}
              alt="empty cart"
              width={500}
              height={500}
              priority={true}
              className="mx-auto"
            />
          </div>
        )}
        <div className="w-full flex items-center h-[10vh]">
          {cartSnapshots?.docs?.filter((item) => item?.data().uid === user?.uid)
            ?.length > 0 && user ? (
            <button
              className="text-white p-2 w-[100%] text-xl rounded-md uppercase bg-gradient-to-b from-[#ffd900] to-[#ffb300] hover:bg-gradient-to-t"
              onClick={createCheckout}
            >
              Proceed To Pay
            </button>
          ) : (
            <button
              className="text-white p-2 w-[100%] text-xl rounded-md uppercase bg-gradient-to-b from-[#c5c5c5] to-[#4d4d4d]"
              disabled
            >
              Proceed To Pay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
