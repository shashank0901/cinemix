import React from "react";

import "./style.scss";

// this content wrapper is basically used to wrap everything that is passed inside this function into a component. like i want to add some features on multiple elements, then we can just wrap them in this container, and the styles of this container will be applied to that content too.

// like i want many things to be in the center, so whatever content i want to place at center, i will just wrap it in this contentWrapper component.
function ContentWrapper({ children }) {
  return <div className="contentWrapper">{children}</div>;
}

export default ContentWrapper;
