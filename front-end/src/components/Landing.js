import React from "react";
import JumbotronComponent from "./JumbotronComponent"
import SearchFormContainer from "./SearchFormContainer"

function Landing() {
  return (
    <div className="container" id="topContainer">
        <JumbotronComponent />
        <SearchFormContainer />
    </div>
  )
}

export default Landing
