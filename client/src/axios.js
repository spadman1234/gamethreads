import axios from "axios";

const instance = axios.create({
  baseURL: "https://stormy-sea-44484.herokuapp.com/",
});

export default instance;
