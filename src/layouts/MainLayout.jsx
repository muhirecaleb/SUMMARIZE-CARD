import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { StorageProvider } from "../context/context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

 

const MainLayout = () => {

   const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <StorageProvider>
      <main className="overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar}/>
        <Sidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
        <Outlet context={{ toggleSidebar }} />
      </main>
          <ToastContainer />
    </StorageProvider>
  );
};

export default MainLayout;
