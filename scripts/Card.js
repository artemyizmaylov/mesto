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
        this._element.querySelector(`.${this._selector}__like-button`)
            .classList
            .toggle(`${this._selector}__like-button_active`);
    }

    _delete() {
        this._element.remove();
    }

    _checkKeydown() {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                evt.preventDefault();

                const popup = document.querySelector('.image-popup');
                popup.classList.remove('popup_opened')
            }
        })
    }

    _openPopup() {
        const popup = document.querySelector('.image-popup');

        popup.querySelector('.popup__img')
            .src = this._link;
        popup.querySelector('.popup__img')
            .alt = this._name;
        popup.querySelector('.popup__img-name')
            .textContent = this._name;

        popup.classList.add('popup_opened');

        this._checkKeydown();
    }

    _setEventListeners() {
        this._element.querySelector(`.${this._selector}__like-button`)
            .addEventListener('click', () => {
                this._like();
            })

        this._element.querySelector(`.${this._selector}__trash-button`)
            .addEventListener('click', () => {
                this._delete();
            })

        this._element.querySelector(`.${this._selector}__img`)
            .addEventListener('click', () => {
                this._openPopup();
            })
    }

    create() {
        this._element = this._getTemplate();

        this._setEventListeners();

        this._element.querySelector(`.${this._selector}__name`)
            .textContent = this._name;
        this._element.querySelector(`.${this._selector}__img`)
            .src = this._link;
        this._element.querySelector(`.${this._selector}__img`)
            .alt = this._name;

        return this._element;
    }
};