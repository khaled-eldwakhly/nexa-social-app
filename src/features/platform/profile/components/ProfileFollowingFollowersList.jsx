import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Link } from "react-router-dom";

export default function ProfileFollowingFollowersList({ user }) {
  return (
    <>
      <div className="font-light text-xs flex gap-5">
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <button>
              <span className="font-semibold">{user.followingCount}</span>{" "}
              Following
            </button>
          </PopoverTrigger>

          <PopoverContent className="p-3 w-55 rounded-xl">
            <div className="w-full">
              <h3 className="font-semibold mb-3">Following</h3>

              <div className="max-h-72 overflow-y-auto space-y-3">
                {user.followingCount === 0
                  ? `${user.name.split(" ")[0]} not follow anyone yet`
                  : user.following.map((following) => (
                      <Link
                        to={`/profile/${following._id}`}
                        key={following._id}
                        className="flex items-center gap-3"
                      >
                        <img
                          src={following.photo}
                          alt={following.name}
                          className="size-9 rounded-full object-cover"
                        />

                        <div>
                          <p className="text-sm font-medium">
                            {following.name}
                          </p>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <button>
              <span className="font-semibold">{user.followersCount}</span>{" "}
              Followers
            </button>
          </PopoverTrigger>

          <PopoverContent className="p-3 w-55 rounded-xl">
            <div className="w-full">
              <h3 className="font-semibold mb-3">Followers</h3>

              <div className="max-h-72 overflow-y-auto space-y-3">
                {user.followersCount === 0
                  ? `${user.name.split(" ")[0]} not have followers yet`
                  : user.followers.map((follower) => (
                      <Link
                        to={`/profile/${follower._id}`}
                        key={follower._id}
                        className="flex items-center gap-3"
                      >
                        <img
                          src={follower.photo}
                          alt={follower.name}
                          className="size-9 rounded-full object-cover"
                        />

                        <div>
                          <p className="text-sm font-medium">{follower.name}</p>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
