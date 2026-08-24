import { Input } from "@heroui/react";
import { useContext } from "react";
import { userDataContext } from "../../../../../Contexts/UserDataContext";

export default function CardWriteComment() {
  const { userData } = useContext(userDataContext);
  return (
    <>
      <div className="flex items-center gap-3 my-3">
        <div className="w-17">
          <img src={userData.photo} alt={userData.name} />
        </div>
        <Input className="w-full" placeholder="write an comment..." />
      </div>
    </>
  );
}
