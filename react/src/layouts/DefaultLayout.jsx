import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { useMediaQuery } from "react-responsive";
import { useStateContext } from "../context/ContextProvider";
import { motion } from "framer-motion";

export default function DefaultLayout() {
  const isUnderMd = useMediaQuery({ query: "(max-width: 768px)" });
  const { user, setUser, token, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to={"/gudang-auth/login"} />;
  }

  return (
    <div
      className={`flex bg-second w-screen h-screen ${
        isUnderMd ? "flex-col" : "flex-row"
      }`}
    >
      <SideBar />

      <main className=" p-2 flex-1 md:overflow-hidden h-screen">
        <div className="relative flex-1 overflow-y-auto md:overflow-hidden h-full scrollbar-thin scrollbar-thumb-main/20 scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-track-selected-item/20">
          <Outlet />
        </div>
      </main>

      {notification && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed flex text-justify items-center right-4 md:top-4 py-2 px-4 text-sm md:text-base max-w-xs lg:min-w-max  z-[100] bg-fifth rounded-md"
        >
          {notification}
        </motion.div>
      )}
    </div>
  );
}
