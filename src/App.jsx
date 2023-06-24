import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";

import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  //useDispatch ka instance create kr liya
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  //this hook is used to call the api.
  // but everytime we have to call the api, these 2 methods/functions will have to be formed, so we have created a separte file for that using which we can do this
  // so basically we are making a custom hook, to make this job easier.

  useEffect(() => {
    fetchApiConfig(); //invoked the api testing function which is making a fetch req to the api
    genresCall();
  }, []); //this [] brackets represent dependencies(currently we have passed none)

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      //a complete url to access a image looks like this, for a backdrop: it is the combination of secure_base_url + "original"
      // we have to learn all these from the api guide
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  // we want to display the genres of movies and tv shows in the web view.(not in mobile view) but they have different apis, so we would be using promise.all to fetch both of them.

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"]; //these are the 2 endpoints
    let allGenres = {}; //i made this object to store all the Genres info, every genre has an id and a name corresponding to it. when we call the api, then the details of the movie/show it returns has the genre id but not the name, that's why we have simply made a storage place where we have stored all the genres with id:"name" so that we can directly access the genre name from the id that we are getting from the api.

    endPoints.forEach((url) => {
      // ran a loop on endPoints array, with iterator = url, once url will be "tv" and then "movie", and then we push the data in the promises array.
      promises.push(fetchDataFromApi(`/genre/${url}/list`)); // this is what the url is like to fetch data from the resp api. as from the documentation of the TMDB api
    });

    //promise.all method
    // Promise.all is very useful here becoz it will not return anything till it doesn't get the response from both(all) API calls, and not just any one/some of them.
    const data = await Promise.all(promises);

    console.log(data);

    // now storing the genres in the genres obj where each item will be an id and the corresponding name of the genre
    // from the api, currently there are basically 16 types of genres, so the array size is 16, now each index of the array has an id and name, so what we are doing is, in the allGenres object, i will store this data (id and name) at each index against this id only, like suppose at index 3 of the api's array, we have [id:99 and name = 'comedy'] so in the allGenres{} object, i will be storing it like this :
    // allGenres {
    //   99: {id:99, name:'comedy'}
    // }
    // that is i am storing the data agains the id of the data itself,
    // becoz the info i am getting from the api call has the genre id already, so i will have the id, now i can access the name corresp to it becoz that's what i want to print.
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres)); //getGenres method is defined in the homeSlice.jsx file and we have imported it from there in this file
  };

  return (
    <BrowserRouter>
      <Header />
      {/* inside routes, we will give the routes of all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
