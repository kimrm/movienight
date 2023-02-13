export default function message(messageType = "success", message = "") {
  return `
        <div class="errorMessage">
            <p class="${messageType}">${message}</p>
        </div>
    `;
}
