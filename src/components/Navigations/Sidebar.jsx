import {
  faArrowRight,
  faBell,
  faBookmark,
  faChevronLeft,
  faChevronRight,
  faCirclePlus,
  faCodeCompare,
  faHouse,
  faMagnifyingGlass,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { userDataContext } from "../../Contexts/UserDataContext";

import { useQuery } from "@tanstack/react-query";
import nexaFullLogo from "../../assets/images/nexa-full-logo.png";
import nexaN from "../../assets/images/nexaN.png";
import { authContext } from "../../Contexts/AuthContext";
import { createPostModalContext } from "../../Contexts/CreatePostModalContext";
import { getUnreadCountAPI } from "../../features/platform/notifications/services/notificationsAPIs";

export default function Sidebar() {
  const { setIsLoggedIn } = useContext(authContext);

  const { createPostModal } = useContext(createPostModalContext);

  const { userData } = useContext(userDataContext);

  const { data: unreadCount, isLoading } = useQuery({
    queryKey: ["unreadCount"],
    queryFn: getUnreadCountAPI,
    select: (data) => data.data.unreadCount,
  });

  const [isXL, setIsXL] = useState(
    () => window.matchMedia("(min-width: 1280px)").matches,
  );

  const [isCollapsed, setIsCollapsed] = useState(!isXL);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const handleChange = (e) => {
      setIsXL(e.matches);

      setIsCollapsed(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const navItems = [
    {
      label: "Home",
      icon: faHouse,
      path: "/",
    },
    {
      label: "Explore",
      icon: faMagnifyingGlass,
      path: "/explore",
    },
    {
      label: "Alerts",
      icon: faBell,
      path: "/notifications",
      badge: unreadCount,
    },
    {
      label: "Bookmarks",
      icon: faBookmark,
      path: "/bookmarks",
    },
    {
      label: "My Profile",
      icon: faUser,
      path: "/profile",
    },
    {
      label: "Change Password",
      icon: faCodeCompare,
      path: "/change-password",
    },
  ];

  const sidebarOpen = isXL || !isCollapsed;

  return (
    <>
      {!isXL && !isCollapsed && (
        <div
          onClick={() => setIsCollapsed(true)}
          className="
            fixed inset-0
            z-50
            bg-black/20
            backdrop-blur-[1px]
          "
        />
      )}

      <div
        aria-hidden="true"
        className={`
          hidden md:block
          shrink-0
          h-dvh
          transition-[width] duration-300
          ${isXL ? "w-64" : "w-16"}
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          hidden md:flex
          fixed
          top-0
          inset-s-0
          h-dvh
          z-60

          flex-col
          justify-between

          border-e
          bg-background
          py-4
          transition-[width,padding,box-shadow]
          duration-300
          ease-in-out

          ${sidebarOpen ? "w-64 px-4 shadow-xl" : "w-16 px-2"}
        `}
      >
        {/* Collapse Button */}

        {!isXL && (
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="
              absolute
              -inset-e-3
              top-6
              z-10

              w-6
              h-6

              rounded-full

              bg-background
              border
              border-default-200

              flex
              items-center
              justify-center

              text-default-500

              hover:text-blue-600
              hover:border-blue-300

              transition-colors
              duration-200

              shadow-sm
            "
          >
            <FontAwesomeIcon
              icon={isCollapsed ? faChevronRight : faChevronLeft}
              className="text-xs"
            />
          </button>
        )}

        {/* Top Content */}
        <div>
          {/* Logo */}
          <div
            className={`
              flex
              items-center
              gap-2

              px-2
              mb-6

              overflow-hidden

              ${sidebarOpen ? "justify-start" : "justify-center"}
            `}
          >
            {/* Logo */}
            <div>
              <img
                src={sidebarOpen ? nexaFullLogo : nexaN}
                alt="nexa logo"
                className={`${sidebarOpen && "w-30"}`}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, icon, path, badge }) => (
              <NavLink
                onClick={() => setIsCollapsed(true)}
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) => `
                    relative

                    flex
                    items-center

                    

                    px-3
                    py-3

                    rounded-full

                    transition-colors
                    duration-200

                    overflow-hidden

                    ${sidebarOpen ? "justify-start gap-2" : "justify-center"}

                    ${
                      isActive
                        ? "text-primary font-semibold bg-primary/15"
                        : "text-neutral-700 hover:bg-neuttext-neutral-100"
                    }
                  `}
              >
                {/* Icon */}
                <span className="relative shrink-0">
                  <FontAwesomeIcon icon={icon} className="text-xl" />

                  {/* Badge */}
                  {badge ? (
                    <span
                      className="
                          absolute
                          -top-1
                          -inset-e-1

                          bg-tertiary
                          text-white
                          font-semibold

                          text-[10px]
                          leading-none

                          rounded-full

                          w-4
                          h-4

                          flex
                          items-center
                          justify-center
                        "
                    >
                      {badge}
                    </span>
                  ) : null}
                </span>

                {/* Label */}
                <span
                  className={`
                      text-base

                      whitespace-nowrap

                      transition-all
                      duration-300

                      ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}
                    `}
                >
                  {label}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        {userData && (
          <div className="space-y-3">
            <button
              className={`${sidebarOpen ? "bg-primary text-white py-2 rounded-full w-full" : "text-primary text-4xl w-full"} cursor-pointer`}
              onClick={() => {
                setIsCollapsed(true);
                createPostModal.toggle();
              }}
            >
              {sidebarOpen ? (
                "Create Post"
              ) : (
                <FontAwesomeIcon icon={faCirclePlus} />
              )}
            </button>
            {sidebarOpen && (
              <button
                className={`w-full bg-red-100 py-2 font-semibold text-red-500 rounded-full cursor-pointer group`}
                onClick={() => {
                  setIsCollapsed(true);
                  createPostModal.toggle();
                  setIsLoggedIn(false);
                  localStorage.removeItem("userData");
                  localStorage.removeItem("token");
                }}
              >
                <span>Logout</span>{" "}
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="group-hover:translate-x-1/3 duration-150"
                />
              </button>
            )}
            <Link
              to={"/profile"}
              className={`
              flex
              items-center
              w-full
              rounded-full
              ${sidebarOpen ? "justify-start p-2 gap-3" : "justify-center"}
            `}
              onClick={() => setIsCollapsed(treu)}
            >
              {/* User Image */}
              <div
                className="
    size-13
    shrink-0
    rounded-full
    overflow-hidden
    flex
    items-center
    justify-center
  "
              >
                <img
                  src={userData.photo}
                  alt={userData.name}
                  className="
      size-full
      object-cover
    "
                />
              </div>

              {/* User Info */}
              <div
                className={`
                flex
                items-center
                justify-between
                w-full

                leading-tight

                overflow-hidden

                transition-all
                duration-300

                group

                ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}
              `}
              >
                <div className="flex flex-col items-start">
                  <span
                    className="
                  text-sm
                  font-semibold
                  whitespace-nowrap
                "
                  >
                    {userData.name}
                  </span>

                  <span
                    className="
                  text-xs
                  text-default-400
                  whitespace-nowrap
                "
                  >
                    @{userData.username}
                  </span>
                </div>
                {sidebarOpen && (
                  <div className="flex items-center justify-between w-full group cursor-pointer">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="
                  ms-auto
                  text-default-500
                  group-hover:scale-130
                  duration-200
                "
                    />
                  </div>
                )}
              </div>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
