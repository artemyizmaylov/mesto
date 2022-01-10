import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ConfirmPopup from '../components/ConfirmPopup.js';
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
}

// Основная логика
export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
    headers: {
        authorization: "e8e5e3a7-8ba0-46eb-8d27-e0f2fc68826d",
        'Content-Type': 'application/json'
    },
});

export const userInfo = new UserInfo(
    'profile__name',
    'profile__about',
    'profile__avatar'
);

const cards = new Section({
    items: api.getCards(),
    renderer: (item) => {
        cards.addItem(createCard(item))
    }
}, 'places');

export const confirmPopup = new ConfirmPopup('confirm-popup');

const imagePopup = new PopupWithImage('image-popup');

const placePopup = new PopupWithForm({
    submit: (values) => {
        api.addCard(values)
            .then(res => {
                cards.prependItem(createCard(res));
            })
    }
}, 'place-popup');

const profilePopup = new PopupWithForm({
    submit: (data) => {
        userInfo.setUserInfo(data);
        api.setUser(userInfo.getUserInfo())
    }
}, 'profile-popup');

const avatarPopup = new PopupWithForm({
    submit: (data) => {
        userInfo.setUserInfo(data);
        api.setUserAvatar(userInfo.getUserInfo())
    }
}, 'avatar-popup');

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
    .then(data => {
        userInfo.setUserInfo(data);
    })
cards.render();
setUpForms();