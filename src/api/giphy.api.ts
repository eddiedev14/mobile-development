import axios from "axios";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const giphyApi = axios.create({
  baseURL: "https://api.giphy.com/v1/gifs",
  params: {
    api_key: API_KEY,
    lang: "es",
  },
  timeout: 10000,
});
