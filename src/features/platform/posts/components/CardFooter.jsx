import CardActions from "./CardActions";
import PostDetailsButtom from "./PostDetailsButtom";

export default function CardFooter({
  detailsRendered,
  setPostDetails,
  postDetails,
}) {
  return (
    <>
      <CardActions postDetails={postDetails} setPostDetails={setPostDetails} />
      {!detailsRendered && (
        <PostDetailsButtom
          postId={postDetails._id}
          setPostDetails={setPostDetails}
          postDetails={postDetails}
        />
      )}
    </>
  );
}
