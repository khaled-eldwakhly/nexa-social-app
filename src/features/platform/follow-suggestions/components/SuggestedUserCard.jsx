import { Link } from "react-router-dom";
import FollowUnfollowButton from "../../profile/components/FollowUnfollowButton";

export default function SuggestedUserCard({ user }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-xl bg-white shadow hover:shadow-none duration-200 cursor-pointer">
      <Link to={`/profile/${user._id}`}>
        <div className="flex items-center gap-3">
          <img
            src={user.photo}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-500">@{user.username}</p>
            {user.mutualFollowersCount > 0 && (
              <p className="text-xs text-gray-400">
                {user.mutualFollowersCount} mutual follower
                {user.mutualFollowersCount > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </Link>
      <FollowUnfollowButton id={user._id} suggestedUserCard/>
    </div>
  );
}
