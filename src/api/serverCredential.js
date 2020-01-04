
const port = process.env.PORT || 8084;
const serverUrl = process.env.SERVER_URL || "http://localhost";

export default `${serverUrl}:${port}`;
