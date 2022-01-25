export default class Card {
    constructor({
        items,
        user,
        handleCardClick,
        handleLike,
        handleDeleteCard,
    }, selector) {
        this._name = items.name;
        this._link = items.link;
        this._likes = items.likes;
        this._id = items._id;

        this._owner = items.owner;
        this._user = user;

        this._selector = selector;

        this._handleCardClick = handleCardClick;
        this._handleLike = handleLike
        this._handleDeleteCard = handleDeleteCard;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(`#${this._selector}`)
            .content
            .querySelector(`.${this._selector}`)
            .cloneNode(true);

        return cardElement;
    }

    _checkUserLike(array) {
        return array.some(like => {
            return like._id === this._user._id;
        })
    }

    _checkOwner() {
        if (this._user._id !== this._owner._id) {
            this._element.removeChild(this._trashButton);
        }
    }

    _setEventListeners() {
        this._likeButton
            .addEventListener('click', () => {
                this._handleLike(this);
            })

        this._trashButton
            .addEventListener('click', () => {
                this._handleDeleteCard(this);
            })

        this._img
            .addEventListener('click', () => {
                this._handleCardClick(this);
            })
    }

    getInfo() {
        return {
            element: this._element,
            name: this._name,
            link: this._link,
            owner: this._owner,
            _id: this._id
        };
    }

    getElement() {
        return this._element;
    }

    renderLikes(array) {
        if (this._checkUserLike(array)) {
            this.isLiked = true;
            this._likeButton.classList.add('place__like-button_active');
        } else {
            this.isLiked = false;
            this._likeButton.classList.remove('place__like-button_active');
        }

        this._likeCounter
            .textContent = array.length;
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

        this._img.src = this._link;
        this._img.alt = this._name;

        this._img.onerror = () => {
            this._img.src = 'https://nsk.triproom.ru/photo/big/noimage.png';
        }

        this._checkOwner();
        this._setEventListeners();

        this.renderLikes(this._likes);

        return this._element;
    }
};