import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup
            .querySelector('.popup__img');
    }

    open({
        name,
        link
    }) {
        this._image.src = link;
        this._image.alt = name;
        this._popup
            .querySelector('.popup__img-name')
            .textContent = name;

        this._popup.classList.add('popup_opened');

        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }
}