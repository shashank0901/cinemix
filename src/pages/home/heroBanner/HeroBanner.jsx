import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); //react router dom has this feature, in a multipage application, say we have home page, search page, so if we are currently at home page and i searched for an item, then it should redirect to search page, where the results will be shown, so for that purpose we use navigate

  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming"); //ASA the data changes, useEffect hook will be called(this is done to change the background image randomly)

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]); //passed data in dependencies array

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      //   query will be variable parameter whose value will keep on changing acc to the user, what the user is searching for will be the query. that's onChange event handler will retrieve the query and set it into the query string, and we are passing that using `` and ${query}, and in the app.jsx page, we are accessing that dynamic query using '/search/:query'  , we have to use the : symbol
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show..."
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* whatever input we will give in the search box will be retrieved using this command */}
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
