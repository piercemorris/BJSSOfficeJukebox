import React from "react";
import Link from "next/link";

const Navbar = props => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav">
        {props.navs.map(link => (
          <Link className="nav-item" href={link.url} key={link.url}>
            <li className="nav-link" key={link.title}>
              {link.title}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  </div>
);

export default Navbar;
