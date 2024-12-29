import "./styles.css"
import {homePage} from "./home.js"
import {contactPage} from "./contact.js"
import {menuPage} from "./menu.js"

function displayPages(){
  document.addEventListener("DOMContentLoaded", () => {
    const homeButton = document.querySelector("#home"); 
    const menuButton = document.querySelector("#menu");
    const contactButton = document.querySelector("#contact");
    window.addEventListener("load", () => {
      homePage();
      homeButton.setAttribute("style", "background-color: rgba(205, 46, 46, 0.678);");
    });
    homeButton.addEventListener("click", function(){
      homePage();
      homeButton.setAttribute("style", "background-color: rgba(205, 46, 46, 0.678);");
      menuButton.setAttribute("style", "background-color: red;");
      contactButton.setAttribute("style", "background-color: red;");
    });
    menuButton.addEventListener("click", function(){
      menuPage();
      menuButton.setAttribute("style", "background-color: rgba(205, 46, 46, 0.678);");
      homeButton.setAttribute("style", "background-color: red;");
      contactButton.setAttribute("style", "background-color: red;");
    });
    contactButton.addEventListener("click", function(){
      contactPage();
      contactButton.setAttribute("style", "background-color: rgba(205, 46, 46, 0.678);");
      menuButton.setAttribute("style", "background-color: red;");
      homeButton.setAttribute("style", "background-color: red;");
    });
  });
}

displayPages();
