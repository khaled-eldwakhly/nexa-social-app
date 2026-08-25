import { faBell, faHouse, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faCirclePlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPostModalContext } from "../../Contexts/CreatePostModalContext";

export default function BottomNavigation() {
  const { createPostModal } = useContext(createPostModalContext);
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <nav className="bg-surface border-t border-border fixed w-full z-50 bottom-0 p-4 font-sec md:hidden">
      <section>
        <ul className="flex justify-around items-center">
          <li>
            <Link
              to={"/"}
              className={`flex flex-col items-center gap-1 ${pathName === "/" && "text-primary font-bold"}`}
            >
              <FontAwesomeIcon icon={faHouse} className="text-lg" />
              <span className="text-sm">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/explore"}
              className={`flex flex-col items-center gap-1 ${pathName === "/explore" && "text-primary font-bold"}`}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
              <span className="text-sm">Explore</span>
            </Link>
          </li>
          <li onClick={() => createPostModal.toggle()}>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="text-3xl text-primary"
            />
          </li>
          <li>
            <Link
              to={"/notifications"}
              className={`flex flex-col items-center gap-1 ${pathName === "/notifications" && "text-primary font-bold"}`}
            >
              <FontAwesomeIcon icon={faBell} className="text-lg" />
              <span className="text-sm">Alerts</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/profile"}
              className={`flex flex-col items-center gap-1 ${pathName === "/profile" && "text-primary font-bold"}`}
            >
              <FontAwesomeIcon icon={faUser} className="text-lg" />
              <span className="text-sm">Profile</span>
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}
