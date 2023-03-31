import {} from "dotenv/config";
import axios from "axios";

const login = async (username, password) => {
  try {
    if (!username || !password) {
      return JSON.stringify({ message: "Username and password are required" });
    }
    const response = await axios.post("http://authservice:4000/login", {
      username: username,
      password: password,
    });
    return response;
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: error });
  }
};

const register = async (username, password) => {
  try {
    if (!username || !password) {
      return JSON.stringify({ message: "Username and password are required" });
    }
    const response = await axios.post("http://authservice:4000/register", {
      username: username,
      password: password,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: error });
  }
};

export const authGate = { login, register };
