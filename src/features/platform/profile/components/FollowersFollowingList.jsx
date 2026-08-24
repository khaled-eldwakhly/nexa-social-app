import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Label, ListBox, Modal } from "@heroui/react";

export function FollowersFollowingList({
  user_name,
  followers,
  following,
  isOpen,
  setOpen,
}) {
  const list = followers || following;

  console.log(list);

  return (
    <>
      <Modal>
        <Modal.Backdrop isOpen={isOpen} onOpenChange={setOpen}>
          <Modal.Container scroll="inside">
            <Modal.Dialog className="max-w-md rounded-xl! p-4">
              <Modal.CloseTrigger />
              <Modal.Header>
                {followers ? (
                  <Modal.Heading>{user_name} Followers</Modal.Heading>
                ) : (
                  <Modal.Heading>Following by {user_name}</Modal.Heading>
                )}
              </Modal.Header>
              <Modal.Body>
                <ListBox
                  aria-label="Users"
                  className="w-full"
                  selectionMode="none"
                >
                  {list.map((listUser) => (
                    <ListBox.Item
                      key={listUser._id}
                      id={listUser._id}
                      className="group overflow-hidden pr-2"
                    >
                      <Avatar size="md">
                        <Avatar.Image
                          alt={listUser.name}
                          src={listUser.photo}
                        />
                      </Avatar>
                      <div className="flex flex-col">
                        <Label>{listUser.name}</Label>
                      </div>
                      <button className="cursor-pointer ml-auto translate-x-80 group-hover:translate-x-0 duration-300 text-blue-600">
                        {listUser.name.split(" ")[0]} profile{" "}
                        <FontAwesomeIcon icon={faAngleRight} />
                      </button>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
