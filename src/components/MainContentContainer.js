import React from "react";

function MainContentContainer(props) {
  return (
    <main className="Main">
      <div className="Container">{props.children}</div>
    </main>
  );
}

export default MainContentContainer;
