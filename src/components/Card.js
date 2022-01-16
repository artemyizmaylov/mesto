import {
    userInfo,
    api,
    confirmPopup
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
        this._id = items._id;
        this._owner = items.owner._id;

        this._handleCardClick = handleCardClick;
        this._deleteHandler = this._deleteHandler.bind(this);
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
        this._setLike()
        this._likeButton
            .classList
            .toggle(`${this._selector}__like-button_active`);
    }

    _deleteLike() {
        api.toogleLike(this._id, 'DELETE')
            .then(res => this._likeCounter
                .textContent = res.likes.length);
    }

    _putLike() {
        api.toogleLike(this._id, 'PUT')
            .then(res => this._likeCounter
                .textContent = res.likes.length);
    }

    _setLike() {
        if (this._isLiked) {
            this._deleteLike();
        } else {
            this._putLike();
        }
        this._isLiked = !this._isLiked;
    }
    _deleteHandler() {
        api.deleteCard(this._id);
        this._element.remove();
    }

    _delete() {
        confirmPopup.open();
        confirmPopup.confirm(this._deleteHandler);
    }

    _checkOwner() {
        if (userInfo.getUserInfo()._id !== this._owner) {
            this._element.removeChild(this._trashButton)
        }
    }

    _checkUserLikes() {
        this._likes.forEach(user => {
            if (user._id === userInfo.getUserInfo()._id) {
                this._isLiked = true;
                this._likeButton
                    .classList
                    .add(`${this._selector}__like-button_active`);
            }
        })
    }

    _setEventListeners() {
        this._likeButton
            .addEventListener('click', () => {
                this._like();
            })

        this._trashButton
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

        this._elementName = this._element
            .querySelector(`.${this._selector}__name`)
        this._trashButton = this._element
            .querySelector(`.${this._selector}__trash-button`);
        this._likeButton = this._element
            .querySelector(`.${this._selector}__like-button`);
        this._img = this._element
            .querySelector(`.${this._selector}__img`);
        this._likeCounter = this._element
            .querySelector(`.${this._selector}__like-count`);

        this._elementName
            .textContent = this._name;
        this._likeCounter
            .textContent = this._likes.length

        this._img.src = this._link;
        this._img.alt = this._name;

        this._img.onerror = () => {
            this._img.src = 'https://nsk.triproom.ru/photo/big/noimage.png'
        }

        this._checkOwner();
        this._checkUserLikes();
        this._setEventListeners();

        return this._element;
    }
};