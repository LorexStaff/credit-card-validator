import { validateLuhn } from '../validators/luhn.js';
import { getCardSystem } from '../validators/cardSystem.js';

export default class CardForm {
  constructor() {
    this.input = document.getElementById('card-input');
    this.button = document.getElementById('validate-btn');
    this.result = document.getElementById('result');
    this.icons = document.querySelectorAll('.card-icon');
    this.init();
  }

  init() {
    this.input.addEventListener('input', () => {
      const value = this.input.value;
      const system = getCardSystem(value);
      this.updateIcons(system);
    });

    this.button.addEventListener('click', () => {
      const number = this.input.value.trim();

      if (!number) {
        this.showResult('Введите номер карты', false);
        return;
      }

      const system = getCardSystem(number);
      if (!system) {
        this.showResult('Неизвестная система', false);
        return;
      }

      const isValid = validateLuhn(number);
      if (isValid) {
        this.showResult(`Карта ${system.toUpperCase()} валидна`, true);
      } else {
        this.showResult('Неверный номер', false);
      }
    });
  }

  updateIcons(activeSystem) {
    this.icons.forEach(icon => {
      icon.classList.toggle('active', icon.dataset.system === activeSystem);
    });
  }

  showResult(text, isValid) {
    this.result.textContent = text;
    this.result.classList.remove('valid', 'invalid');
    this.result.classList.add(isValid ? 'valid' : 'invalid');
  }
}