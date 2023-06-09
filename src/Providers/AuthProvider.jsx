import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword ,signInWithPopup,signOut} from "firebase/auth";
import app from "../../firebase.config";

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null)
    const [loading , setLoading] =useState(true)
    const googleProvider = new GoogleAuthProvider()

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const singIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = ()=>{
        return signOut(auth)
    }
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            console.log('current user', currentUser)
            setLoading(false)
            if(currentUser && currentUser.email){
                const logedUser ={
                    email: currentUser.email
                }
                fetch('http://localhost:5000/jwt',{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(logedUser)
                })
                .then(res => res.json())
                .then(data => {
                    console.log('jwt data',data)

                    localStorage.setItem('car-access-token', data.token)
                })
            }
            else{
                localStorage.removeItem('car-access-token')

            }
        })
        return ()=>{
            return unsubscribe()
        }
    },[])
    const googleLogin = ()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const authInfo = {
        user,
        loading,
        createUser,
        singIn,
        googleLogin,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;