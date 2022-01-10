import Popup from "./Popup.js";

export default class ConfirmPopup extends Popup {
    constructor(selector) {
        super(selector);
        this._confirmButton = this._popup
            .querySelector('.popup__confirm-button')
    }
}