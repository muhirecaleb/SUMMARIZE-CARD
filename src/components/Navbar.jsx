import { LuSunMedium } from "react-icons/lu";
import userImg from "../assets/user.png"

const Navbar = ({toggleSidebar}) => {
  return (
    <div className="w-full fixed z-20 flex justify-end bg-[#242527] h-16 p-2">
       <div className={`${toggleSidebar ? ' w-[95%]' : 'w-[82%]'}  flex items-center transition-all duration-150`}>
        <h2 className="flex-grow text-xl font-extrabold">QuickCard</h2>
        <img className="w-10 bg-slate-400 rounded-full" src={userImg} alt="user-img" />
       </div>
    </div>
  )
}

export default Navbar