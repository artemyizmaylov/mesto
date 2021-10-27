// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name')
let aboutInput = formElement.querySelector('.popup__input_type_about')
// Выберите элементы, которые появятся в полях ввода
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
// Вставте элементы в поля ввода
nameInput.value = profileName.textContent
aboutInput.value = profileAbout.textContent
    
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Выберите элементы, куда должны быть вставлены значения полей
    profileName = document.querySelector('.profile__name');
    profileAbout = document.querySelector('.profile__about');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    // Закрываем попап
    popup.classList.remove('popup_opened');
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);