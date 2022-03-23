import { popupImage } from "../utils/constants";

export { Card };

class Card {
  constructor({ data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick }) {
    this._cardName = data.name;
    this._cardImageLink = data.link || data.description;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._cardElement.querySelector(".element__delete-button").style.display = "none";
    }

    return this._cardElement;
  }

  _openImagePopup() {
    this._handleCardClick();
  }


  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._cardElement.querySelector(".element__like-count");
    likeCountElement.textContent = this._likes.length;

    if(this.isLiked()) {
      this._likeCardElement();
    } else {
      this._deleteLikeCardElement();
    }

  }

  _likeCardElement() {
    this._cardElement.querySelector(".element__like").classList.add("element__like_active");
  }

  _deleteLikeCardElement() {
    this._cardElement.querySelector(".element__like").classList.remove("element__like_active");
  }

  deleteCardElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._cardElement.querySelector(".element__mask-group").addEventListener("click", () => { this._openImagePopup() });

    this._cardElement.querySelector(".element__like").addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });

    this._cardElement.querySelector(".element__delete-button").addEventListener("click", (evt) => {
      this._handleDeleteClick(this._id);
    });
  }
}




