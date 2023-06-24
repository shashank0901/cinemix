import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// i will be using infinte scrolling here
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  //we are going to apply pagination here, by default we get 20 results only for each query, but for infinite scrolling, we need to display all the responses, so we pass next page number and then next and so on till we reach the end. currently the page is 1.

  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  // here we have done some coding that fetches the data after the bydefault first 20 data items, which basically constitutes the first pag, so we are fetching the next page, but we also need to make sure that
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          //that is if there is already some data(from the first page) then keep both of them
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);
  // query is passed as the dependency here, i.e., whenever the query changes, you make an api request.
  return (
    <div className="searchResultsPage">
      {/* while it is loading, show the spinner component that we have created. */}
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>

              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item?.media_type === "person") return;

                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
