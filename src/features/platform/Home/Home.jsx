import { Button } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";
import { createPostModalContext } from "../../../Contexts/CreatePostModalContext";
import { userDataContext } from "../../../Contexts/UserDataContext";
import Posts from "../posts/components/Posts";
import { getAllPostsAPI } from "../posts/services/postsAPIs";

export default function Home() {
  const {
    data: posts,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPostsAPI,
    select: (data) => data.data.data.posts,
  });

  if (error) {
    toast.errot(error.message);
  }
  const { userData } = useContext(userDataContext);
  const { createPostModal } = useContext(createPostModalContext);
  return (
    <main className="main-padding">
      <section className="section-padding">
        <div className="flex items-center gap-5 bg-surface rounded-xl p-4 mb-6 ">
          {/* profile image */}
          <div className="size-11 rounded-full overflow-hidden">
            <img
              src={userData.photo}
              alt={userData.name}
              className="object-cover size-full"
            />
          </div>
          <Button
            variant="secondary"
            className="grow bg-transparent border-2 font-main font-semibold"
            onPress={createPostModal.open}
          >
            {`What's on your mind ${userData.name} ?`}
          </Button>
        </div>
        <Posts
          posts={posts}
          isLoading={isLoading}
          error={error}
          isError={isError}
        />
      </section>
    </main>
  );
}
