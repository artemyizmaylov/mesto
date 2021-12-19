import {
    openPopup
} from "./index.js"

const popupImage = document.querySelector('.image-popup');

export default class Card {
    constructor(items, selector) {
        this._selector = selector;
        this._name = items.name;
        this._link = items.link;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(`#${this._selector}`)
            .content
            .querySelector(`.${this._selector}`)
            .cloneNode(true);

        return cardElement;
    }

    _like() {
        this._likeButton
            .classList
            .toggle(`${this._selector}__like-button_active`);
    }

    _delete() {
        this._element.remove();
    }

    _setupPopup() {
        popupImage.querySelector('.popup__img')
            .src = this._link;
        popupImage.querySelector('.popup__img')
            .alt = this._name;
        popupImage.querySelector('.popup__img-name')
            .textContent = this._name;
    }

    _setEventListeners() {
        this._likeButton
            .addEventListener('click', () => {
                this._like();
            })

        this._element.querySelector(`.${this._selector}__trash-button`)
            .addEventListener('click', () => {
                this._delete();
            })

        this._img
            .addEventListener('click', () => {
                this._setupPopup();
                openPopup(popupImage);
            })
    }

    create() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector(`.${this._selector}__like-button`);
        this._img = this._element.querySelector(`.${this._selector}__img`)

        this._setEventListeners();

        this._element.querySelector(`.${this._selector}__name`)
            .textContent = this._name;
        this._img
            .src = this._link;
        this._img
            .alt = this._name;

        return this._element;
    }
};