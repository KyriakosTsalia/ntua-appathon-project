import React from "react"
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="navbar-brand">
        <img src="medical_logo.svg" width="60" height="60" alt="Medical Science" />
      </div>
      <Link to="/" className="navbar-brand">CORD-19 Search</Link>
    </nav>
  )
}

export default Navbar
