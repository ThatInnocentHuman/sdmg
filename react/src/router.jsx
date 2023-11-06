import { Children, forwardRef } from "react";
import {
  Navigate,
  Route,
  Routes,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./views/gudang/Dashboard";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./views/gudang-auth/Login";
import SignUp from "./views/gudang-auth/SignUp";
import Analisis from "./views/gudang/Analisis";
import Transaksi from "./views/gudang/Transaksi";
import Pemasokan from "./views/gudang/Pemasokan";
import StokBarang from "./views/gudang/StokBarang";
import Pelanggan from "./views/gudang/Pelanggan";
import Supplier from "./views/gudang/Supplier";
import { AnimatePresence } from "framer-motion";
import DefaultLayoutRoutes from "./DefRoutes";
import NotFound from "./views/NotFound";
import LandingPage from "./views/LandingPage";
import Gas from "./views/gudang/Gas";
import Tabung from "./views/gudang/Tabung";

const DefaultChild = forwardRef((props, ref) => {
  const location = useLocation();
  // debugger;
  return (
    <AnimatePresence initial={false}>
      {/* <DefaultLayoutRoutes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/stokbarang" element={<StokBarang />} />
        <Route path="/pemasokan" element={<Pemasokan />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
      </DefaultLayoutRoutes> */}
      <Routes location={location} key={location.pathname}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/stokbarang" element={<StokBarang />} />
        <Route path="/stokbarang/gas" element={<Gas />} />
        <Route path="/stokbarang/tabung" element={<Tabung />} />
        <Route path="/pemasokan" element={<Pemasokan />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
});

function GuestChild() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const router = createBrowserRouter([
  {
    path: "/gudang",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/gudang/dashboard" />,
      },
      {
        path: "*",
        Component: DefaultChild,
      },
    ],
  },
  {
    path: "/gudang-auth",
    Component: GuestLayout,
    //   children : [
    //     {
    //         path : '/login',
    //         element : <Login/>
    //     },
    //     {
    //         path : '/signup',
    //         element : <SignUp/>
    //     }

    // ]
    children: [
      {
        index: true,
        element: <Navigate to="/gudang-auth/login" />,
      },
      {
        path: "*",
        Component: GuestChild,
      },
    ],
  },
  {
    path: "/landing",
    Component: LandingPage,
  },
  {
    path: "/*",
    Component: LandingPage,
  },
]);

export default router;
