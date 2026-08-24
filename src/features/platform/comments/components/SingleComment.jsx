import {
  faPenToSquare,
  faTrashCan,
  faHeart as heartRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faCheck,
  faReplyAll,
  faHeart as heartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner, TextArea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  deleteCommentAPI,
  editCommentAPI,
  likeCommentAPI,
} from "../services/commentsAPIs";
import Replies from "./Replies";
import ReplyTextArea from "./ReplyTextArea";

export default function SingleComment({
  commentInfo,
  userId,
  postId,
  reply,
  setPostDetails,
  replyId,
}) {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const likedComment = commentInfo.likes.includes(userId);

  const queryClient = useQueryClient();

  const like_Unlike_Comment_Mutation = useMutation({
    mutationFn: () => likeCommentAPI(postId, commentInfo._id),
    onMutate: async () => {
      await queryClient.cancelQueries(["postComments", postId]);
      const previousPostComments = queryClient.getQueryData([
        "postComments",
        postId,
      ]);

      queryClient.setQueryData(["postComments", postId], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            comments: oldData.data.comments.map((comment) =>
              comment._id === commentInfo._id
                ? {
                    ...comment,
                    likes: likedComment
                      ? comment.likes.filter((id) => id !== userId)
                      : [...comment.likes, userId],
                  }
                : comment,
            ),
          },
        };
      });

      return {
        previousPostComments,
      };
    },
    onError: (error, variables, context) => {
      toast.error(error?.message);
      queryClient.setQueryData(
        ["postComments", postId],
        context.previousPostComments,
      );
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteCommentAPI(postId, commentInfo._id),
    onSuccess: () => {
      setPostDetails((prev) => ({
        ...prev,
        commentsCount: prev.commentsCount - 1,
      }));
      queryClient.refetchQueries(["postComments", postId]);
      if (reply) {
        queryClient.setQueryData(
          ["commentReplies", commentInfo._id],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                replies: oldData.data.replies.filter(
                  (reply) => reply._id !== replyId,
                ),
              },
            };
          },
        );
      }
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: () => {
      const formData = new FormData();
      formData.append("content", editValue);
      return editCommentAPI(postId, commentInfo._id, formData);
    },
    onSuccess: () => {
      queryClient.refetchQueries(["postComments", postId]);
      setEdit((prev) => !prev);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <>
      <div
        className={`py-2 px-3 rounded-xl border border-blue-200 space-y-3 bg-surface text-body ${reply && "bg-surface-hover"}`}
      >
        {/* user image & name */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={commentInfo.commentCreator.photo}
              alt={commentInfo.commentCreator.name}
              className="size-10 rounded-full"
            />
            <div className="-space-y-1">
              <h3 className="font-semibold">
                {commentInfo.commentCreator.name}
              </h3>
              <span className="text-sm">
                @{commentInfo.commentCreator.username}
              </span>
            </div>
          </div>
          {commentInfo.commentCreator._id === userId && (
            <div className="space-x-1 text-sm">
              <button
                className="size-8 bg-secondary-700/70 border border-blue-400 rounded-full text-blue-300"
                onClick={() => {
                  if (edit) {
                    editCommentMutation.mutate();
                  }
                  if (!edit) {
                    setEdit((prev) => !prev);
                  }
                }}
              >
                {edit ? (
                  editCommentMutation.isPending ? (
                    <Spinner size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faCheck} />
                  )
                ) : (
                  <FontAwesomeIcon icon={faPenToSquare} />
                )}
              </button>
              <button
                className="size-8 bg-secondary-700/70 border border-red-500 rounded-full text-red-300"
                onClick={() => {
                  deleteCommentMutation.mutate();
                }}
              >
                {deleteCommentMutation.isPending ? (
                  <Spinner size="sm" className="text-red-600" />
                ) : (
                  <FontAwesomeIcon icon={faTrashCan} />
                )}
              </button>
            </div>
          )}
        </div>
        {/* comment content */}
        {edit ? (
          <TextArea
            className={"resize-none w-full text-body"}
            defaultValue={commentInfo.content}
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          <p className="text-sm">{commentInfo.content}</p>
        )}
        {/* actions */}
        {!reply && (
          <div className="flex justify-between gap-5 text-sm">
            <button
              className={`cursor-pointer group disabled:text-gray-500 disabled:cursor-not-allowed text-blue-600 font-medium`}
              onClick={() => {
                setShowTextArea(false);
                setShowReplies((prev) => !prev);
              }}
              disabled={commentInfo.repliesCount === 0}
            >
              {commentInfo.repliesCount === 0 ? (
                <span>no replies yet</span>
              ) : (
                <span>{showReplies ? "hide" : "show"} replies</span>
              )}
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`${showReplies ? "group-hover:-rotate-90 duration-200" : "-rotate-90 group-hover:rotate-0 duration-200"}`}
              />
            </button>
            <div className="*:cursor-pointer *:space-x-1">
              <button
                className="text-red-500 group px-2 py-1 rounded-xl"
                onClick={() => like_Unlike_Comment_Mutation.mutate()}
              >
                <FontAwesomeIcon
                  icon={likedComment ? heartSolid : heartRegular}
                  className="group-hover:scale-130 duration-150"
                />
                <span className="text-sm">{commentInfo.likes.length}</span>
              </button>
              <button
                className="text-green-500 group px-2 py-1 rounded-xl"
                onClick={() => {
                  setShowTextArea((prev) => !prev);
                  setShowReplies(false);
                }}
              >
                <FontAwesomeIcon
                  icon={faReplyAll}
                  className="group-hover:scale-130 duration-150"
                />
                <span className="text-sm">{commentInfo.repliesCount}</span>
              </button>
            </div>
          </div>
        )}
        <Replies
          showReplies={showReplies}
          postId={postId}
          commentId={commentInfo._id}
          userId={userId}
        />
        <ReplyTextArea
          commentCreator={commentInfo.commentCreator}
          commentId={commentInfo._id}
          postId={postId}
          showTextArea={showTextArea}
        />
      </div>
    </>
  );
}
