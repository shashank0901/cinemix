import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const Genres = ({ data }) => {
  //data = genre_ids
  const { genres } = useSelector((state) => state.home);
  // so genres now has all the data of genres that i have stored in home
  return (
    <div className="genres">
      {/* data is the array that contains all the genre ids of the movie/show and we are iterating on it, with an object 'g', so each 'g' is a genre_id and using this we can access the genres name that is stored in the genres object => genres[g].name */}
      {data?.map((g) => {
        if (!genres[g]?.name) return;

        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
