let likeButtons = document.querySelectorAll('.button_type_like');

let active = 'url("../../../images/like-active.svg")';
let disable = 'url("../../../images/like-disable.svg")';

likeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        if (button.style.backgroundImage === active) {
            button.style.backgroundImage = disable;
        } else {
            button.style.backgroundImage = active;
        };
    });
});