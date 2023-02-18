import axios from "axios";

const instance = axios.create({

  baseURL: "https://yournote-s.onrender.com"
});

export default instance;
