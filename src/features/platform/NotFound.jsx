import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import nexaN from "../../assets/images/nexaN.png";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <main className="">
        <section className="flex justify-center items-center h-[calc(100vh-130px)] text-center text-secondary bg-white">
          <div className="space-y-10">
            <div className="flex justify-center items-center text-[110px] gap-3 font-bold font-sec">
              <span>4</span>
              <div className="size-30">
                <img src={nexaN} alt="" />
              </div>
              <span>4</span>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-xl">Oops! Page Note Found</p>
              <p className="text-gray-600 font-medium">
                The page you'r looking for <br /> doesn't exist or was moved
              </p>
            </div>
            <Link
              to={"/"}
              className="text-white font-medium bg-linear-to-r from-blue-600 to-sky-300 px-6 py-3 rounded-lg space-x-1"
            >
              <FontAwesomeIcon icon={faHouse} />
              <span>Back to Home</span>
            </Link>
          </div>
          <svg
            viewBox="0 0 680 160"
            className="w-full h-auto absolute bottom-18.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,60 C120,20 260,90 400,55 C500,30 600,70 680,45 L680,160 L0,160 Z"
              fill="#DCEAFB"
              opacity="0.6"
            />
            <path
              d="M0,90 C140,130 280,50 420,95 C520,125 610,80 680,100 L680,160 L0,160 Z"
              fill="#C6DDF7"
              opacity="0.7"
            />
            <path
              d="M0,115 C160,80 300,140 440,110 C540,90 620,130 680,115 L680,160 L0,160 Z"
              fill="#B4D2F3"
              opacity="0.8"
            />
          </svg>
        </section>
      </main>
    </>
  );
}
