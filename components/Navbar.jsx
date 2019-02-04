import React from "react";
import Link from "next/link";

const Navbar = ({ user, navs }) => (
  <div>
    <nav className="navbar navbar-expand-lg">
      <img className="navbar-brand" src="static/BJSS-280x150-white.png" />
      <ul className="navbar-nav mr-auto">
        {navs
          .filter(link => link.float === "left")
          .map(link => (
            <li className="nav-item" key={link.url}>
              <Link href={link.url}>
                <a className="nav-link">{link.title}</a>
              </Link>
            </li>
          ))}
      </ul>
      <ul className="navbar-nav ml-auto">
        {!user ?
          navs
            .filter(link => link.float === "right")
            .map(link => (
              <li className="nav-item" key={link.url}>
                <Link href={link.url}>
                  <a className="nav-link">{link.title}</a>
                </Link>
              </li>
            ))
          :
          <li className="nav-item">
            <Link href="#">
              <a className="nav-link">{user.username}</a>
            </Link>
          </li>
        }
      </ul>
    </nav>
  </div>
);

export default Navbar;
