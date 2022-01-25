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

function deleteCard(card) {
    api.deleteCard(card.getInfo()._id)
        .then(() => {
            confirmPopup.close();
            card.getElement().remove();
        })
        .catch(res => console.log('Ошибка: ', res.status))
}

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
            .then(res => {
                cards.prependItem(res);
                placePopup.close();
            })
            .catch(res => console.log('Ошибка: ', res.status))
            .finally(() => placePopup.renderLoading(false))
    }
}, 'place-popup');

const profilePopup = new PopupWithForm({
    submit: (data) => {
        profilePopup.renderLoading(true);
        api.setUser(data)
            .then(res => {
                userInfo.setUserInfo(res);
                profilePopup.close();
            })
            .catch(res => console.log('Ошибка: ', res.status))
            .finally(() => profilePopup.renderLoading(false))
    }
}, 'profile-popup');

const avatarPopup = new PopupWithForm({
    submit: (data) => {
        avatarPopup.renderLoading(true)
        api.setUserAvatar(data)
            .then(res => {
                userInfo.setUserInfo(res);
                avatarPopup.close();
            })
            .catch(res => console.log('Ошибка: ', res.status))
            .finally(() => avatarPopup.renderLoading(false))
    }
}, 'avatar-popup');

const cards = new Section({
    renderer: (item) => {
        const cardElement = new Card({
            items: item,
            user: userInfo.getUserInfo(),

            handleCardClick: (card) => {
                imagePopup.open({
                    name: card.getInfo().name,
                    link: card.getInfo().link
                });
            },

            handleLike: (card) => {
                if (!card.isLiked) {
                    api.likeCard(card.getInfo()._id)
                        .then(res => card.renderLikes(res.likes))
                        .catch(res => console.log('Ошибка: ', res.status))
                } else {
                    api.unlikeCard(card.getInfo()._id)
                        .then(res => card.renderLikes(res.likes))
                        .catch(res => console.log('Ошибка: ', res.status))
                }
            },

            handleDeleteCard: (card) => {
                confirmPopup.open();
                confirmPopup.confirm(card, deleteCard);
            }

        }, 'place');

        return cardElement.create();
    }
}, 'places');

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
    .then(api.getCards()
        .then(res => cards.renderItems(res))
        .catch(res => console.log('Ошибка: ', res.status)))
    .catch(res => console.log('Ошибка: ', res.status))

setUpForms();