export default function HtmlElement(type) {
  this.element = document.createElement(type);
}

HtmlElement.prototype.setClasses = function (...classes) {
  this.element.classList.add(...classes);
  return this;
};

HtmlElement.prototype.setText = function (text) {
  this.element.textContent = text;
  return this;
};

HtmlElement.prototype.setSrc = function (src) {
  this.element.src = src;
  return this;
};

HtmlElement.prototype.setAltText = function (text) {
  this.element.alt = text;
  return this;
};

HtmlElement.prototype.setHref = function (href) {
  this.element.href = href;
  return this;
};

HtmlElement.prototype.appendChild = function (child) {
  this.element.appendChild(child);
  return this;
};

HtmlElement.prototype.appendChildren = function (...children) {
  children.forEach((child) => this.element.appendChild(child));
  return this;
};

HtmlElement.prototype.setEventListener = function (type, callback) {
  this.element.addEventListener(type, callback);
  return this;
};

HtmlElement.prototype.setDataset = function (key, value) {
  this.element.dataset[key] = value;
  return this;
};