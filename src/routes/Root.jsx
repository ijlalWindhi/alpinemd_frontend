import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./Root.css";

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
