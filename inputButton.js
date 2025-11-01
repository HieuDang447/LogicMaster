export class InputButton {
    constructor(elementId, label) {
        this.element = document.getElementById(elementId);
        this.label = label;
        this.reset();
    }

    getValue() {
        return parseInt(this.element.dataset.value);
    }

    reset() {
        this.element.dataset.value = 0;
        this.element.textContent = `${this.label}: 0`;
        this.updateUI(0);
    }

    toggle() {
        const currentValue = this.getValue();
        const newValue = 1 - currentValue;

        this.element.dataset.value = newValue;
        this.element.textContent = `${this.label}: ${newValue}`;

        this.updateUI(newValue);
    }

    updateUI(value) {
        this.element.classList.toggle('on', value === 1);
        this.element.classList.toggle('off', value === 0);
    }

    addEventListener(eventType, handler) {
        this.element.addEventListener(eventType, handler);
    }
}
