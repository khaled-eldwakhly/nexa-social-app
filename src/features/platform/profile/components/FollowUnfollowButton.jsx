import { faCircleMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { follow_unfollow_API } from "../services/profileAPIs";

export default function FollowUnfollowButton({
  id,
  isFollowing,
  suggestedUserCard,
}) {
  const queryClient = useQueryClient();
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const follow_unfollow_mutation = useMutation({
    mutationFn: () => follow_unfollow_API(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["profile", id] });
      const previousProfile = queryClient.getQueryData(["profile", id]);

      setIsFollowingState((prev) => !prev);
      queryClient.setQueryData(["profile", id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            isFollowing: !isFollowingState,
            user: {
              ...oldData.data.user,
              followersCount: isFollowingState
                ? oldData.data.user.followersCount - 1
                : oldData.data.user.followersCount + 1,
            },
          },
        };
      });

      return { previousProfile };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["profile", id], context.previousProfile);
    },
  });
  return (
    <>
      {!suggestedUserCard ? (
        <button
          className={`${!isFollowingState ? "text-white bg-primary hover:bg-primary/85" : "text-black bg-white"} duration-150`}
          onClick={() => follow_unfollow_mutation.mutate()}
        >
          {!isFollowingState ? "Follow" : "Following"}
        </button>
      ) : (
        <button
          className={`${!isFollowingState ? "text-white bg-primary hover:bg-primary/85" : "text-black bg-white"} duration-150 rounded-full size-8`}
          onClick={() => follow_unfollow_mutation.mutate()}
        >
          <FontAwesomeIcon icon={!isFollowingState ? faPlus : faCircleMinus} />
        </button>
      )}
    </>
  );
}
