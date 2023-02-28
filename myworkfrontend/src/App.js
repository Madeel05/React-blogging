import React, { Suspense } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Loading from "./components/Loading";
const Login = React.lazy(() => import('./components/Login'));
const Signup = React.lazy(() => import('./components/Signup'));
const Home = React.lazy(() => import('./components/Home'));
const PostPage = React.lazy(() => import('./components/PostPage'));
const Following = React.lazy(() => import('./components/Following'));
const Profile = React.lazy(() => import('./components/Profile'));
const UserDetail = React.lazy(() => import('./components/UserDetail'));
const Error = React.lazy(() => import('./components/Error'));


function App() {

  const user_logged = useSelector((state) => state.currentUser);

  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="login" element={user_logged != null ? <Navigate to="/" /> : <Login />} />
        <Route path="signup" element={user_logged != null ? <Navigate to="/" /> : <Signup />} />
        <Route path="/" element={user_logged == null ? <Navigate to="/login" /> : <Home />} />
        <Route path="feed" element={user_logged == null ? <Navigate to="/login" /> : <PostPage />} />
        <Route path="following" element={user_logged == null ? <Navigate to="/login" /> : <Following />} />
        <Route path="profile" element={user_logged == null ? <Navigate to="/login" /> : <Profile />} />
        <Route path="userDetail/:id" element={user_logged == null ? <Navigate to="/login" /> : <UserDetail />} />\
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
