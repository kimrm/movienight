import { PAGE_TITLE } from "../config.js";
import htmlElement from "./htmlElement.js";

function getYear() {
  const today = new Date();
  return today.getFullYear();
}

export default function footer() {
  const linkElement = new htmlElement("a")
    .setHref("contact.html")
    .setClasses("navigation_link")
    .setText("Contact us");
  const paragraphElement = new htmlElement("p").setText(
    `${PAGE_TITLE} © ${getYear()} Kim Rune Møller`
  );
  const childElement = new htmlElement("div")
    .setClasses("container")
    .appendChild(paragraphElement.element)
    .appendChild(linkElement.element);
  const footerElement = new htmlElement("footer")
    .setClasses("footer")
    .appendChild(childElement.element);

  return footerElement.element;
}
