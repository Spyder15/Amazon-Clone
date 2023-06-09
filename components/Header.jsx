import React, { useState } from "react";
import Image from "next/future/image";
import Logo from "../public/images/logo.svg";
import DefaultUser from "../public/images/default.png";
import { AiOutlineSearch } from "react-icons/ai";
import { MdShoppingCart, MdHelpCenter } from "react-icons/md";
import Link from "next/link";
// import { ImLocation } from "react-icons/im";
import { RiBillFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { IoLogoGoogle } from "react-icons/io5";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";



const Header = ({ user, signIn, logout}) => {
  const router =  useRouter();
  const [search, setSearch] = useState("");
  const searchSubmit = (e) => {
    if (search.length > 0) {
      e.preventDefault();
      router.push(`/category/${search.toLocaleLowerCase()}`)
      setSearch("");
    }
  }
  const cartRef = collection(db, `cart`);
  const q = query(cartRef, where('uid', '==', user?.uid || ""));
  const [cartSnapshots, loading] = useCollection(q);

  return (
    <div className="w-full bg-[#fff] md:py-7 md:px-10 px-3 py-4 shadow-sm rounded-b-xl z-[9999] sticky top-0 left-0">
      <div className=" flex items-center justify-between md:space-x-5 space-x-3">
        <div className="flex items-center">
          <Link href={"/"}>
            <button>
              <Image
                src={Logo}
                alt="logo"
                width={100}
                height={100}
                className="md:w-[150px] w-[100px] relative top-2"
                quality={100}
              />
            </button>
          </Link>
        </div>
        <div className="w-full md:block hidden">
          <form onSubmit={searchSubmit} className="w-full flex items-center">
            <input
              type="text"
              className="w-full p-2 border border-gray-200 bg-transparent rounded-l-xl focus:border-[#ff9900] outline-none"
              placeholder="Search Here"
              onChange={(e)=>{setSearch(e.target.value)}}
              value={search}
            />
            <button className="text-2xl bg-[#ff9900] p-[9px] rounded-r-xl">
              <AiOutlineSearch />
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-7">
          <Link href={"/cart"}>
            <button className="md:text-3xl text-xl p-1 bg-[#ff9900] rounded-md relative">
              <span className="absolute text-xs bg-[#000] text-white px-2 py-1 rounded-full -top-3 -right-4">
                {cartSnapshots ? cartSnapshots?.docs?.length : 0 }
              </span>
              <MdShoppingCart />
            </button>
          </Link>
            <button className="relative group">
              <div className=" rounded-full border border-gray-400 md:w-[45px] md:h-[45px] w-[32px] h-[32px] overflow-hidden">
                <Image
                  src={user ? user?.photoURL : DefaultUser}
                  alt="user"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-10 -left-[220px] border shadow-md rounded-md p-5 w-[250px] bg-white hidden xl:group-focus:hidden group-focus:block space-y-4">
                {/* <Link href={"/address"}>
                  <div className="w-full flex space-x-2 items-center uppercase tracking-widest hover:bg-[#ff99003e] transition-colors rounded-xl p-2">
                    <span className="text-2xl"><ImLocation /></span>
                    <span>Your Address</span>
                  </div>
                </Link> */}
                <Link href={"/orders"}>
                  <div className="w-full flex space-x-2 items-center uppercase tracking-widest hover:bg-[#ff99003e] transition-colors rounded-xl p-2">
                    <span className="text-2xl"><RiBillFill /></span>
                    <span>Your Orders</span>
                  </div>
                </Link>
                <Link href={"/help"}>
                  <div className="w-full flex space-x-2 items-center uppercase tracking-widest hover:bg-[#ff99003e] transition-colors rounded-xl p-2">
                    <span className="text-2xl"><MdHelpCenter /></span>
                    <span>Help</span>
                  </div>
                </Link>
                {
                  user ? (
                    <div className="w-full bg-[#000] flex space-x-2 items-center justify-center uppercase tracking-widest text-white transition-colors px-3 py-2 rounded-xl" onClick={logout}>
                      <span className="text-2xl"><FiLogOut /></span>
                      <span>Logout</span>
                    </div>
                  ) : (
                    <div className="w-full bg-[#000] flex space-x-2 items-center justify-center uppercase tracking-widest text-white transition-colors px-3 py-2 rounded-xl" onClick={signIn}>
                      <span className="text-2xl"><IoLogoGoogle /></span>
                      <span>Sign In</span>
                    </div>
                  )
                }
              </div>
            </button>
        </div>
      </div>
      <div className="w-full md:hidden mt-5">
        <form onClick={searchSubmit} className="w-full flex items-center">
          <input
            type="text"
            className="w-full py-1 px-4 border border-gray-200 bg-transparent rounded-l-xl focus:border-[#ff9900] outline-none "
            placeholder="Search Here"
            onChange={(e)=>{setSearch(e.target.value)}}
            value={search}
          />
          <button className="text-xl bg-[#ff9900] p-[7px] rounded-r-xl">
            <AiOutlineSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
