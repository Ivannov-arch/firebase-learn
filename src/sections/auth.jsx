import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(auth.currentUser); // ⬅️ Tambahkan state untuk user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // ⬅️ Update state saat user login/logout
    });
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 border rounded">
      <div className="gap-5 grid sm:grid-cols-1 lg:grid-cols-2">
        {!user ? ( // ⬅️ Gunakan state user untuk kondisi UI
          <>
            <input
              className="py-2 border rounded text-center"
              type="text"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="py-2 border rounded text-center"
              type="password"
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={signIn}
            >
              Sign In
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={logIn}
            >
              Log In
            </button>
            <button className="bg-gray-500 border" onClick={signInWithGoogle}>
              Sign In with Google{" "}
              <img
                className="inline"
                width="24"
                height="24"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
              />
            </button>
          </>
        ) : (
          <button
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white"
            onClick={logOut}
          >
            Sign Out
          </button>
        )}
      </div>
      <br />
      Email: {user ? user.email : "No user logged in"}
    </div>
  );
}
