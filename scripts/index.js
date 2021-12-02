// Массив стартовых карточек
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Массив попапов
const popups = document.querySelectorAll('.popup');

// Переменные для работы с карточками
const cardTemplate = document.querySelector('#place').content;
const cards = document.querySelector('.places');

// Переменные для работы с профилем
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// Переменные для работы с попапом профиля
const popupProfile = document.querySelector('.profile-popup');

const formProfile = popupProfile.querySelector('.popup__form');
const inputName = formProfile.querySelector('.popup__input_type_name');
const inputAbout = formProfile.querySelector('.popup__input_type_about');

// Переменные для работы с попапом карточек
const popupPlace = document.querySelector('.place-popup');

const formCards = popupPlace.querySelector('.popup__form');
const inputPlace = formCards.querySelector('.popup__input_type_place');
const inputLink = formCards.querySelector('.popup__input_type_link');

// Переменные для отображения карточек
const popupImage = document.querySelector('.image-popup');

const popupImagePhoto = popupImage.querySelector('.popup__img');
const popupImageName = popupImage.querySelector('.popup__img-name');

// Функции попапов
const keydownCheck = evt => {
    if (evt.key === 'Escape') {
        evt.preventDefault();

        const popup = document.querySelector('.popup_opened');

        closePopup(popup);
    }
};

const openPopup = popup => {
    document.addEventListener('keydown', keydownCheck);
    popup.classList.add('popup_opened');
};

const closePopup = popup => {
    document.removeEventListener('keydown', keydownCheck);
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

    closePopup(evt.target.closest('.popup'));
};

const openPlaceForm = () => {
    inputPlace.value = '';
    inputLink.value = '';

    openPopup(popupPlace);
};

const openImage = evt => {
    popupImagePhoto.src = evt.target.src;
    popupImagePhoto.alt = evt.target.alt;
    popupImageName.textContent = evt.target.alt;

    openPopup(popupImage);
};

const checkPopupForClose = evt => {
    if (evt.target.classList.contains('button') || evt.target.classList.contains('popup')) {
        closePopup(evt.target.closest('.popup'));
    }
};

// Функции карточек
const removeCard = evt => {
    const card = evt.target.closest('.place');
    card.remove();
};

const like = evt => {
    evt.target.classList.toggle('place__like-button_active');
};

const activateCardButtons = (buttonLike, buttonTrash, image) => {
    buttonTrash.addEventListener('click', removeCard);
    buttonLike.addEventListener('click', like)
    image.addEventListener('click', openImage);
};

const createCard = item => {
    const card = cardTemplate.cloneNode(true);
    const buttonLike = card.querySelector('.place__like-button');
    const buttonTrash = card.querySelector('.place__trash-button');
    const image = card.querySelector('.place__img');
    const name = card.querySelector('.place__name');

    name.textContent = item.name;
    image.src = item.link;
    image.alt = item.name;

    activateCardButtons(buttonLike, buttonTrash, image);

    return card;
};

const addNewCard = evt => {
    evt.preventDefault();

    const card = {
        name: inputPlace.value,
        link: inputLink.value
    };

    cards.prepend(createCard(card));

    closePopup(evt.target.closest('.popup'));
};

// Обработчики событий
const activateListeners = (popupsList, editBtn, addBtn, profileForm, cardsForm) => {
    editBtn.addEventListener('click', openProfileFrom);
    addBtn.addEventListener('click', openPlaceForm);
    profileForm.addEventListener('submit', updateProfile);
    cardsForm.addEventListener('submit', addNewCard);

    popupsList.forEach(popup => {
        popup.addEventListener('click', checkPopupForClose);
    });
};

// Активация всех кнопок на странице
const enableButtons = () => {
    activateListeners(popups, buttonEdit, buttonAdd, formProfile, formCards);
};

// Рендер карточек
const renderCards = () => {
    initialCards.forEach(card => cards.append(createCard(card)));
};

// Инициализация страницы
renderCards();
enableButtons();