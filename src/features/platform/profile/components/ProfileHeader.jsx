import { faCalendarDays, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import { userDataContext } from "../../../../Contexts/UserDataContext";
import { changePhotoAPI } from "../services/profileAPIs";
import FollowUnfollowButton from "./FollowUnfollowButton";
import ProfileFollowingFollowersList from "./ProfileFollowingFollowersList";

export default function ProfileHeader({ user, isMe, isFollowing }) {
  const { setUserData } = useContext(userDataContext);
  const queryClient = useQueryClient();

  const fileInput = useRef();
  function chooseFile(e) {
    const file = e.target.files[0];

    if (!file) return;

    changePhotoMutation.mutate(file);
  }
  const changePhotoMutation = useMutation({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append("photo", file);

      return changePhotoAPI(formData);
    },
    onSuccess: (data) => {
      toast.success("Photo updated");
      queryClient.refetchQueries(["profile"]);
      setUserData((prev) => ({ ...prev, photo: data.data.photo }));
    },
  });

  console.log(user);

  return (
    <>
      <section className="mt-6">
        <header className="bg-white pb-4 rounded-lg overflow-hidden">
          <div className="h-20 bg-linear-to-r from-primary to-tertiary"></div>
          <div className="px-4 space-y-4 relative">
            <div>
              <img
                src={user.photo}
                alt={user.name}
                className="size-20 rounded-full object-cover outline-4 outline-white -translate-y-1/5"
              />
            </div>
            {changePhotoMutation.isPending && (
              <div className="bg-gray-500/60 flex justify-center items-center size-15 rounded-full absolute top-0 -translate-y-1/5">
                <Spinner className="text-white" />
              </div>
            )}
            <div>
              <h1 className="font-semibold">{user.name}</h1>
              <h2 className="text-sm text-muted">@{user.username}</h2>
            </div>
            <div className="font-light text-xs flex gap-5">
              <div>
                <FontAwesomeIcon
                  icon={faGift}
                  className="text-neutral-400 mr-1"
                />
                Born{" "}
                <span>
                  {new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-neutral-400 mr-1"
                />
                <span>
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <ProfileFollowingFollowersList user={user} />
            {isMe && (
              <div className="flex *:flex-1 gap-4 *:border *:py-2 *:rounded-full font-semibold text-sm *:cursor-pointer">
                <button>Share</button>
                <button
                  className="text-white bg-primary disabled:bg-primary/60 disabled:cursor-not-allowed"
                  onClick={() => fileInput.current?.click()}
                  disabled={changePhotoMutation.isPending}
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInput}
                  onChange={chooseFile}
                />
              </div>
            )}
            {!isMe && (
              <div className="flex *:flex-1 gap-4 *:border *:py-2 *:rounded-full font-semibold text-sm *:cursor-pointer">
                <button>Message</button>
                <FollowUnfollowButton id={user._id} isFollowing={isFollowing} />
              </div>
            )}
          </div>
        </header>
      </section>
    </>
  );
}
