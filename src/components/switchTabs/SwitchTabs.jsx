import React, { useState } from "react";

import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  //data has {"Day" and "Week"}
  const [selectedTab, setSelectedTab] = useState(0); //0 is the index of the selected tab,initially i want to set it to 0(i.e., movies)
  const [left, setLeft] = useState(0); //i will give the selected tab a diff bg, so everytime we switch bw tabs, the bg should also move, this hook is for that

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {/* data array will have the items passed from trending file's <SwitchingTabs> component */}
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
