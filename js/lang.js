let lastActiveLangItem;

let langItemElemArr = [];

function activeLangItem(obj) {
    lastActiveLangItem.classList.remove('active');
    lastActiveLangItem = obj.target;
    lastActiveLangItem.classList.add('active');
}

langItemElemArr = document.querySelectorAll('.switch-language__item');
lastActiveLangItem = langItemElemArr[0];
lastActiveLangItem.classList.add('active');

for (let i = 0; i < langItemElemArr.length; i++) {
    langItemElemArr[i].addEventListener('click', activeLangItem);
}