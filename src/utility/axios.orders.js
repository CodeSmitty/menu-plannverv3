import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-menu-planning.firebaseio.com/",
});

export default instance;
