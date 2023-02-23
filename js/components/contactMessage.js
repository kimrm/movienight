export default function contactMessage(messageType = "success", message = "") {
  return `
          <div class="contact-message__${messageType}">
              <p>${message}</p>
          </div>
      `;
}
