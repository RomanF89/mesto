import { openPopupWindow, closePopupWindow } from "./index.js";
export { createCards }

const initialCards = [
  {
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

const popupOpenImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = popupOpenImage.querySelector(".popup__close-button");
const popupImage = popupOpenImage.querySelector(".popup__image");
const popupImageCaption = popupOpenImage.querySelector(".popup__image-caption");

class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._cardName = data.name;
    this._cardImageLink = data.link;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".element__mask-group").src = this._cardImageLink;
    this._cardElement.querySelector(".element__title").textContent = this._cardName;
    return this._cardElement;
  }

  _openImagePopup() {
    popupImage.src = this._cardImageLink;
    popupImageCaption.textContent = this._cardName;
    popupImage.alt = this._cardName;
    openPopupWindow(popupOpenImage);
  }

  _closeImagePopup() {
    closePopupWindow(popupOpenImage);
  }

  _setEventListeners() {
    this._cardElement.querySelector(".element__mask-group").addEventListener("click", () => { this._openImagePopup() });

    popupImageCloseButton.addEventListener("click", () => { this._closeImagePopup() });

    this._cardElement.querySelector(".element__like").addEventListener("click", () => {
      this._cardElement.querySelector(".element__like").classList.toggle("element__like_active")
    });

    this._cardElement.querySelector(".element__delete-button").addEventListener("click", (evt) => {
      evt.target.closest(".element").remove();
    });
  }


}

//Добавляем карточки

initialCards.forEach(createCards);

function createCards(item) {
  const card = new Card(item, '.element-template');
  const newCardElement = card.generateCard();
  document.querySelector('.elements').prepend(newCardElement);
}

