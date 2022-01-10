import Popup from "./Popup.js";

export default class ConfirmPopup extends Popup {
    constructor(selector) {
        super(selector);
        this._confirmButton = this._popup
            .querySelector('.popup__confirm-button')
        this._handleConfirm = this._handleConfirm.bind(this);
    }

    _handleConfirm() {
        this._confirmAction();
        this.close();
    }

    confirm(action) {
        this._confirmAction = action;
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', this._handleConfirm)
    }
}