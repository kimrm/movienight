import message from "./components/message.js";

export function toggleLoader() {
  const loader = document.querySelector(".loadingContainer");
  loader.classList.toggle("hide");
}

export function showError(err) {
  const messageContainer = document.querySelector(".message-container");
  const errorMessage = message(
    "error",
    "An error occurred while calling the API."
  );
  messageContainer.appendChild(errorMessage);
  toggleLoader();
}
