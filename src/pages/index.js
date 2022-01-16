import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import {
    forms,
    settings,
    addCardButton,
    editProfileButton,
    editAvatarButton
} from "../utils/constants.js";

import './index.css';

// Функции
function setUpForms() {
    forms.forEach(form => {
        const validation = new FormValidator(settings, form);
        validation.enableValidation();
    });
}

function createCard(item) {
    const cardElement = new Card({
        items: item,
        handleCardClick: () => {
            imagePopup.open({
                name: item.name,
                link: item.link
            });
        }
    }, 'place');

    return cardElement.create();
};

function createSection(data) {
    const cards = new Section({
        items: data,
        renderer: (item) => {
            cards.addItem(createCard(item))
        }
    }, 'places');

    return cards;
};

// Основная логика
export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-34",
    headers: {
        authorization: "dcd995c7-2c2d-4a8b-8d07-0386baa3ce28",
        'Content-Type': 'application/json'
    },
});

export const userInfo = new UserInfo(
    'profile__name',
    'profile__about',
    'profile__avatar'
);

export const confirmPopup = new PopupWithConfirmation(
    'confirm-popup'
);

const imagePopup = new PopupWithImage(
    'image-popup'
);

const placePopup = new PopupWithForm({
    submit: (data) => {
        placePopup.renderLoading(true);
        api.addCard(data)
            .then(res => cards.prependItem(createCard(res)))
            .then(() => placePopup.renderLoading(false))
    }
}, 'place-popup');

const profilePopup = new PopupWithForm({
    submit: (data) => {
        profilePopup.renderLoading(true);
        api.setUser(data)
            .then(res => userInfo.setUserInfo(res))
            .then(() => profilePopup.renderLoading(false))
    }
}, 'profile-popup');

const avatarPopup = new PopupWithForm({
    submit: (data) => {
        avatarPopup.renderLoading(true)
        api.setUserAvatar(data)
            .then(res => userInfo.setUserInfo(res))
            .then(() => avatarPopup.renderLoading(false))
    }
}, 'avatar-popup');

const cards = createSection();

// Слушатели
editProfileButton.addEventListener('click', () => {
    profilePopup.setInputValues(userInfo.getUserInfo());
    profilePopup.open();
});

addCardButton.addEventListener('click', () => {
    placePopup.open();
});

editAvatarButton.addEventListener('click', () => {
    avatarPopup.open();
})

profilePopup.setEventListeners();
placePopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();
imagePopup.setEventListeners();

// Инициализация страницы
api.gerUser()
    .then(data => userInfo.setUserInfo(data))
    .then(() => {
        api.getCards()
            .then(data => createSection(data))
            .then(section => section.render())
    });

setUpForms();