import { Outlet } from "react-router-dom";
import AuthHero from "../features/auth/components/AuthHero";

export default function AuthLayout() {
  return (
    <>
      <main className="space-y-8 xl:space-y-0 xl:flex xl:*:flex-1">
        <AuthHero />
        <Outlet />
      </main>
    </>
  );
}
