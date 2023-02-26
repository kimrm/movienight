import htmlElement from "./htmlElement.js";

export default function message(messageType = "success", message = "") {
  const messageParagraph = new htmlElement("p");
  messageParagraph.setText(message);
  const messageElement = new htmlElement("div");
  messageElement.setClasses(messageType).appendChild(messageParagraph.element);
  return messageElement.element;
}
