export default class Card {
    constructor({
        items,
        handleCardClick
    }, selector) {
        this._name = items.name;
        this._link = items.link;
        this._handleCardClick = handleCardClick;
        this._selector = selector;
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
                this._handleCardClick();
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