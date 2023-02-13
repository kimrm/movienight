import { validateEmail } from "../lib.js";

export default function contactPage() {
  createEvents();
}

function createEvents() {
  const submitButton = document.querySelector("#submitButton");
  const inputs = document.querySelectorAll(".form-control input");

  inputs.forEach((control) => {
    control.addEventListener("focus", (e) => {
      e.target.labels.forEach((label) => {
        label.classList.toggle("focus");
      });
    });
    control.addEventListener("blur", (e) => {
      e.target.labels.forEach((label) => {
        label.classList.toggle("focus");
      });
    });
  });

  submitButton.onclick = function (e) {
    e.preventDefault();

    const name = document.querySelector("#input_name");
    const email = document.querySelector("#input_email");
    const address = document.querySelector("#input_address");
    const subject = document.querySelector("#input_subject");
    const errorsContainer = document.querySelector("#errorsContainer");
    const successContainer = document.querySelector("#successMessage");

    errorsContainer.classList.remove("show");
    successContainer.classList.remove("show");

    let errorList = [];

    if (!name.value) {
      errorList.push("Name is required.");
    }

    if (!validateEmail(email.value)) {
      errorList.push("E-mail is required");
    }

    if (subject.value.length < 10) {
      errorList.push("Subject must be at least 10 letters.");
    }

    if (address.value.length < 25) {
      errorList.push("Address must be at least 25 letters.");
    }

    if (errorList.length) {
      const errorsList = document.querySelector("#errorsContainer ul");
      errorsList.innerHTML = "";
      errorList.forEach((error) => {
        errorsList.innerHTML += `
            <li>${error}</li>
            `;
      });
      errorsContainer.classList.add("show");
    } else {
      successContainer.innerHTML = `Thank you for your message, ${name.value}!`;
      successContainer.classList.add("show");
    }
  };
}
