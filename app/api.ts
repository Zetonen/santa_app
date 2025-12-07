import axios from "axios";

axios.defaults.baseURL = "https://santa.fivecoins.top";

export interface loginAnswerI {
  id: number;
  name: string;
  quote: string;
  userImg: string;
  recipient: recipientI | null;
  token: string;
}

export interface recipientI {
  id: number;
  name: string;
  quote: string;
  userImg: string;
}

const setToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const removeToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};

const login = async (
  login: string,
  password: string
): Promise<loginAnswerI> => {
  const res = await axios.post("auth/login", { login, password });
  return res.data;
};

const refresh = async (token: string): Promise<loginAnswerI> => {
  setToken(token);
  try {
    const res = await axios.get("auth/refresh");
    if (!res.data) {
      removeToken();
      throw new Error("Refresh token failed: No data received.");
    }
    return res.data;
  } catch (error) {
    removeToken();
    throw error;
  }
};

export default { login, refresh, setToken, removeToken };
