import { I as IMask } from "./vendor.js";
const main = "";
const About = "";
const Ava = "";
const Form = "";
function script() {
  const el = document.querySelector(".form");
  if (!el)
    return;
  const contentEl = el.querySelector(".form__content");
  const inputEl = el.querySelector(".form__input");
  if (inputEl.type === "tel") {
    const phoneMask = IMask(inputEl, {
      mask: "+{7} 000 000 00-00"
    });
    contentEl.addEventListener("submit", (e) => {
      if (!phoneMask.masked.isComplete) {
        e.preventDefault();
        inputEl.focus();
      }
    });
  }
}
{
  script();
}
const Social = "";
