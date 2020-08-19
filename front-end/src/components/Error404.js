import React from "react"
import Navbar from "./Navbar"

function Error404() {
  return (
    <div>
      <Navbar />
      <div className="container text-center mt-5">
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
        <h1 style={{color: "lightgray"}}>Page not found</h1>
      </div>
    </div>
  )
}

export default Error404
