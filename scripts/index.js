import Card from './Card.js';
import FormValidator from "./FormValidator.js";
import {
    settings,
    initialCards
} from "./utils.js";

export {
    openPopup
};

// Массивы попапов и форм
const popups = document.querySelectorAll('.popup');
const forms = document.querySelectorAll('.popup__form');

// Переменные для работы с карточками
const cardTemplate = 'place';
const cards = document.querySelector('.places');

// Переменные для работы с профилем
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// Переменные для работы с попапом формы профиля
const popupProfile = document.querySelector('.profile-popup');

const formProfile = popupProfile.querySelector('.popup__form');
const inputName = formProfile.querySelector('.popup__input_type_name');
const inputAbout = formProfile.querySelector('.popup__input_type_about');

// Переменные для работы с попапом формы карточек
const popupPlace = document.querySelector('.place-popup');

const formCards = popupPlace.querySelector('.popup__form');
const inputPlace = formCards.querySelector('.popup__input_type_place');
const inputLink = formCards.querySelector('.popup__input_type_link');

// Попап изображения карточки
const popupImage = document.querySelector('.image-popup');

// Функции попапов
const checkKeydown = evt => {
    if (evt.key === 'Escape') {
        evt.preventDefault();

        const popup = document.querySelector('.popup_opened');

        closePopup(popup);
    }
};

const openPopup = popup => {
    document.addEventListener('keydown', checkKeydown);
    popup.classList.add('popup_opened');
};

const closePopup = popup => {
    document.removeEventListener('keydown', checkKeydown);
    popup.classList.remove('popup_opened');
};

const openProfileFrom = () => {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;

    openPopup(popupProfile);
};

const updateProfile = evt => {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;

    closePopup(popupProfile);
};

const openCardsForm = () => {
    formCards.reset();
    openPopup(popupPlace);
};

const checkPopupForClose = evt => {
    if (evt.target.classList.contains('button') || evt.target.classList.contains('popup')) {
        closePopup(evt.target.closest('.popup'));
    }
};

// Функции карточек
const insertCard = (position, card) => {
    if (position === 'first') {
        cards.prepend(card);
    } else if (position === 'last') {
        cards.append(card);
    };
};

const addNewCard = evt => {
    evt.preventDefault();

    const items = {
        name: inputPlace.value,
        link: inputLink.value
    };
    const card = new Card(items, cardTemplate, popupImage).create();
    insertCard('first', card);

    closePopup(formCards);
};

// Рендер стартовых карточек
const renderCards = () => {
    initialCards.forEach((item) => {
        const card = new Card(item, cardTemplate).create();
        insertCard('last', card);
    });
};

// Настройка форм
const setupForms = () => {
    forms.forEach(form => {
        const validation = new FormValidator(settings, form);
        validation.enableValidation();
    });
}

// Обработчики событий
buttonEdit.addEventListener('click', openProfileFrom);
buttonAdd.addEventListener('click', openCardsForm);
formProfile.addEventListener('submit', updateProfile);
formCards.addEventListener('submit', addNewCard);

popups.forEach(popup => {
    popup.addEventListener('click', checkPopupForClose);
});

// Инициализация страницы
renderCards();
setupForms();