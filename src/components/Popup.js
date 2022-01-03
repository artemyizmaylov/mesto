export default class Popup {
    constructor(selector) {
        this._popup = document
            .querySelector(`.${selector}`);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');

        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            evt.preventDefault();
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
                this.close();
            }
        })
    }
}