import axios from "axios";

const instance = axios.create({

  baseURL: "myurl.com"
});

export default instance;
