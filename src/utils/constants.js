// Настройки: необходимые селекторы классов для валидации форм на сайте
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__confirm-button',
  inactiveButtonClass: 'popup__confirm-button_disabled',
  inputErrorClass: 'popup__input_invalid',
};

export const forms = document.querySelectorAll('.popup__form');
export const addCardButton = document.querySelector('.profile__add-button');
export const editProfileButton = document.querySelector(
  '.profile__edit-button'
);
export const editAvatarButton = document.querySelector(
  '.profile__avatar-container'
);
