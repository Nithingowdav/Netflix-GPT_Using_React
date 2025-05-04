// // rafce - React Arrow Function Component Export
// import React from 'react'
// import Header from './Header'

// const Login = () => {
//   return (
//     <div className="relative min-h-screen w-full">
//       {/* Header */}
//       <Header />

//       {/* Background Image */}
//       <img
//         className="absolute h-full w-full object-cover -z-20"
//         src="https://genotipia.com/wp-content/uploads/2020/04/Netflix-Background-prueba-1.jpg"
//         alt="netflix background"
//       />

//       {/* Black overlay over the background image */}
//       <div className="absolute h-full w-full bg-black/60 -z-10"></div>

//       {/* Centered Form */}
//       <div className="flex justify-center items-center min-h-screen z-10">
//         <form className="w-full max-w-md bg-black opacity-80 p-10 rounded-md text-white backdrop-blur-md">
//           <h1 className="text-3xl font-bold mb-6">Sign In</h1>

//           <input
//             type="text"
//             placeholder="Email or phone number"
//             className="w-full p-3 mb-4 bg-gray-700/80 text-white rounded"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 mb-6 bg-gray-700/80 text-white rounded"
//           />

//           <button className="w-full bg-red-700 hover:bg-red-600 text-white py-3 rounded font-semibold">
//             Sign In
//           </button>

//           <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
//             <label>
//               <input type="checkbox" className="mr-1" /> Remember me
//             </label>
//             <p className="hover:underline cursor-pointer">Need help?</p>
//           </div>

//           <div className="mt-6 text-sm text-gray-400">
//             New to Netflix?{' '}
//             <span className="text-white hover:underline cursor-pointer">
//               Sign up now.
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login

import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidaDate } from '../utilis/validation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utilis/firebase';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign In and Sign Up
  const [error, setError] = useState('');
  

 const email = useRef(null);
 const password = useRef(null);
  const handleButtonClick = () => {
    //check valid data

console.log(email.current.value);
console.log(password.current.value)

const message = checkValidaDate(email.current.value, password.current.value);
setError(message)

if(message) return ;
  //sign in or sign up
  if(!isSignIn){
    //sign up logic 
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => { 
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorCode + "" + errorMessage);
  });
  } else {
    //sign in page
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorCode + "" + errorMessage);
  });
  }

  }
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Background Image */}
      <img
        className="absolute h-full w-full object-cover -z-20"
        src="https://genotipia.com/wp-content/uploads/2020/04/Netflix-Background-prueba-1.jpg"
        alt="netflix background"
      />

      {/* Black overlay */}
      <div className="absolute h-full w-full bg-black/60 -z-10"></div>

      {/* Centered Form */}
      <div className="flex justify-center items-center min-h-screen z-10">
        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md bg-black/60 p-10 rounded-md text-white backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-6">{isSignIn ? 'Sign In' : 'Sign Up'}</h1>

          {!isSignIn && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-4 bg-gray-700/80 text-white rounded"
            />
          )}

          <input
          ref={email}
            type="text"
            placeholder="Email or phone number"
            className="w-full p-3 mb-4 bg-gray-700/80 text-white rounded"
          />

          <input
          ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 bg-gray-700/80 text-white rounded"
          />
          <p className='text-red-500 mb-3'>{error}</p>

          <button className="w-full bg-red-700 hover:bg-red-600 text-white py-3 rounded font-semibold"
          onClick={handleButtonClick}>
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>

          {isSignIn && (
            <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
              <label>
                <input type="checkbox" className="mr-1" /> Remember me
              </label>
              <p className="hover:underline cursor-pointer">Need help?</p>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-400 text-center">
            {isSignIn ? (
              <>
                New to Netflix?{' '}
                <span onClick={toggleForm} className="text-white hover:underline cursor-pointer">
                  Sign up now.
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span onClick={toggleForm} className="text-white hover:underline cursor-pointer">
                  Sign in.
                </span>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
