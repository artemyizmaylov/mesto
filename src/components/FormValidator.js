export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;

        this._inputList = Array.from(formElement
            .querySelectorAll(`${this._settings.inputSelector}`));

        this._buttonElement = formElement
            .querySelector(`${this._settings.submitButtonSelector}`);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement
            .querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(`${this._settings.inputErrorClass}`);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement
            .querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(`${this._settings.inputErrorClass}`);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _enableButton() {
        this._buttonElement.classList.remove(`${this._settings.inactiveButtonClass}`);
        this._buttonElement.disabled = false;
    }

    _disableButton() {
        this._buttonElement.classList.add(`${this._settings.inactiveButtonClass}`);
        this._buttonElement.disabled = true;
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })

            this._formElement.addEventListener('reset', () => {
                this._disableButton();
            })
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
};