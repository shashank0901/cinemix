import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi"; //search icon
import { SlMenu } from "react-icons/sl"; //hamburger menu icon
import { VscChromeClose } from "react-icons/vsc"; //close icon
import { useNavigate, useLocation } from "react-router-dom"; //router-dom, becoz whenever we click on that icon, we want to go to the resp. page.

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg"; //logo

const Header = () => {
  //we will use the first and second hook to create the scrolling effect
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  // to set the effects in the mobile view, we have hamburger menu and search button, so for them we have these 3 hooks
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");

  // navigating in our application
  const navigate = useNavigate();

  const location = useLocation();

  //i added this at last, so why is this added?
  // if i am currently on the home page and i scrolled down to some location, then the curr location is that one.
  // now if i click on some link/page, then i will be navigated to that page, but the location will still be that one.
  // but we dont want that, we always want to start with window(0,0)
  // that's why we did window.scrollTo(0,0) at the start always.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    // console.log(window.scrollY); //window.scrollY tells you how much units you have scrolled in the Y direction
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide"); //hide and show are classes that have some css properties
      } else {
        setShow("show"); //so we basically add that class to the header.
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);

      // now when we redirect to the next page, the search bar still remains open, so we can close it automatically after 1 sec using setTimeout
      setTimeout(() => {
        setShowSearch(false);
      }, 200);
    }
  };

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    // conditionally class given to header, header class is applied always, but if the current view in mobileView then apply mobileView class too.
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("movie");
            }}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("tv");
            }}
          >
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
              }}
            />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* whatever input we will give in the search box will be retrieved using this command */}
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
