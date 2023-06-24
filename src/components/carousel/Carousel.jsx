// in this file, i will create a carousel, which will contain the images, and the rating of the movie/tv show and it's genre
// genre will be visible only int the web view but not in the mobil eview, becoz that would be too compact
// but there is a problem, that for movies and tv shows, we will have to fetch the apis from 2 diff locations, becoz they have diff apis
// so we will be using a feature called promise.all() here to get both of them at once.  and we will be doing this in the app.jsx file.

import React, { useRef } from "react";
//just like in normal js, we had selectElementbyId, etc kind of features, here in React, we have useRef, this feature selects the reference of the considered object/thing
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs"; //left and right arrow icons
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// useSelector hook is a hook react-redux library provides to get hold of any state that is maintained in the redux store.
// selector function accepts the redux state as its argument and returns a value
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ title, data, loading, endpoint }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    // 20 is some extra width due to padding etc.
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        {/* skeleton class is used for animation purpose */}
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        {/* left arrow */}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        {/* right arrow */}
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                  // when user clicks on the carousel item, he should be navigated to the details page and if you see the url of details page then it is like this only "/mediaType or endpoint/id", mediaType is there in treding api data but in popular api data, there is not mediaType that's why i added both mediaType and endpoint so that both can be handled, there is no other case apart from this.
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />{" "}
                    {/* there were many genres for each movie/show, so i sliced only 2, 2 are enough */}
                  </div>
                  <div className="textBlock">
                    {/* adding name under the movie poster */}
                    <span className="title">{item.title || item.name}</span>
                    {/* movies are have  title whereas tv shows have name, so we said that you take whatever you find*/}

                    {/* adding date under the movie poster */}
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY") ||
                        item.first_air_date}
                      {/* movies have release date, tv shows have first air date.  */}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // incase of lag in fetching of data, this loading skeleton should be shown to the user, so we are now going to design that
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
