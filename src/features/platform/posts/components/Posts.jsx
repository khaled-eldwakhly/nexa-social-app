import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

export default function Posts({
  posts,
  isLoading,
  error,
  isError,
  bookmarksFlag,
}) {
  return (
    <>
      <section
        className={`flex-1 min-w-0 space-y-6 ${bookmarksFlag && "xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-5 xl:items-start"}`}
      >
        {isLoading ? (
          <>
            {[...Array(5)].map((element, index) => (
              <CardSkeleton key={index} />
            ))}
          </>
        ) : isError ? (
          <>
            <p className="xl:max-w-xl bg-red-50! border border-red-500! text-red-500 text-center">
              {error.message}
              <br />
              Please try again
            </p>
          </>
        ) : (
          posts.map((post) => <Card key={post._id} post={post} />)
        )}
      </section>
    </>
  );
}
