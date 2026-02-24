import React from "react";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./features/auth/auth.context";
import PostContextProvider from "./features/post/post.context";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRouter />
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
