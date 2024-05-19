import React from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  return (
    <div>
      <h2>Dashboard</h2>
      <div></div>
    </div>
  );
};

export default Dashboard;
