//Handles the responsive feature of the navbar
export function changeNavbarState() {
  let nav = document.getElementById("navbar-top");
  console.log(nav.classList);
  if (nav.className === "navbar-main") {
    nav.className += " responsive";
  } else {
    nav.className = "navbar-main";
  }
}

export default {
  changeNavbarState
}