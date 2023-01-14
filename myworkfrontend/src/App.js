import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import PostPage from "./components/PostPage";
import Following from "./components/Following";
import Profile from "./components/Profile";
import UserDetail from "./components/UserDetail";



function App() {

  const user_logged = useSelector((state) => state.currentUser);

  return (
    <Routes>
      <Route path="login" element={user_logged != null ? <Navigate to="/" /> : <Login /> }/>
      <Route path="signup" element={user_logged != null ? <Navigate to="/" /> :<Signup />} />
      <Route path="/" element={user_logged == null ? <Navigate to="/login" /> :  <Home />} />
      <Route path="feed" element={user_logged == null ? <Navigate to="/login" /> :  <PostPage />} />
      <Route path="following" element={user_logged == null ? <Navigate to="/login" /> :  <Following />} />
      <Route path="profile" element={user_logged == null ? <Navigate to="/login" /> :  <Profile />} />
      <Route path="userDetail/:id" element={user_logged == null ? <Navigate to="/login" /> :  <UserDetail />} />
    </Routes>
  );
}

export default App;
