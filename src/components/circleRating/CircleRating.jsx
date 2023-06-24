import React from "react";

// importing that progress bar from react's library
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// and some pre styling is done, and we have just imported it.
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircleRating = ({ rating }) => {
  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={10} //have i not given this maxValue as 10, the progress bar would be of 100 divisions and the rating would have been from 100.
        text={rating} //this is what is getting printed inside that progress bar, and we want to print the rating only that we are getting.
        // and here i have added some custom styling
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default CircleRating;
