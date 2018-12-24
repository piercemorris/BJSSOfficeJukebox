import React from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";

const Navbar = props => (
  <div>
    <nav className="navbar navbar-expand-lg">
      <img className="navbar-brand" src="static/BJSS-280x150-white.png"/>
      <ul className="navbar-nav">
        {props.navs.map(link => (
          <li className="nav-item" key={link.url}>
            <Link href={link.url}>
              <a className="nav-link">{link.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default Navbar;
