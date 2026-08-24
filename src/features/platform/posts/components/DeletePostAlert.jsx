import { AlertDialog, Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostAPI } from "../services/postsAPIs";
import { toast } from "react-toastify";

export default function DeletePostAlert({
  isOpenAlert,
  setIsOpenAlert,
  postId,
  setIsOpen,
}) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => deletePostAPI(postId),
    onMutate: () => {
      setIsOpen(false);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["getPosts"] });
      queryClient.refetchQueries({
        queryKey: [
          "userPosts",
          JSON.parse(localStorage.getItem("userData"))._id,
        ],
      });
      toast.success("Post deleted");
    },
    onError: (error) => {
      toast.error(error.response.data.errors);
    },
  });

  return (
    <>
      <AlertDialog isOpen={isOpenAlert} onOpenChange={setIsOpenAlert}>
        <Button className="hidden" aria-hidden="true" tabIndex={-1} />
        <AlertDialog.Backdrop>
          <AlertDialog.Container placement="center">
            <AlertDialog.Dialog className="sm:max-w-100 rounded-lg bg-surface-hover">
              <AlertDialog.CloseTrigger
                className={"text-body bg-transparent border border-body"}
              />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading className="text-body">
                  Delete Post permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>Are you sure you want to delete this post?</p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="outline" className="border-black">
                  Cancel
                </Button>
                <Button
                  slot="close"
                  variant="danger"
                  onPress={() => deleteMutation.mutate()}
                >
                  Delete Post
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
}
