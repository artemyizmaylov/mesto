let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonClose = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let likeButtons = document.querySelectorAll('.place__like-button');

let nameInput = formElement.querySelector('.popup__input_type_name')
let aboutInput = formElement.querySelector('.popup__input_type_about')

// Функция отслеживания записи в форму
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

// Функция открытия и закрытия попапа

buttonClose.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
})

buttonEdit.addEventListener('click', function () {
    if (popup.classList[popup.classList - 1] !== 'popup_opened') {
        popup.classList.add('popup_opened');
        nameInput.value = profileName.textContent;
        aboutInput.value = profileAbout.textContent;
    } else {
        popup.classList.remove('popup_opened');
    }
})

// Функция для работы с лайками
let active = 'place__like-button_active';
likeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        if (button.classList[button.classList.length - 1] !== active) {
            button.classList.add(active);
        } else {
            button.classList.remove(active);
        }
    })
})
