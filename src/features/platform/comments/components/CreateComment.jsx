import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spinner, TextArea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { userDataContext } from "../../../../Contexts/UserDataContext";
import { createCommentAPI } from "../services/commentsAPIs";

export default function CreateComment({ textAreaRef, postId, setPostDetails }) {
  const queryClient = useQueryClient();

  const { userData } = useContext(userDataContext);

  const [commentContent, setCommentContent] = useState("");

  const createCommentMutation = useMutation({
    mutationFn: () => {
      const formData = new FormData();
      formData.append("content", commentContent);
      return createCommentAPI(postId, formData);
    },
    onSuccess: (dataResponse) => {
      setCommentContent("");
      setPostDetails((prev) => ({
        ...prev,
        commentsCount: prev.commentsCount + 1,
      }));
      queryClient.refetchQueries(["postComments", postId]);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <div className="relative">
      <TextArea
        rows={2}
        className={`w-full resize-none border border-blue-300`}
        placeholder={`comment as ${userData.name}`}
        ref={textAreaRef}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button
        variant="primary"
        className="absolute bottom-4 right-3 px-2.5 py-1.5 h-auto text-sm cursor-pointer disabled:cursor-not-allowed"
        isDisabled={!commentContent?.trim() || createCommentMutation.isPending}
        onPress={() => createCommentMutation.mutate()}
      >
        {createCommentMutation.isPending ? (
          <Spinner size="sm" className="text-white flex" />
        ) : (
          <>
            <FontAwesomeIcon icon={faPlus} />
            <span>comment</span>
          </>
        )}
      </Button>
    </div>
  );
}
