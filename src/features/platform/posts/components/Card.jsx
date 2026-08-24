import { useContext, useState } from "react";
import { userDataContext } from "../../../../Contexts/UserDataContext";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

export default function Card({ post }) {
  const { userData } = useContext(userDataContext);
  const [postDetails, setPostDetails] = useState(post);

  return (
    <section className="space-y-3 relative overflow-hidden rounded-md! pb-6! px-5 py-4 shadow shadow-primary-400 bg-surface">
      <CardHeader
        postDetails={postDetails}
        setPostDetails={setPostDetails}
        userData={userData}
      />
      <CardBody postDetails={postDetails} />
      <CardFooter
        setPostDetails={setPostDetails}
        postDetails={postDetails}
        userData={userData}
      />
    </section>
  );
}
