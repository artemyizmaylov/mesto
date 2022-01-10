import {
    userInfo,
    api
} from "../pages/index.js"

export default class Card {
    constructor({
        items,
        handleCardClick
    }, selector) {
        this._name = items.name;
        this._link = items.link;
        this._likes = items.likes;
        this._selector = selector;
        this._handleCardClick = handleCardClick;

        this._id = items._id;
        this._owner = items.owner._id;
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

    _checkOwner() {
        if (userInfo.getUserInfo()._id !== this._owner) {
            this._element.removeChild(this._trashButton)
        }
    }

    _setEventListeners() {
        this._likeButton
            .addEventListener('click', () => {
                this._like();
            })

        this._trashButton
            .addEventListener('click', () => {
                this._delete();
                api.deleteCard(this._id);
            })

        this._img
            .addEventListener('click', () => {
                this._handleCardClick();
            })
    }

    create() {
        this._element = this._getTemplate();
        this._trashButton = this._element
            .querySelector(`.${this._selector}__trash-button`)
        this._likeButton = this._element
            .querySelector(`.${this._selector}__like-button`);
        this._img = this._element
            .querySelector(`.${this._selector}__img`)

        this._setEventListeners();

        this._element
            .querySelector(`.${this._selector}__name`)
            .textContent = this._name;
        this._element
            .querySelector(`.${this._selector}__like-count`)
            .textContent = this._likes.length

        this._img.src = this._link;
        this._img.alt = this._name;

        this._checkOwner();

        return this._element;
    }
};