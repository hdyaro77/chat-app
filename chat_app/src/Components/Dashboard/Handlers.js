import axios from "axios";

export const searchQueryHandler = (query, setResults) => {
  if (query.trim().length === 0) {
    setResults(null);
    return;
  }
  axios
    .get(`/user?query=${query}`)
    .then((res) => {
      const matchedData = res.data.data.users;
      setResults(matchedData);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchFriends = (userData, setFriends) => {
  const friends = { friends: userData?.friends };
  // if (friends.friends?.length === 0) {
  //   return;
  // }
  axios
    .post("/user/", friends)
    .then((res) => {
      console.log(res.data?.data?.users);
      setFriends(res.data?.data?.users);
    })
    .catch((err) => {
      console.log(err);
    });
};
