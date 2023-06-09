import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import Prelaoder from "../components/Prelaoder";

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    router.events.on("routeChangeStart", () => setProgress(50));
    router.events.on("routeChangeComplete", () => setProgress(100));
  },[])
  const [user, loading] = useAuthState(auth);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  if (loading) return <Prelaoder />;
  const signIn = async() => {
    await signInWithPopup(auth, provider);
  }
  const logout = async() => {
    await signOut(auth);
  }

  return (
    <div className="w-full h-screen overflow-hidden selection:bg-[#ffc164c1]">
      <LoadingBar
        height={4}
        color="#ff9900"
        waitingTime={300}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Header user={user} signIn={signIn} logout={logout} />
      <div className="flex w-full overflow-hidden">
          <Sidebar user={user} signIn={signIn} logout={logout} />
          <Component {...pageProps} user={user} />
      </div>
    </div>
  );
}

export default MyApp;
