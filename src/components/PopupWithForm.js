import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({
        submit
    }, popupSelector) {
        super(popupSelector);
        this._form = this._popup
            .querySelector('.popup__form');
        this._inputs = this._popup
            .querySelectorAll('.popup__input');
        this._submitButton = this._popup
            .querySelector('.popup__confirm-button');
        this._submit = submit;
    }

    _getInputValues() {
        this._values = {};
        this._inputs.forEach(input => this._values[input.name] = input.value);

        return this._values;
    }

    setInputValues(data) {
        Object.keys(data).forEach(key => {
            this._inputs.forEach(input => {
                if (key == input.name) {
                    input.value = data[key];
                }
            })
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isTrue, defaultText) {
        if (isTrue) {
            this._submitButton.textContent = "Сохранение..."
        } else {
            this._submitButton.textContent = defaultText;
            this.close();
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
        })
    }
}