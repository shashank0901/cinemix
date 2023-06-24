import React, { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie"); //we have to pass this to the api call and api is taking "day" or anything in small caps

  const { data, loading } = useFetch(`/${endpoint}/top_rated`); //as in documentation

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
        {/* we have used an array for data going to switch tabs, 
        like currently we have kept to switch bw either Day or Week, 
        so we could have used just these 2, but if we want to keep it 
        dynamic, the array like initialization will be helpful.
        the 2 values(data) that we have passed here(day and week) and the onTabChange method, 
        we can access that in the switch tab jsx file, and can use it there*/}
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
      {/* ?. = optional chaining */}
    </div>
  );
};

export default TopRated;
