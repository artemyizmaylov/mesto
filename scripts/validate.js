const showInputError = (settings, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${settings.inputErrorClass}`);
    errorElement.textContent = errorMessage;
};

const hideInputError = (settings, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${settings.inputErrorClass}`);
    errorElement.textContent = '';
};

const checkInputValidity = (settings, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(settings, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(settings, formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const enableButton = (settings, buttonElement) => {
    buttonElement.classList.remove(`${settings.inactiveButtonClass}`);
    buttonElement.removeAttribute("disabled", "disabled");
};

const disableButton = (settings, buttonElement) => {
    buttonElement.classList.add(`${settings.inactiveButtonClass}`);
    buttonElement.setAttribute("disabled", "disabled");
};

const toggleButtonState = (settings, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        disableButton(settings, buttonElement);
    } else {
        enableButton(settings, buttonElement);
    }
};

const setEventListeners = (settings, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`${settings.inputSelector}`));
    const buttonElement = formElement.querySelector(`${settings.submitButtonSelector}`);

    toggleButtonState(settings, inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(settings, formElement, inputElement);
            toggleButtonState(settings, inputList, buttonElement);
        });

        formElement.addEventListener('reset', function() {
            disableButton(settings, buttonElement);
        });
    });
};

const enableValidation = settings => {
    const formList = Array.from(document.querySelectorAll(`${settings.formSelector}`));
    formList.forEach((formElement) => {
        setEventListeners(settings, formElement);
    });
};

enableValidation(settings);