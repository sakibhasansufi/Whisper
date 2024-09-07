import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login/Login"
import SignUp from "./pages/auth/SignUp/SignUp";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {


  return (
    <div className='flex max-w-6xl mx-auto'>
      
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/profile/:userName" element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
  )
}

export default App
