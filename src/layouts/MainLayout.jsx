import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigations/Navbar";
import BottomNavigation from "../components/Navigations/BottomNavigation";
import Sidebar from "../components/Navigations/Sidebar";

export default function MainLayout() {
  return (
    <>
      <main>
        <div className="md:flex">
          <Sidebar />
          <div className="grow">
            <Navbar />
            <Outlet />
          </div>
        </div>
        <BottomNavigation />
      </main>
    </>
  );
}
