import axios from "axios";
import { useAuth } from "../../Context/authStore";

export const fetchUsers = (userId, setProfile) => {
  axios
    .get(`/user?id=${userId}`)
    .then((res) => {
      const matchedData = res.data.data.users[0];
      setProfile(matchedData);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addFriendHandler = (friendID, userID, addFriend, userData, update) => {
  userData.friends.push(friendID);
  console.log(userData);
  addFriend(friendID);
  axios
    .post("/user/addFriend", { id: userID, addFriend: friendID })
    .then((res) => {
      console.log(res.data);
      // update();
    })
    .catch((err) => {
      console.log(err);
    });
};
