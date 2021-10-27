// Находим нужные кнопки
let buttonEdit = document.querySelector('.button_type_edit');
let buttonClose = document.querySelector('.button_type_close');
// Находим попап
let popup = document.querySelector('.popup');

buttonEdit.addEventListener('click', function () {
    popup.classList.add('popup_opened');
})

buttonClose.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
})