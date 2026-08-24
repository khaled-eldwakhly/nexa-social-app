import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleXmark,
  faImage,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Spinner, TextArea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import profileimage from "../../../../assets/images/profile-image.png";
import { createPostModalContext } from "../../../../Contexts/CreatePostModalContext";
import { userDataContext } from "../../../../Contexts/UserDataContext";
import { createPostAPI } from "../services/postsAPIs";

export default function CreatePostModal() {
  const { userData } = useContext(userDataContext);
  const queryClient = useQueryClient();
  const { createPostModal } = useContext(createPostModalContext);

  const [userTextArea, setUserTextArea] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  const fileInput = useRef();

  function chooseFile() {
    const file = fileInput.current.files[0];
    setSelectedImage(file);
  }

  const createPostMutation = useMutation({
    mutationFn: () => {
      const postFormData = new FormData();
      if (userTextArea) {
        postFormData.append("body", userTextArea);
      }
      if (selectedImage) {
        postFormData.append("image", selectedImage);
      }
      return createPostAPI(postFormData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      createPostModal.toggle();
      setUserTextArea("");
      setSelectedImage("");
      fileInput.current.value = "";
    },
    onError: (error) => {
      toast(error?.message);
    },
  });

  return (
    <>
      <section className="">
        {/* up divition */}
        <div className="flex items-center gap-6">
          {/* modal */}
          <Modal state={createPostModal}>
            <Button className="hidden"></Button>
            <Modal.Backdrop className={""}>
              <Modal.Container size="lg" scroll="inside" placement="center">
                <Modal.Dialog className="rounded-lg!">
                  <Modal.CloseTrigger className="text-body bg-transparent border border-body" />
                  <Modal.Header className="flex-row items-center">
                    <Modal.Icon className="bg-default text-foreground">
                      {/* profile image */}
                      <div className="size-full rounded-full overflow-hidden">
                        <img
                          src={userData.photo || profileimage}
                          alt={userData.name}
                          className="object-cover size-full"
                        />
                      </div>
                    </Modal.Icon>
                    <Modal.Heading className="text-body">
                      Create an Post
                    </Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <TextArea
                      rows={selectedImage ? 1 : 7}
                      className="w-full resize-none"
                      placeholder={`What's on your mind ${userData.name} ?`}
                      onChange={(e) => setUserTextArea(e.target.value)}
                    />
                    {selectedImage && (
                      <div className="relative my-2">
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          className="p-4 mx-auto"
                        />
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="absolute top-0 right-0 text-2xl text-error cursor-pointer"
                          onClick={() => setSelectedImage("")}
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
                      className="w-full font-semibold"
                      onPress={() => createPostMutation.mutate()}
                      isPending={createPostMutation.isPending}
                      isDisabled={userTextArea === ""}
                    >
                      {createPostMutation.isPending && (
                        <Spinner className="text-white" />
                      )}
                      <span>Post</span>
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
