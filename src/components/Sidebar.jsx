import { FiSidebar } from "react-icons/fi";
import logo from "../assets/logo.png";
import {  useContext } from "react";
import { NavLink } from "react-router-dom";
import { StorageContext } from "../context/context";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = ({toggleSidebar, setToggleSidebar}) => {
  const { storage, setStorage } = useContext(StorageContext);
  const navigate = useNavigate()

  const handleDelete = (id) => {

     const confirm = window.confirm( 
      'Are you sure you want to delete this listing?'
    );

    if (!confirm) return;

    const updatedStorage = storage.filter((obj) => obj.unique !== id);
    console.log("Updated storage:", updatedStorage);
    setStorage(updatedStorage);

    toast.success('Summary deleted succesful')
    
    return navigate('/')
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? " flex justify-around  items-center  w-[90%] text-center hover:bg-[#3a3b3d] rounded-md py-3 cursor-pointer duration-200 bg-[#3a3b3d] delete"
      : "  flex justify-around  items-center  w-[90%] text-center hover:bg-[#3a3b3d] rounded-md py-3 cursor-pointer duration-200 delete";

  return (
    <div
      className={`h-screen ${
        toggleSidebar ? "w-9 pt-2 pl-2" : "w-64"
      } bg-[#242527] rounded-lg fixed top-0 left-0 z-0 duration-200 z-50 overflow-y-auto`}
    >
      <div className="flex items-center justify-between border-b-[1px] border-gray-600">
        <img
          className={`${toggleSidebar && "hidden"} w-20`}
          src={logo}
          alt="logo-img"
        />
        <FiSidebar
          className="mr-2 text-white cursor-pointer text-2xl"
          onClick={() => {
            setToggleSidebar((prevState) => !prevState);
          }}
        />
      </div>

      <div className={`${toggleSidebar && "hidden"}`}>
        <div className="my-6 text-center">
          <NavLink
            to="/"
            className="text-lg text-sky-50 bg-[#65b8fe] py-3 px-6 rounded-md"
          >
            New Project +
          </NavLink>
        </div>

        <div className="flex flex-col gap-2 items-center ">
          {storage.map((obj) => (
            <NavLink
              key={obj.unique}
              to={`/cards/${obj.unique}`}
              className={linkClass}
            >
              <p className="font-thin font-mono">
                {obj.summary.reverse()[0].category}
              </p>
              <MdDelete
  onClick={(e) => {
    e.preventDefault();       
    e.stopPropagation();      
    handleDelete(obj.unique);
  }}
  className="text-white duration-200 hover:text-red-500 opacity-0 el text-lg"
/>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
