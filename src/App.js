import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsList from "./pages/PostsList";
import Login from "./pages/Login";
import UserHeader from "./components/UserHeader";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-100 via-purple-200 to-blue-300">
          <UserHeader />

          <div className="flex-grow flex justify-center items-center">
            <div className="w-full sm:max-w-2xl bg-white p-6 rounded-xl shadow-lg">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PostsList />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
