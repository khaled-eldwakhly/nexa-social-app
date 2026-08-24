import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOverlayState } from "@heroui/react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeletePostAlert from "./DeletePostAlert";
import EditPostModal from "./EditPostModal";

export default function CardHeader({ postDetails, userData, setPostDetails, setIsOpen }) {
  const editPostModal = useOverlayState();
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  return (
    <>
      <div>
        <div className="flex items-center gap-3 text-body">
          <div className="size-12 rounded-full overflow-hidden">
            <Link
              to={`${postDetails.user._id === userData._id ? `/profile` : `/profile/${postDetails.user._id}`}`}
            >
              <img
                className="object-cover size-full"
                src={postDetails.user.photo}
                alt={postDetails.user.name}
              />
            </Link>
          </div>
          <div className="flex flex-col font-sec">
            <h3 className="font-semibold">{postDetails.user.name}</h3>
            {(() => {
              const hoursDiff =
                (new Date() - new Date(postDetails.createdAt)) /
                (1000 * 60 * 60);

              return hoursDiff >= 24 ? (
                <span className="text-sm">
                  {new Date(postDetails.createdAt).toLocaleDateString()}
                </span>
              ) : (
                <span className="text-sm">
                  {formatDistanceToNow(new Date(postDetails.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              );
            })()}
          </div>
          <div className="ml-auto space-x-2">
            {userData._id === postDetails.user._id && (
              <>
                <button
                  className="size-9 border border-primary rounded-full text-primary"
                  onClick={() => {
                    editPostModal.toggle();
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className="size-9 border border-red-500 rounded-full text-red-500"
                  onClick={() => {
                    setIsOpenAlert(true);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <DeletePostAlert
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        postId={postDetails._id}
        setIsOpen={setIsOpen}
      />
      <EditPostModal
        editPostModal={editPostModal}
        postDetails={postDetails}
        setPostDetails={setPostDetails}
      />
    </>
  );
}
