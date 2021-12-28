import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
    setupForms
} from "../utils/utils.js";

import {
    initialCards,
    addCardButton,
    editProfileButton
} from "../utils/constants.js"


// Основная логика
const userInfo = new UserInfo('profile__name', 'profile__about');
const imagePopup = new PopupWithImage('image-popup');

const cards = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            items: item,
            handleCardClick: () => {
                imagePopup.open({
                    name: item.name,
                    link: item.link
                })
            }
        }, 'place');

        cards.addItem(card.create());
    }
}, 'places');

const placePopup = new PopupWithForm({
    submit: (values) => {
        initialCards.unshift(values);
        cards.render();
    }
}, 'place-popup');

const profilePopup = new PopupWithForm({
    submit: (values) => {
        userInfo.setUserInfo({
            name: values['name'],
            about: values['about']
        })
    }
}, 'profile-popup');


// Слушатели
editProfileButton.addEventListener('click', () => {
    profilePopup.setInputValues(userInfo.getUserInfo());
    profilePopup.open();
});

addCardButton.addEventListener('click', () => {
    placePopup.open();
});

profilePopup.setEventListeners();
placePopup.setEventListeners();
imagePopup.setEventListeners();

// Инициализация страницы
cards.render();
setupForms();