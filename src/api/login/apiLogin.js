import axios from "axios";
import serverPath from "../serverCredential";

let spath = "";
if (process.env.NODE === "development") {
  spath = serverPath;
}

const LOGIN_API_URL = `${spath}/api/login`;

export default {
  auth(credentials) {
    return axios.post(LOGIN_API_URL, {
      email: credentials.email,
      password: credentials.password
    });
  }
};
