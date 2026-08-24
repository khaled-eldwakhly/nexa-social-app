import CardActions from "./CardActions";
import PostDetailsButton from "./PostDetailsButton";

export default function CardFooter({
  detailsRendered,
  setPostDetails,
  postDetails,
}) {
  return (
    <>
      <CardActions postDetails={postDetails} setPostDetails={setPostDetails} />
      {!detailsRendered && (
        <PostDetailsButton
          postId={postDetails._id}
          setPostDetails={setPostDetails}
          postDetails={postDetails}
        />
      )}
    </>
  );
}
