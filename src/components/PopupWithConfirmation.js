import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(selector) {
        super(selector);
        this._confirmButton = this._popup
            .querySelector('.popup__confirm-button');

        this._handleConfirm = this._handleConfirm.bind(this);
        this._handleEnterSubmit = this._handleEnterSubmit.bind(this);
    }

    _handleConfirm() {
        this._confirmAction();
        this.close();
    }

    _handleEnterSubmit(evt) {
        if (evt.key === 'Enter') {
            this._handleConfirm();
        }
    }

    open() {
        super.open();

        document.addEventListener('keydown', this._handleEnterSubmit);
    }

    close() {
        super.close();

        document.removeEventListener('keydown', this._handleEnterSubmit);
    }

    confirm(action) {
        this._confirmAction = action;
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', this._handleConfirm);
    }
}