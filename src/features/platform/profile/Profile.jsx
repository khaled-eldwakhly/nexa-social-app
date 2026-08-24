import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Posts from "../posts/components/Posts";
import { getUserPostsAPI } from "../posts/services/postsAPIs";
import ProfileChangePassword from "./components/ProfileChangePassword";
import ProfileHeader from "./components/ProfileHeader";
import ProfileInfo from "./components/ProfileInfo";
import ProfileSkeleton from "./components/ProfileSkeleton";
import { getMyProfileAPI, getUserProfileAPI } from "./services//profileAPIs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
export default function Profile() {
  const { userId } = useParams();

  const isMe =
    !userId || userId === JSON.parse(localStorage.getItem("userData"))._id;

  const queryClient = useQueryClient();

  const {
    data: userProfile,
    isLoading: profileLoading,
    isSuccess,
    isError: profileIsError,
    error: profileError,
  } = useQuery({
    queryKey: [
      "profile",
      isMe ? JSON.parse(localStorage.getItem("userData"))._id : userId,
    ],
    queryFn: () =>
      getUserProfileAPI(
        isMe ? JSON.parse(localStorage.getItem("userData"))._id : userId,
      ),
    select: (data) => data.data,
  });

  const {
    data: userPosts,
    isLoading: userPostsLoading,
    isError: userPostsIsError,
    error: userPostsError,
  } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () =>
      getUserPostsAPI(
        !isMe ? userId : JSON.parse(localStorage.getItem("userData"))._id,
      ),
    select: (data) => data.data.posts,
  });

  if (userPostsError) {
    console.dir(userPostsError);
  }

  return (
    <>
      <title>Profile | Nexa</title>
      <main className="main-padding min-h-screen space-y-7">
        {profileLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <ProfileHeader
              user={userProfile.user}
              isMe={isMe}
              isFollowing={userProfile.isFollowing}
            />
            <div className="flex items-center gap-4 mt-5">
              <div className="flex-1 h-0.5 bg-primary rounded-xl" />
              <h2 className="text-xl bg-clip-text text-transparent bg-linear-to-r from-primary to-tertiary">
                Posts by{" "}
                <span className="font-semibold">
                  {userProfile?.user.name.split(" ")[0]}
                </span>
              </h2>
              <div className="flex-1 h-0.5 bg-tertiary rounded-xl" />
            </div>
          </>
        )}
        <Posts
          posts={userPosts}
          isLoading={userPostsLoading}
          error={userPostsError}
          isError={userPostsIsError}
        />
      </main>
    </>
  );
}
