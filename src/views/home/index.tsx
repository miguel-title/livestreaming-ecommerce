import React, { useEffect } from "react";

import HeroView from "./heroview/index";
import JoinView from "./joinview/index";
import AboutView from "./aboutview/index";
import HowtoView from "./howtoview/index";
import BlogView from "./blogview/index";
import CommonLayout from "../../layout/common";
export default function Home() {
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
