import {
  faBookmark as bookmarkRegular,
  faComment,
  faShareFromSquare,
  faHeart as heartRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as bookmarkSolid,
  faHeart as heartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Popover, Spinner } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import { userDataContext } from "../../../../Contexts/UserDataContext";
import CreateComment from "../../comments/components/CreateComment";
import {
  bookmark_Unbookmark_PostAPI,
  getPostLikesAPI,
  like_Unlike_PostAPI,
  sharePostAPI,
} from "../services/actionsAPIs";
import { Link } from "react-router-dom";

export default function CardActions({ postDetails, setPostDetails }) {
  const textAreaRef = useRef();
  const { userData } = useContext(userDataContext);

  const liked = postDetails.likes.includes(userData._id);
  const bookmarked = postDetails.bookmarked;

  // ^ Like Fun
  const likeMutation = useMutation({
    mutationFn: () => like_Unlike_PostAPI(postDetails._id),
    onMutate: () => {
      setPostDetails((prev) => ({
        ...prev,
        likesCount: liked ? prev.likesCount - 1 : prev.likesCount + 1,
        likes: liked
          ? prev.likes.filter((id) => id !== userData._id)
          : [...prev.likes, userData._id],
      }));
    },
    onError: () => {
      setPostDetails((prev) => ({
        ...prev,
        likesCount: liked ? prev.likesCount + 1 : prev.likesCount - 1,
        likes: liked
          ? [...prev.likes, userData._id]
          : prev.likes.filter((id) => id !== userData._id),
      }));
      toast.error(error.response?.data?.errors || "Something went wrong");
    },
  });

  // ^ Bookmark Fun
  const bookmarkMutation = useMutation({
    mutationFn: () => bookmark_Unbookmark_PostAPI(postDetails._id),
    onMutate: () => {
      setPostDetails((prev) => ({
        ...prev,
        bookmarked: !prev.bookmarked,
      }));
    },
    onError: (error) => {
      setPostDetails((prev) => ({
        ...prev,
        bookmarked: !prev.bookmarked,
      }));
      toast.error(error.response?.data?.errors || "Something went wrong");
    },
  });

  // ^ Share Post Fun
  const shareMutation = useMutation({
    mutationFn: () => sharePostAPI(postDetails._id),
    onMutate: () => {
      setPostDetails((prev) => ({
        ...prev,
        sharesCount: prev.sharesCount + 1,
      }));
    },
    onSuccess: () => {
      toast.success("Post Shared");
    },
    onError: (error) => {
      toast.error(error.response?.data?.errors || "Something went wrong");
      setPostDetails((prev) => ({
        ...prev,
        sharesCount: prev.sharesCount - 1,
      }));
    },
  });

  // ^ Share Post Fun
  const getLikesMutation = useMutation({
    mutationFn: () => getPostLikesAPI(postDetails._id),
  });

  return (
    <>
      <div className="flex items-center gap-2 mt-2 text-body">
        <div>
          {postDetails.likesCount}{" "}
          <Popover>
            <Button
              className="p-0 min-w-0 h-auto bg-transparent data-[hover=true]:bg-transparent text-black text-base"
              onClick={() => getLikesMutation.mutate()}
              isDisabled={postDetails.likesCount === 0}
            >
              Likes
            </Button>
            <Popover.Content className="rounded-lg bg-surface-hover">
              <Popover.Dialog className="p-2 max-h-35 overflow-y-auto">
                {getLikesMutation.isPending ? (
                  <Spinner size="sm" className="text-tertiary-300" />
                ) : (
                  <ul className="space-y-1">
                    {getLikesMutation.data?.data?.likes?.map((like) => (
                      <li
                        key={like._id}
                        className="text-sm font-semibold underline underline-offset-4"
                      >
                        <Link to={`/profile/${like._id}`}>{like.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </Popover.Dialog>
            </Popover.Content>
          </Popover>
        </div>
        <span>•</span>
        <div>
          <div>{postDetails.commentsCount} Comments</div>
        </div>
        <span>•</span>
        <div>{postDetails.sharesCount} Shares</div>
      </div>
      <div className="flex justify-between *:space-x-1 *:cursor-pointer">
        <button
          className="text-red-500 group"
          onClick={() => likeMutation.mutate()}
        >
          <FontAwesomeIcon
            icon={liked ? heartSolid : heartRegular}
            className="group-hover:scale-130 duration-150"
          />
          <span>{liked ? "Liked" : "Like"}</span>
        </button>
        <button
          className="text-green-500 group"
          onClick={() => textAreaRef.current.focus()}
        >
          <FontAwesomeIcon
            icon={faComment}
            className="group-hover:scale-130 duration-150"
          />
          <span>Comment</span>
        </button>
        <button
          className="text-amber-500 group"
          onClick={() => shareMutation.mutate()}
        >
          <FontAwesomeIcon
            icon={faShareFromSquare}
            className="group-hover:scale-130 duration-150"
          />
          <span>Share</span>
        </button>
        <button
          className="text-blue-500 group"
          onClick={() => bookmarkMutation.mutate()}
        >
          <FontAwesomeIcon
            icon={bookmarked ? bookmarkSolid : bookmarkRegular}
            className="group-hover:scale-130 duration-150"
          />
          <span>{bookmarked ? "Saved" : "Save"}</span>
        </button>
      </div>
      <CreateComment
        textAreaRef={textAreaRef}
        postId={postDetails._id}
        setPostDetails={setPostDetails}
      />
    </>
  );
}
