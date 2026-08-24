import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "./Contexts/AuthContext.jsx";
import CreatePostModalContextProvider from "./Contexts/CreatePostModalContext.jsx";
import UserDataContextProvider from "./Contexts/UserDataContext.jsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <UserDataContextProvider>
            <CreatePostModalContextProvider>
              <App />
            </CreatePostModalContextProvider>
        </UserDataContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  </StrictMode>,
);
