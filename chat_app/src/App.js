import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardMain from "./Components/Dashboard/DashboardMain";
import ErrorMain from "./Components/ErrorBoundary/ErrorMain";
import Loading from "./Components/ErrorBoundary/Loading";
import LoginMain from "./Components/Login/Login";
import RegisterMain from "./Components/Register/RegisterMain";
import Routing from "./Components/Routes/Routes";
import { useAuth } from "./Context/authStore";
import { useUtility } from "./Context/utilityStore";
let initial = true;
const App = React.memo(({ setLoading, setError }) => {
  const { isLoggedIn } = useAuth();
  const { error, loading } = useUtility();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading loading={loading} />
      <ErrorMain error={error} />
      <Routing isLoggedIn={isLoggedIn} />
    </div>
  );
});

export default App;
