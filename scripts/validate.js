const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_invalid'
};

const showInputError = (obj, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${obj.inputErrorClass}`);
    errorElement.textContent = errorMessage;
};

const hideInputError = (obj, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${obj.inputErrorClass}`);
    errorElement.textContent = '';
};

const checkInputValidity = (obj, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(obj, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(obj, formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (obj, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${obj.inactiveButtonClass}`);
        buttonElement.setAttribute("disabled", "disabled");
    } else {
        buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
        buttonElement.removeAttribute("disabled", "disabled");
    }
};

const setEventListeners = (obj, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`${obj.inputSelector}`));
    const buttonElement = formElement.querySelector(`${obj.submitButtonSelector}`);

    toggleButtonState(obj, inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(obj, formElement, inputElement);
            toggleButtonState(obj, inputList, buttonElement);
        });
    });
};

const enableValidation = obj => {
    const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));
    formList.forEach((formElement) => {
        setEventListeners(obj, formElement);
    });
};

enableValidation(selectors);