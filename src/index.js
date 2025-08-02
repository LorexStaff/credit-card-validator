import "./styles.css";
import CardForm from "./ui/CardForm.js";
import visaIcon from "./assets/visa.svg";
import mastercardIcon from "./assets/mastercard.svg";
import mirIcon from "./assets/mir.svg";

const icons = {
  visa: visaIcon,
  mastercard: mastercardIcon,
  mir: mirIcon,
};

document.addEventListener("DOMContentLoaded", () => {
  new CardForm();
  const iconsElements = document.querySelectorAll(".card-icon");

  iconsElements.forEach((img) => {
    const system = img.dataset.system;
    if (icons[system]) {
      img.src = icons[system];
    }
  });
});
