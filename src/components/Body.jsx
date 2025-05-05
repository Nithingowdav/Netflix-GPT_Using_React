import React, { useEffect } from 'react'
import Login from './Login'
import Browser from './Browser'
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utilis/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utilis/userSlice';

const Body = () => {

  const dispatch = useDispatch();
  //const navigate = useNavigate();


  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path : "/browser",
      element : <Browser />
    }
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(addUser({uid: uid}));
        
      } else {
       dispatch(removeUser());
   
      }
    });
    
  })
  

  return (
    <div>
      {/* <Login />
      <Browser /> */}
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body