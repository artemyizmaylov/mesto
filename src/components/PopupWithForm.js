import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({
        submit
    }, popupSelector) {
        super(popupSelector);
        this._submit = submit;

        this._form = this._popup
            .querySelector('.popup__form');
        this._inputs = this._popup
            .querySelectorAll('.popup__input');
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
                };
            })
        })
    }

    close() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });

        this._form.reset();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submit(this._getInputValues());
            this.close();
        })

        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
                this.close();
            }
        })
    }
}