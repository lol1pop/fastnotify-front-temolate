import axios from "axios";

const port = process.env.PORT || 60000;
const serverUrl = process.env.SERVER_URL || "http://localhost";
axios.defaults.baseURL = `${serverUrl}:${port}`;
