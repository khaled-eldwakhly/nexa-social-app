import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigations/Navbar";
import BottomNavigation from "../components/Navigations/BottomNavigation";


export default function MainLayout() {
  return (
    <>
      <main>
        <Navbar />
        <Outlet />
        <BottomNavigation />
      </main>
    </>
  );
}
