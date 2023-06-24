// whenever i click on any carousel item, which may be a movie or tv show, then i want to show or display its details, so here i am basically making that details section.

// in the carousel file, i have added that onclick feature, so when the user clicks on any carousel item, then he is redirected/navigated to the details page.

import React from "react";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Recommendation from "./carousels/Recommendation";

import Similar from "./carousels/Similar";

const Details = () => {
  // in the carousel file, while doing onClick, we had passed 3 things, media type, endpoint and id of the movie or tv show
  const { mediaType, id } = useParams();

  // in the description page, i want to add the credits like writer director actors etc
  // that data will be fetched from a diff location : https://api.themoviedb.org/3/movie/{movie_id}/credits
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  // that data:credits etc is just aliasing, which means data is given another variable name credits and loading is given the name creditsLoading

  // and some videos related to that movie or show. from here : https://api.themoviedb.org/3/movie/{movie_id}/videos
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);

  // now i have got all the videos, where the 0th video is of the trailer(generally), and i just want that, so we passed that
  return (
    <div>
      {/* trailer of the show/movie and its crew members */}
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />

      {/* cast data */}
      <Cast data={credits?.cast} loading={creditsLoading} />

      {/* related video section  */}
      <VideosSection data={data} />

      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
  // data was returning results array which is an array of all videos on that movie/show.
  // and credits had cast and crew, i want to print crew info so accessing that only
};

export default Details;
