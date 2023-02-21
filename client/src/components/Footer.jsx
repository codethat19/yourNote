//jshint esversion: 9
import React from "react";
// import "../../public/styles.css"

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
