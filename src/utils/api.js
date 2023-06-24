import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

// const TMDB_TOKEN = import.meta.env.VITE_APP_TMBD_TOKEN;
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTc3OGM3NDllNDIxY2NiN2Y2ZWEwZmEwZWYxYjEwNSIsInN1YiI6IjY0OGUwY2I2YzJmZjNkMDExY2I5NTRkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8zZ-ncraIeQWy5euzLZuaqD9dnZ-s1-aU-_ZCrrYfnY";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

// url is the main url or link, and params are like extra queries that we pass in to filter out data
export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
