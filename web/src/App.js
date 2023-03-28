import React from "react";
import "./styles/App.css";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Login />} />
      <Route path="feed" element={<Feed />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
