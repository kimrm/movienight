import { PAGE_TITLE } from "../config.js";

export default function footer() {
  return `
    <footer class="footer">
        <div class="container">
            <p>${PAGE_TITLE} © 2020 Kim Rune Møller - <a href="contact.html">Contact us</a></p>
        </div>
    </footer>`;
}
