import FormValidator from "../components/FormValidator.js";

import {
    forms,
    settings
} from "../utils/constants.js"

export const setupForms = () => {
    forms.forEach(form => {
        const validation = new FormValidator(settings, form);
        validation.enableValidation();
    });
}