import { Outlet } from "react-router-dom";

export default function GuestLayout(){
    return (
        <div id="GuestLayout" className="relative flex bg-main w-full h-screen ">
            <Outlet/>
        </div>
    )
}