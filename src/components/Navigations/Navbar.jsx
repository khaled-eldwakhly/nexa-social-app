import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark,
  faCodeCompare,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Dropdown, Label, Spinner } from "@heroui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import nexaFullLogo from "../../assets/images/nexa-full-logo.png";
import { authContext } from "../../Contexts/AuthContext";
import { userDataContext } from "../../Contexts/UserDataContext";
import { getUnreadCountAPI } from "../../features/platform/notifications/services/notificationsAPIs";

export default function Navbar() {
  const { setIsLoggedIn } = useContext(authContext);
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: unreadCount, isLoading } = useQuery({
    queryKey: ["unreadCount"],
    queryFn: getUnreadCountAPI,
    select: (data) => data.data.unreadCount,
  });

  return (
    <>
      <nav className="fixed w-full z-50 bg-surface p-4 border-b border-border md:hidden">
        <section className="xl:max-w-7/10 mx-auto flex justify-between items-center">
          {/* logo */}
          <Link to={"/"} className="w-25 flex items-center">
            <img src={nexaFullLogo} alt="nexa logo" />
          </Link>
          {/* other links & profile icon */}
          <div className="flex items-center gap-4">
            <Link
              to={"/notifications"}
              className="bg-tertiary px-1.5 py-1 flex justify-between items-center text-white rounded-md"
            >
              <FontAwesomeIcon icon={faBell} />
              {isLoading ? (
                <Spinner size="sm" className="text-white" />
              ) : (
                <span className="text-sm font-bold">{unreadCount}</span>
              )}
            </Link>
            <Dropdown>
              <Dropdown.Trigger className="rounded-full">
                <Avatar>
                  <Avatar.Image
                    alt={userData.name}
                    src={userData.photo}
                    className="outline outline-secondary object-cover"
                  />
                  <Avatar.Fallback delayMs={600}>
                    {userData.name}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>
              <Dropdown.Popover className={"rounded-xl"}>
                <div className="px-3 pt-3 pb-1">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <Avatar.Image
                        alt="Jane"
                        src={userData.photo}
                        className="object-cover"
                      />
                      <Avatar.Fallback delayMs={600}>
                        {userData.name}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                      <p className="text-sm leading-5 font-semibold">
                        {userData.name.split(" ")[0]}
                      </p>
                      <p className="text-xs leading-none text-muted">
                        @{userData.username}
                      </p>
                    </div>
                  </div>
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item
                    id="dashboard"
                    textValue="Dashboard"
                    className="hidden"
                  >
                    <Label>Dashboard</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="profile" textValue="Profile">
                    <Link
                      to={"/profile"}
                      className="flex justify-between items-center w-full"
                    >
                      <Label>Profile</Label>
                      <FontAwesomeIcon icon={faUser} className="text-primary" />
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item id="bookmarks" textValue="Bookmarks">
                    <Link
                      className="flex w-full items-center justify-between gap-2"
                      to={"/bookmarks"}
                    >
                      <Label>Bookmarks</Label>
                      <FontAwesomeIcon
                        icon={faBookmark}
                        className="text-yellow-400"
                      />
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="change-password"
                    textValue="change-password"
                  >
                    <Link
                      className="flex w-full items-center justify-between gap-2"
                      to={"/change-password"}
                    >
                      <Label>Change Password</Label>
                      <FontAwesomeIcon
                        icon={faCodeCompare}
                        className="text-green-500"
                      />
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="new-project"
                    textValue="New project"
                    className="hidden"
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Create Team</Label>
                      {/* <Persons className="size-3.5 text-muted" /> */}
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="logout"
                    textValue="Logout"
                    variant="danger"
                  >
                    <div
                      className="flex w-full items-center justify-between gap-2"
                      onClick={() => {
                        setIsLoggedIn(false);
                        localStorage.removeItem("token");
                        localStorage.removeItem("userData");
                      }}
                    >
                      <Label>Log Out</Label>
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="text-red-500"
                      />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </section>
      </nav>
    </>
  );
}
