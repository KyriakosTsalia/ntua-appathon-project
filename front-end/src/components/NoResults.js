import React from "react"

function NoResults() {
  return (
    <div className="container text-center">
      <img
        src="err_medical_logo.svg"
        width="300"
        height="300"
        alt=""
        style={{
          display: "block",
          margin: "0 auto",
        }}
      />
      <h1 style={{color: "lightgray"}}>No results found</h1>
    </div>
  )
}

export default NoResults
