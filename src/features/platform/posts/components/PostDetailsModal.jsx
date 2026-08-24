import { Modal, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { userDataContext } from "../../../../Contexts/UserDataContext";
import SingleComment from "../../comments/components/SingleComment";
import { getPostCommentsAPI } from "../../comments/services/commentsAPIs";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

export default function PostDetailsModal({
  isOpen,
  setIsOpen,
  postId,
  setPostDetails,
  postDetails,
}) {
  const { userData } = useContext(userDataContext);
  const { data: comments, isLoading } = useQuery({
    queryKey: ["postComments", postId],
    queryFn: () => getPostCommentsAPI(postId),
    select: (data) => data.data.comments,
    enabled: postDetails.commentsCount !== 0,
  });

  console.log(postDetails);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container scroll={"inside"} placement="center">
            <Modal.Dialog className="bg-surface rounded-lg! border border-tertiary-300/80">
              <Modal.Body className="space-y-3 relative text-gray-700">
                <CardHeader
                  postDetails={postDetails}
                  userData={userData}
                  setPostDetails={setPostDetails}
                  setIsOpen={setIsOpen}
                />
                <CardBody postDetails={postDetails} detailsRendered />
                <CardFooter
                  setPostDetails={setPostDetails}
                  postDetails={postDetails}
                  userData={userData}
                  detailsRendered
                />
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, index) => (
                      <Skeleton key={index} className="w-full h-12" />
                    ))}
                  </div>
                ) : postDetails.commentsCount !== 0 ? (
                  comments.map((comment) => (
                    <SingleComment
                      commentInfo={comment}
                      postId={postId}
                      userId={userData._id}
                      key={comment._id}
                      setPostDetails={setPostDetails}
                    />
                  ))
                ) : (
                  <span className="text-center text-body font-sec block">
                    Be first to comment
                  </span>
                )}
              </Modal.Body>
              <Modal.CloseTrigger />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
