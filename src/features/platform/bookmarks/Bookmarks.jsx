import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Posts from "../posts/components/Posts";
import { getBookmarksAPI } from "./services/bookmarksAPIs";

export default function Bookmarks() {
  const {
    data: bookmarks,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarksAPI,
    select: (data) => data.data.bookmarks,
  });

  return (
    <main className="main-padding bg-gray-100">
      <section className="max-w-2xl mx-auto py-6">
        <h2 className="font-sec text-lg flex items-center gap-2 my-3">
          My Bookmarks
          <FontAwesomeIcon
            icon={faBookmark}
            className="text-yellow-400 text-xl"
          />
        </h2>
        <Posts
          posts={bookmarks}
          error={error}
          isError={isError}
          isLoading={isLoading}
          bookmarksFlag
        />
      </section>
    </main>
  );
}
