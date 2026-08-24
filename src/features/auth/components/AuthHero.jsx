import {
  faAward,
  faBell,
  faDownload,
  faHeart,
  faImage,
  faMessage,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authHeroBg from "../../../assets/images/bg-auth-hero.jpg";
import userImage from "../../../assets/images/profile-image.png";

export default function AuthHero() {
  const firstList = [
    {
      icon: faMessage,
      iconColor: "text-green-300",
      iconBgColor: "bg-green-400/30",
      hedding: "Real-time Chat",
      subHedding: "Instant messaging",
    },
    {
      icon: faImage,
      iconColor: "text-blue-200",
      iconBgColor: "bg-blue-400/30",
      hedding: "Share Media",
      subHedding: "Photos & videos",
    },
    {
      icon: faBell,
      iconColor: "text-pink-100",
      iconBgColor: "bg-pink-400/30",
      hedding: "Smart Alerts",
      subHedding: "Stay updated",
    },
    {
      icon: faUsers,
      iconColor: "text-teal-400",
      iconBgColor: "bg-teal-400/30",
      hedding: "Communities",
      subHedding: "Find your tribe",
    },
  ];
  const secList = [
    {
      icon: faUsers,
      iconColor: "text-teal-300",
      statistic: "2M+",
      subHedding: "Active Users",
    },
    {
      icon: faHeart,
      iconColor: "text-red-300",
      statistic: "10M+",
      subHedding: "Posts Shared",
    },
    {
      icon: faMessage,
      iconColor: "text-cyan-200",
      statistic: "50M+",
      subHedding: "Messages Sent",
    },
  ];
  const thirdList = [
    { icon: faDownload, statistic: "10M+ Downloads" },
    { icon: faStar, statistic: "4.9 App Store" },
    { icon: faAward, statistic: "Award Winning" },
  ];
  return (
    <section
      className={`min-h-screen bg-cover bg-center p-8 space-y-4 md:space-y-0 text-white flex flex-col justify-between`}
      style={{
        backgroundImage: `linear-gradient(#1447e6cc, #1447e6cc), url(${authHeroBg})`,
      }}
    >
      {/* 1st div */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <span className="bg-white/40 size-10 flex justify-center items-center rounded-xl text-white/85">
          N
        </span>
        <h1>Nexa</h1>
      </div>
      {/* 2nd div */}
      <div className="mt-5 space-y-2">
        <p className="text-3xl font-bold">
          Connect with <br />
          <span className="bg-linear-to-r bg-clip-text text-transparent from-sky-400 to-sky-200">
            amazing people
          </span>
        </p>
        <p className="text-sm max-w-md text-white/80">
          Join millions of users sharing moments, ideas, and building meaningful
          connections every day.
        </p>
      </div>
      {/* 1stlist */}
      <div>
        <ul className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-3.5">
          {firstList.map((listElement, index) => (
            <li
              className="bg-white/15 py-2 px-3 rounded-xl border border-white/30 flex items-center gap-3 text-sm hover:scale-103 duration-200 backdrop-blur-xs"
              key={index}
            >
              <div
                className={`${listElement.iconBgColor} p-2 text-lg rounded-lg`}
              >
                <FontAwesomeIcon
                  icon={listElement.icon}
                  className={listElement.iconColor}
                />
              </div>
              <div>
                <h2 className="font-semibold">{listElement.hedding}</h2>
                <span className="text-white/80">{listElement.subHedding}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* 2nd list */}
      <ul className="flex items-center justify-between md:justify-start gap-4 text-xl *:-space-y-1.5">
        {secList.map((listElement, index) => (
          <li className="-space-y-1.5" key={index}>
            <div className="space-x-2">
              <FontAwesomeIcon
                icon={listElement.icon}
                className={`${listElement.iconColor}`}
              />
              <span className="font-bold">{listElement.statistic}</span>
            </div>
            <span className="text-white/80 text-sm">
              {listElement.subHedding}
            </span>
          </li>
        ))}
      </ul>
      {/* 3rd list */}
      <ul className="grid grid-cols-2 gap-3 md:flex md:items-center md:gap-5 text-sm *:space-x-1.5 *:bg-white/20 *:py-1 *:px-2.5 *:rounded-2xl">
        {thirdList.map((listElement, index) => (
          <li className="backdrop-blur-xs" key={index}>
            <FontAwesomeIcon
              className="text-yellow-300"
              icon={listElement.icon}
            />
            <span>{listElement.statistic}</span>
          </li>
        ))}
      </ul>

      {/* 3rd div */}
      <blockquote className="p-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xs space-y-1.5">
        <div className="mb-1">
          {[...Array(5)].map((i, index) => (
            <FontAwesomeIcon
              className="text-yellow-300"
              icon={faStar}
              key={index}
            />
          ))}
        </div>
        <p className="italic">
          "Nexa has completely changed how I connect friends and discover new
          communities. The experience is seamless!"
        </p>
        <div className="flex items-center">
          <figure className="w-18">
            <img src={userImage} alt="user image" />
          </figure>
          <figcaption>
            <h3 className="font-semibold">Alex Johnson</h3>
            <span className="text-white/80 text-sm">Product Designer</span>
          </figcaption>
        </div>
      </blockquote>
    </section>
  );
}
