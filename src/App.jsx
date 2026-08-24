import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "./App.css";
import AppProtectedRoutes from "./components/ProtectedRoutes/AppProtectedRoutes";
import AuthProtectedRoutes from "./components/ProtectedRoutes/AuthProtectedRoutes";
import Signin from "./features/auth/signin/Signin";
import Signup from "./features/auth/signup/Signup";
import Bookmarks from "./features/platform/bookmarks/Bookmarks";
import Home from "./features/platform/Home/Home";
import NotFound from "./features/platform/NotFound";
import CreatePostModal from "./features/platform/posts/components/CreatePostModal";
import Profile from "./features/platform/profile/Profile";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { useContext } from "react";
import { authContext } from "./Contexts/AuthContext";
import Notifications from "./features/platform/notifications/Notifications";
import Explore from "./features/platform/explore/Explore";
import ProfileChangePassword from "./features/platform/profile/components/ProfileChangePassword";

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
        element: <ProfileChangePassword />,
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
