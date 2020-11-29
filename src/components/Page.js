import React, { useEffect } from "react";
import MainContentContainer from "./MainContentContainer";

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | React Training`;
    window.scrollTo(0, 0);
  }, [props.title]);

  return <MainContentContainer>{props.children}</MainContentContainer>;
}

export default Page;
