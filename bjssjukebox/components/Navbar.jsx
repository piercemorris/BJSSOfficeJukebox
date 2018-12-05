import React from "react";
import Link from "next/link";

const Navbar = props => (
  <div>
    <nav className="navbar navbar-expand-lg">
      <img className="navbar-brand" src="static/BJSS-280x150-white.png" style={{width: 80}}/>
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
