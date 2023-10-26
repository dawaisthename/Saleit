import React from "react";
import { Outlet } from "react-router-dom";

const MainHome = () => {
  return (
    <div className="space-y-2 dark:bg-gray-800 dark:text-gray-100">
      <Outlet />
    </div>
  );
};
export default MainHome;
