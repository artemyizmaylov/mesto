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
const buttonCloseEdit = popupProfile.querySelector('.popup__close-button');

// Переменные для работы с попапом карточек
const popupPlace = document.querySelector('.place-popup');
const formCards = popupPlace.querySelector('.popup__form');
const inputPlace = formCards.querySelector('.popup__input_type_place');
const inputLink = formCards.querySelector('.popup__input_type_link');
const buttonClosePlace = popupPlace.querySelector('.popup__close-button');

// Переменные для отображения карточек
const popupImage = document.querySelector('.image-popup');
const popupImagePhoto = popupImage.querySelector('.popup__img');
const popupImageName = popupImage.querySelector('.popup__img-name');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');

// Функции открытия и закрытия попапов
const openPopup = popup => popup.classList.add('popup_opened');
const closePopup = popup => popup.classList.remove('popup_opened');

// Функция активации кнопок на карточках
const removeCard = evt => {
    const card = evt.target.closest('.place');
    card.remove();
};

const like = evt => {
    if (evt.target.classList.contains('button')) {
        evt.target.classList.toggle('place__like-button_active');
    }
};

const openPhoto = evt => {
    popupImagePhoto.src = evt.target.src;
    popupImagePhoto.alt = evt.target.alt;
    popupImageName.textContent = evt.target.alt;

    openPopup(popupImage);
};

function activateButtons(buttonLike, buttonTrash, photo) {
    buttonTrash.addEventListener('click', removeCard);
    buttonLike.addEventListener('click', like)
    photo.addEventListener('click', openPhoto);
};

// Функция рендера карточек
function createCard(item) {
    const card = cardTemplate.cloneNode(true);
    const buttonLike = card.querySelector('.place__like-button');
    const buttonTrash = card.querySelector('.place__trash-button');
    const image = card.querySelector('.place__img');
    const name = card.querySelector('.place__name');

    name.textContent = item.name;
    image.src = item.link;
    image.alt = item.name;

    activateButtons(buttonLike, buttonTrash, image);

    return card;
};

// Функция обновления информации профиля
function updateProfile(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;

    closePopup(evt.target.closest('.popup'));
};

// Функция обновления информации карточек
function addNewCard(evt) {
    evt.preventDefault();

    const card = {
        name: inputPlace.value,
        link: inputLink.value
    };

    cards.prepend(createCard(card));

    inputPlace.value = '';
    inputLink.value = '';

    closePopup(evt.target.closest('.popup'));
};

// Обработчики событий попапа профиля
buttonEdit.addEventListener('click', (evt) => {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;

    openPopup(popupProfile);
});

buttonCloseEdit.addEventListener('click', (evt) => {
    closePopup(popupProfile);
});

formProfile.addEventListener('submit', updateProfile);

// Обработчики событий попапа редактирования карточек
buttonAdd.addEventListener('click', (evt) => {
    openPopup(popupPlace);
});

buttonClosePlace.addEventListener('click', (evt) => {
    closePopup(popupPlace);
});

// Обработчики событий попапа просмотра фотографий
buttonCloseImage.addEventListener('click', (evt) => {
    closePopup(popupImage);
});

popupImage.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('image-popup')) {
        closePopup(popupImage);
    }
});

popupProfile.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('profile-popup')) {
        closePopup(popupProfile);
    }
});

popupPlace.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('place-popup')) {
        closePopup(popupPlace);
    }
});

document.addEventListener('keydown', (evt) => {

    if (evt.key === 'Escape') {
        evt.preventDefault();

        closePopup(popupPlace);
        closePopup(popupImage);
        closePopup(popupProfile);
    }
});

formCards.addEventListener('submit', addNewCard);

// Рендер стартовых карточек
initialCards.forEach(card => cards.append(createCard(card)));