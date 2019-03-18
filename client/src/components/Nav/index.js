import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Book Search
      </a>
      <a className="nav-link" style={{ color: 'white' }} href="/">
        Search
      </a>
      <a className="nav-link" style={{ color: 'white' }} href="/saved">
        View Saved Books
      </a>
    </nav>
  );
}

export default Nav;
