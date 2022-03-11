import { popupImage } from "../utils/constants";

export { Card };

class Card {
  constructor({ data, cardSelector, handleCardClick }) {
    this._cardSelector = cardSelector;
    this._cardName = data.name;
    this._cardImageLink = data.link || data.description;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".element__mask-group").src = this._cardImageLink;
    this._cardElement.querySelector(".element__mask-group").alt = this._cardName;
    this._cardElement.querySelector(".element__title").textContent = this._cardName;
    return this._cardElement;
  }

  _openImagePopup() {
    this._handleCardClick();
  }

  _likeCardElement() {
    this._cardElement.querySelector(".element__like").classList.toggle("element__like_active");
  }

  _deleteCardElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._cardElement.querySelector(".element__mask-group").addEventListener("click", () => { this._openImagePopup() });

    this._cardElement.querySelector(".element__like").addEventListener("click", () => {
      this._likeCardElement();
    });

    this._cardElement.querySelector(".element__delete-button").addEventListener("click", (evt) => {
      this._deleteCardElement();
    });
  }
}




