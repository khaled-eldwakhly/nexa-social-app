import {
  faFaceSmile,
  faImage,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Spinner, TextArea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import profileimage from "../../../../assets/images/profile-image.png";
import { userDataContext } from "../../../../Contexts/UserDataContext";
import { editPostAPI } from "../services/postsAPIs";

export default function EditPostModal({
  editPostModal,
  postDetails,
  setPostDetails,
}) {
  const { userData } = useContext(userDataContext);
  const queryClient = useQueryClient();

  const [selectedImage, setSelectedImage] = useState(postDetails.image);
  const fileInput = useRef();
  const [userTextArea, setUserTextArea] = useState(postDetails.body);

  function chooseFile() {
    const file = fileInput.current.files[0];
    setSelectedImage(file);
  }

  const editPostMutation = useMutation({
    mutationFn: () => {
      const postFormData = new FormData();
      if (userTextArea) {
        postFormData.append("body", userTextArea);
      }
      if (selectedImage) {
        postFormData.append("image", selectedImage);
      }

      return editPostAPI(postFormData, postDetails._id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      setPostDetails((prev) => ({
        ...prev,
        body: data.data.post.body,
        image: data.data.post.image,
      }));
      editPostModal.toggle();
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <>
      <section className="max-w-xl hidden">
        {/* up divition */}
        <div className="flex items-center gap-6">
          {/* profile image */}
          <img
            src={userData.photo || profileimage}
            alt={userData.name}
            className="size-17 rounded-full overflow-hidden object-cover"
          />
          {/* modal */}
          <Modal state={editPostModal}>
            <Button className="hidden" aria-hidden="true" tabIndex={-1} />
            <Modal.Backdrop>
              <Modal.Container size="lg" scroll="inside" placement="center">
                <Modal.Dialog>
                  <Modal.CloseTrigger />
                  <Modal.Header className="flex-row items-center">
                    {/* profile image */}
                    <img
                      src={userData.photo || profileimage}
                      alt={userData.name}
                      className="size-11 rounded-full overflow-hidden object-cover"
                    />
                    <Modal.Heading>Edit your Post</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <TextArea
                      rows={selectedImage ? 1 : 7}
                      className="w-full resize-none"
                      defaultValue={postDetails.body}
                      onChange={(e) => setUserTextArea(e.target.value)}
                    />
                    {selectedImage && (
                      <div className="relative my-2">
                        <img
                          src={
                            selectedImage instanceof File
                              ? URL.createObjectURL(selectedImage)
                              : selectedImage
                          }
                          className="p-4 mx-auto"
                        />
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-3">
                      <Input
                        type="file"
                        id="input-image"
                        className="hidden"
                        accept="image/*"
                        ref={fileInput}
                        onChange={chooseFile}
                      />
                      <label
                        htmlFor="input-image"
                        className="cursor-pointer flex items-center gap-1"
                      >
                        <FontAwesomeIcon icon={faImage} className="text-xl" />
                      </label>
                      <FontAwesomeIcon icon={faLink} className="text-xl" />
                      <FontAwesomeIcon icon={faFaceSmile} className="text-xl" />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="w-full"
                      onPress={() => editPostMutation.mutate()}
                      isPending={editPostMutation.isPending}
                      isDisabled={userTextArea === ""}
                    >
                      {editPostMutation.isPending && (
                        <Spinner className="text-white" />
                      )}
                      <span>Save changes</span>
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </div>
      </section>
    </>
  );
}
