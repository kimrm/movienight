import message from "../components/message.js";

let nameIsValid;
let emailIsValid;
let subjectIsValid;
let addressIsValid;
const messageContainer = document.querySelector("#message");
const nameErrorMsg = document.querySelector(".validate-error.name");
const emailErrorMsg = document.querySelector(".validate-error.email");
const subjectErrorMsg = document.querySelector(".validate-error.subject");
const addressErrorMsg = document.querySelector(".validate-error.address");

export default function contactPage() {
  createEvents();
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

function checkLength(text, minLength) {
  return text.length >= minLength;
}

function validateInput(input) {
  switch (input.name) {
    case "input_name":
      nameIsValid = checkLength(event.target.value, 1);
      if (!nameIsValid) {
        nameErrorMsg.textContent = "*Name is required";
      } else {
        nameErrorMsg.textContent = "";
      }
      break;
    case "input_email":
      emailIsValid = checkEmail(event.target.value);
      if (!emailIsValid) {
        emailErrorMsg.textContent = "*A valid e-mail address is required";
      } else {
        emailErrorMsg.textContent = "";
      }
      break;
    case "input_subject":
      subjectIsValid = checkLength(event.target.value, 10);
      if (!subjectIsValid) {
        subjectErrorMsg.textContent = "*Subject must be minimum 10 characters";
      } else {
        subjectErrorMsg.textContent = "";
      }
      break;
    case "input_address":
      addressIsValid = checkLength(event.target.value, 25);
      if (!addressIsValid) {
        addressErrorMsg.textContent = "*Address must be minimum 25 characters";
      } else {
        addressErrorMsg.textContent = "";
      }
  }
}

function createEvents() {
  const contactForm = document.querySelector("#contactForm");
  const inputs = document.querySelectorAll(
    ".form-control input, .form-control textarea"
  );

  inputs.forEach((input) => {
    input.addEventListener("focus", (event) => {
      event.target.labels.forEach((label) => {
        label.classList.toggle("focus");
      });
    });
    input.addEventListener("blur", (event) => {
      event.target.labels.forEach((label) => {
        label.classList.toggle("focus");
      });
      validateInput(event.target);
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    document.querySelectorAll(".validate-error").forEach((element) => {
      element.textContent = "";
    });

    let hasErrors =
      !nameIsValid || !emailIsValid || !subjectIsValid || !addressIsValid;

    messageContainer.innerHTML = "";

    if (!messageContainer.classList.contains("show")) {
      messageContainer.classList.add("show");
    }

    if (hasErrors) {
      messageContainer.appendChild(
        message(
          "contact-message__error",
          "Couldn't send your message. Please check for errors in the form."
        )
      );
    } else {
      messageContainer.appendChild(
        message(
          "contact-message__success",
          "Thank you! Your message has been sent."
        )
      );
      document
        .querySelectorAll(".form-control input, .form-control textarea")
        .forEach((input) => {
          input.value = "";
        });
    }
  });
}
