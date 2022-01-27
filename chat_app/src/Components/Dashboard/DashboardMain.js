import { useEffect, useState } from "react";
import ChatboxMain from "../ChatBox/ChatboxMain";
import { Dimensions } from "../HelperFiles/Dimensions";
import SearchBar from "./SearchBar";
import UserPanel from "./Userpanel/UserPanel";
import UserPanelMobile from "./Userpanel/UserPanelMobile";
import { useAuth } from "../../Context/authStore";
import ProfileMain from "../Profile/ProfileMain";
import { Route, Routes, useLocation } from "react-router-dom";
import NoRoute from "../ErrorBoundary/404";
const DashboardMain = () => {
  const { width } = Dimensions();
  const pathname = useLocation();
  const [activeChat, setActiveChat] = useState({ chatID: null, status: true, name: null });
  const [addFriend, setAddFriend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  useEffect(() => {}, []);
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <SearchBar />
      <Routes>
        <Route
          path="home/chat"
          element={<ChatboxMain setLoading={setLoading} loading={loading} activeChat={activeChat} userData={user} />}
        />
      </Routes>
      <Routes>
        <Route
          path="home/profile"
          element={<ProfileMain loading={loading} addFriend={setAddFriend} userData={user} />}
        />
      </Routes>

      {width >= 600 ? (
        <UserPanel
          activeChat={activeChat}
          setLoading={setLoading}
          userData={user}
          addFriend={addFriend}
          setActiveChat={setActiveChat}
        />
      ) : (
        <UserPanelMobile
          activeChat={activeChat}
          userData={user}
          setLoading={setLoading}
          addFriend={addFriend}
          setActiveChat={setActiveChat}
        />
      )}
    </div>
  );
};
export default DashboardMain;
