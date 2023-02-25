import { validateEmail } from "../lib.js";
import contactMessage from "../components/contactMessage.js";

export default function contactPage() {
  createEvents();
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
      switch (event.target.name) {
        case "input_name":
          const nameErrorMsg = document.querySelector(".validate-error.name");
          if (event.target.value === "") {
            nameErrorMsg.textContent = "*Name is required";
          } else {
            nameErrorMsg.textContent = "";
          }
          break;
        case "input_email":
          const emailErrorMsg = document.querySelector(".validate-error.email");
          if (event.target.value !== "" && !validateEmail(event.target.value)) {
            emailErrorMsg.textContent = "*A valid e-mail address is required";
          } else {
            emailErrorMsg.textContent = "";
          }
          break;
        case "input_subject":
          const subjectErrorMsg = document.querySelector(
            ".validate-error.subject"
          );
          if (event.target.value !== "" && event.target.value.length < 10) {
            subjectErrorMsg.textContent =
              "*Subject must be minimum 10 characters";
          } else {
            subjectErrorMsg.textContent = "";
          }
          break;
        case "input_address":
          const addressErrorMsg = document.querySelector(
            ".validate-error.address"
          );
          if (event.target.value !== "" && event.target.value.length < 25) {
            addressErrorMsg.textContent =
              "*Address must be minimum 25 characters";
          } else {
            addressErrorMsg.textContent = "";
          }
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#input_name");
    const email = document.querySelector("#input_email");
    const address = document.querySelector("#input_address");
    const subject = document.querySelector("#input_subject");
    const messageContainer = document.querySelector("#message");

    const nameErrorMsg = document.querySelector(".validate-error.name");
    const emailErrorMsg = document.querySelector(".validate-error.email");
    const subjectErrorMsg = document.querySelector(".validate-error.subject");
    const addressErrorMsg = document.querySelector(".validate-error.address");

    document.querySelectorAll(".validate-error").forEach((element) => {
      element.textContent = "";
    });

    let hasErrors = false;

    if (!name.value) {
      nameErrorMsg.textContent = "*Name is required";
      hasErrors = true;
    }

    if (!validateEmail(email.value)) {
      emailErrorMsg.textContent = "*A valid e-mail address is required";
      hasErrors = true;
    }

    if (subject.value.length < 10) {
      subjectErrorMsg.textContent = "*Subject must be minimum 10 characters";
      hasErrors = true;
    }

    if (address.value.length < 25) {
      addressErrorMsg.textContent = "*Address must be minimum 25 characters";
      hasErrors = true;
    }

    if (!messageContainer.classList.contains("show")) {
      messageContainer.classList.add("show");
    }

    if (hasErrors) {
      messageContainer.innerHTML = contactMessage(
        "error",
        "Couldn't send your message. Please check for errors in the form."
      );
    } else {
      messageContainer.innerHTML = contactMessage(
        "success",
        "Your message has been sent."
      );
      document.querySelectorAll(".form-control input").forEach((input) => {
        input.value = "";
      });
    }
  });
}
