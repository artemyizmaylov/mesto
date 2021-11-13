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

// Функция активации кнопок на карточках
function activateButtons(buttonLike, buttonTrash, image) {

    buttonTrash.addEventListener('click', () => {
        const card = buttonTrash.closest('.place');
        card.remove();
    })

    buttonLike.addEventListener('click', () => {
        const active = 'place__like-button_active';
        if (!buttonLike.classList.contains(active)) {
            buttonLike.classList.add(active);
        } else {
            buttonLike.classList.remove(active);
        }
    })

    image.addEventListener('click', () => {
        popupImagePhoto.src = image.src;
        popupImagePhoto.alt = image.alt;
        popupImageName.textContent = image.alt;

        openPopup(popupImage);
    });
};

// Функция рендера карточек
const cardTemplate = document.querySelector('#place').content;
const cards = document.querySelector('.places');

const renderCard = (item) => {
    const card = cardTemplate.cloneNode(true);
    const buttonLike = card.querySelector('.place__like-button');
    const buttonTrash = card.querySelector('.place__trash-button');

    card.querySelector('.place__name').textContent = item.name;

    const image = card.querySelector('.place__img');
    image.src = item.link;
    image.alt = item.name;

    activateButtons(buttonLike, buttonTrash, image);
    cards.prepend(card);
};

// Функции открытия и закрытия попапов
const openPopup = popup => popup.classList.add('popup_opened');
const closePopup = popup => popup.classList.remove('popup_opened');

// Реализация работы открытия и закрытия попапа редактирования профиля
const popupProfile = document.querySelector('.profile-popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonCloseEdit = popupProfile.querySelector('.popup__close-button');

buttonEdit.addEventListener('click', () => {
    openPopup(popupProfile);

    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
});

buttonCloseEdit.addEventListener('click', () => {
    closePopup(popupProfile);
});

// Реализация обновления информации профиля
const formProfile = popupProfile.querySelector('.popup__form');
const inputName = formProfile.querySelector('.popup__input_type_name');
const inputAbout = formProfile.querySelector('.popup__input_type_about');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function updateProfile(evt) {

    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;

    closePopup(popupProfile);
};

formProfile.addEventListener('submit', updateProfile);

// Реализация работы открытия и закрытия попапа редактирования карточек
const popupPlace = document.querySelector('.place-popup');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonClosePlace = popupPlace.querySelector('.popup__close-button');

buttonAdd.addEventListener('click', () => {
    openPopup(popupPlace);
});

buttonClosePlace.addEventListener('click', () => {
    closePopup(popupPlace);
});

// Реализация работы открытия и закрытия попапа просмотра фотографий
const popupImage = document.querySelector('.image-popup');
const popupImagePhoto = popupImage.querySelector('.image-popup__img');
const popupImageName = popupImage.querySelector('.image-popup__heading');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');

buttonCloseImage.addEventListener('click', () => {
    closePopup(popupImage);
});

// Реализация обновления информации карточек
const formCards = popupPlace.querySelector('.popup__form');
const inputPlace = formCards.querySelector('.popup__input_type_place');
const inputLink = formCards.querySelector('.popup__input_type_link');

function updateCards(evt) {

    evt.preventDefault();

    const card = {
        name: inputPlace.value,
        link: inputLink.value
    }

    renderCard(card);
    closePopup(popupPlace);
};

formCards.addEventListener('submit', updateCards);

// Рендер стартовых карточек
initialCards.forEach(item => renderCard(item));