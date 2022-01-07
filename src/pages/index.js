import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

import {
    initialCards,
    forms,
    settings,
    addCardButton,
    editProfileButton,
    editAvatarButton
} from "../utils/constants.js";

import './index.css';

// Основная логика
const setupForms = () => {
    forms.forEach(form => {
        const validation = new FormValidator(settings, form);
        validation.enableValidation();
    });
}

const createCard = (item) => {
    const cardElement = new Card({
        items: item,
        handleCardClick: () => {
            imagePopup.open({
                name: item.name,
                link: item.link
            })
        }
    }, 'place');

    return cardElement.create();
}

const userInfo = new UserInfo('profile__name',
    'profile__about',
    'profile__avatar');

const imagePopup = new PopupWithImage('image-popup');

const cards = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item);
        cards.addItem(card);
    }
}, 'places');

const placePopup = new PopupWithForm({
    submit: (values) => {
        const card = createCard(values);
        cards.prependItem(card);
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

const avatarPopup = new PopupWithForm({
    submit: (values) => {
        userInfo.setUserInfo({
            avatar: values['link']
        })
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
imagePopup.setEventListeners();

// Инициализация страницы
cards.render();
setupForms();