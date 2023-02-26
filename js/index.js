import { PAGE_TITLE } from "./config.js";
import detailsPage from "./pages/detailsPage.js";
import indexPage from "./pages/indexPage.js";
import contactPage from "./pages/contactPage.js";
import footer from "./components/footer.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const title = document.querySelector(".logo");
const body = document.querySelector("body");

title.textContent = PAGE_TITLE;

body.appendChild(footer());

/*  
checking the url to see what page am I on
and run functions accordingly. 
I am doing this to avoid having use different js fils on each page. 
*/
const url = document.URL.toLowerCase();
switch (true) {
  case url.includes("details.html"):
    detailsPage(id);
    break;
  case url.includes("contact.html"):
    contactPage();
    break;
  default:
    indexPage();
}
