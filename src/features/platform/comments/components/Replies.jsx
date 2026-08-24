import { Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { getCommentRepliesAPI } from "../services/commentsAPIs";
import SingleComment from "./SingleComment";

export default function Replies({ showReplies, postId, commentId, userId }) {
  const { data: replies, isLoading } = useQuery({
    queryKey: ["commentReplies", commentId],
    queryFn: () => getCommentRepliesAPI(postId, commentId),
    enabled: !!showReplies,
    select: (data) => data.data.replies,
  });
  
  return (
    <>
      <AnimatePresence>
        {showReplies &&
          (isLoading ? (
            <>
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
            </>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {replies.map((reply) => (
                  <>
                    <SingleComment
                      commentInfo={reply}
                      postId={postId}
                      userId={userId}
                      key={reply._id}
                      reply
                      replyId={reply._id}
                    />
                  </>
                ))}
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </>
  );
}
