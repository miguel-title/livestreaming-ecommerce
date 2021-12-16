import React, { useEffect } from "react";

import HeroView from "./heroview/index";
import JoinView from "./joinview/index";
import AboutView from "./aboutview/index";
import HowtoView from "./howtoview/index";
import BlogView from "./blogview/index";
import CommonLayout from "../../layout/common";
export default function Home() {
  //Integrate the Backend
  var apiPath = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiPath}/api`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      });
  }, []);

  return (
    <CommonLayout>
      <HeroView />
      <JoinView />
      <AboutView />
      <HowtoView />
      <BlogView />
    </CommonLayout>
  );
}
