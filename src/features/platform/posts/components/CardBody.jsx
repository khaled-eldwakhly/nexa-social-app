export default function CardBody({ postDetails, detailsRendered }) {
  return (
    <>
      <div className="my-4 text-body">
        <p className="my-2 line-clamp-3">{postDetails.body}</p>
        {postDetails.image && (
          <div className={`${!detailsRendered && "h-90"}`}>
            <img
              src={postDetails.image}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </>
  );
}
