import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { login, logout, selectUser } from './features/userSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Login from './Login'
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import Widgets from './Widgets';


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        dispatch(
          login({
            email: userCredential.email,
            uid: userCredential.uid,
            displayName: userCredential.displayName,
            photoURL: userCredential.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    })
  }, []);


  return (
    <div className="app">
      <Header/>

      {!user ? (
        <Login />
      ):(
        <div className='app_body'>
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
