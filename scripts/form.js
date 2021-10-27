let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input_type_name')
let aboutInput = formElement.querySelector('.popup__input_type_about')

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

nameInput.value = profileName.textContent
aboutInput.value = profileAbout.textContent
    
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profileName = document.querySelector('.profile__name');
    profileAbout = document.querySelector('.profile__about');

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);