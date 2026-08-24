import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PostDetailsModal from "./PostDetailsModal";

export default function PostDetailsButton({
  postId,
  setPostDetails,
  postDetails,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="text-sm text-center w-full cursor-pointer absolute bottom-0 left-0 py-1 group"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>view post details</span>{" "}
        <FontAwesomeIcon
          icon={faAngleDown}
          className="-rotate-90 group-hover:rotate-0 duration-200"
        />
      </button>
      {isOpen && (
        <PostDetailsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          postId={postId}
          setPostDetails={setPostDetails}
          postDetails={postDetails}
        />
      )}
    </>
  );
}
