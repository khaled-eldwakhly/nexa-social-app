import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "./App.css";
import AppProtectedRoutes from "./components/ProtectedRoutes/AppProtectedRoutes";
import AuthProtectedRoutes from "./components/ProtectedRoutes/AuthProtectedRoutes";
import { authContext } from "./Contexts/AuthContext";
import Signin from "./features/auth/signin/Signin";
import Signup from "./features/auth/signup/Signup";
import Bookmarks from "./features/platform/bookmarks/Bookmarks";
import Explore from "./features/platform/explore/Explore";
import Home from "./features/platform/Home/Home";
import NotFound from "./features/platform/NotFound";
import Notifications from "./features/platform/notifications/Notifications";
import CreatePostModal from "./features/platform/posts/components/CreatePostModal";
import ChangePassword from "./features/platform/profile/components/ChangePassword";
import Profile from "./features/platform/profile/Profile";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <AuthProtectedRoutes>
        <AuthLayout />
      </AuthProtectedRoutes>
    ),
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
  {
    path: "",
    element: (
      <AppProtectedRoutes>
        <MainLayout />
      </AppProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const { isLoggedIn } = useContext(authContext);
  return (
    <>
      <RouterProvider router={routes} />
      {isLoggedIn && <CreatePostModal />}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
}

export default App;
