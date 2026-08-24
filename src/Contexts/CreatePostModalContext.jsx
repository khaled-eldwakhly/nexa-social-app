import { useOverlayState } from "@heroui/react";
import { createContext } from "react";

export const createPostModalContext = createContext();

export default function CreatePostModalContextProvider({ children }) {
  const createPostModal = useOverlayState();

  return (
    <createPostModalContext.Provider value={{ createPostModal }}>
      {children}
    </createPostModalContext.Provider>
  );
}
