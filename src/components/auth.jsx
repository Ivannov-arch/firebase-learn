import React, {useCallback, useState} from 'react'
import { auth, googleProvider, } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth'

export default function AuthComponent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useCallback(() => {console.log(auth?.currentUser?.email)}, [])

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
                console.log(error)
        }
    }
    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password) 
        } catch (error) {
                console.log(error)
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
                console.log(error)
        }
    }
    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
                console.log(error)
        }
    }

  return (
    <div className='p-5 border rounded'>
        <div>
            <input className='border rounded' type="text" placeholder='Email...'  onChange={(e) => setEmail(e.target.value)}/>
            <input className='border rounded' type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
            <button disabled={auth.currentUser} onClick={signIn}>Sign In</button>
            <button disabled={auth.currentUser} onClick={logIn}>Log In</button>
        </div>
        <button disabled={auth.currentUser} onClick={signInWithGoogle}>Sign In with Google</button>
        <button onClick={logOut}>Sign Out</button> <br />
        Email: {auth?.currentUser?.email}
    </div>
  )
}
