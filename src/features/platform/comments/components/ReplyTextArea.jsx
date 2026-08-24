import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner, TextArea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { createReplyAPI } from "../services/commentsAPIs";

export default function ReplyTextArea({
  postId,
  commentId,
  commentCreator,
  showTextArea,
}) {
  const [reply, setReply] = useState("");

  const queryClient = useQueryClient();
  const createReplyMutation = useMutation({
    mutationFn: () => {
      const formData = new FormData();
      formData.append("content", reply);
      return createReplyAPI(postId, commentId, formData);
    },
    onSuccess: () => {
      setReply("");
      queryClient.setQueryData(["postComments", postId], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            comments: oldData.data.comments.map((comment) =>
              comment._id === commentId
                ? {
                    ...comment,
                    repliesCount: comment.repliesCount + 1,
                  }
                : comment,
            ),
          },
        };
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <>
      <AnimatePresence>
        {showTextArea && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden p-2 -m-2 relative"
          >
            <TextArea
              rows={2}
              placeholder={`Reply to ${commentCreator.name.split(" ")[0]}...`}
              className={`w-full resize-none bg-surface-hover`}
              onChange={(e) => setReply(e.target.value)}
              value={reply}
            />
            <button
              onClick={() => createReplyMutation.mutate()}
              disabled={!reply?.trim() || createReplyMutation.isPending}
            >
              {createReplyMutation.isPending ? (
                <Spinner
                  className="text-green-500 absolute bottom-6 right-5"
                  size="sm"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className={`${!reply.trim() ? "text-gray-500 cursor-not-allowed!" : "text-green-500 hover:text-green-600 duration-150"} text-sm cursor-pointer absolute bottom-6 right-5`}
                />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
