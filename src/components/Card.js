
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
    this._cardImage = this._cardElement.querySelector(".element__mask-group");
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = this._cardName;
    this._likeCountElement = this._cardElement.querySelector(".element__like-count");
    this._likeElement = this._cardElement.querySelector(".element__like");
    this._deleteButtonElement = this._cardElement.querySelector(".element__delete-button");
    this._cardElement.querySelector(".element__title").textContent = this._cardName;
    this._setEventListeners();
    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._deleteButtonElement.style.display = "none";
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
    this._likeCountElement.textContent = this._likes.length;

    if(this.isLiked()) {
      this._likeCardElement();
    } else {
      this._deleteLikeCardElement();
    }

  }

  _likeCardElement() {
    this._likeElement.classList.add("element__like_active");
  }

  _deleteLikeCardElement() {
    this._likeElement.classList.remove("element__like_active");
  }

  deleteCardElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => { this._openImagePopup() });

    this._likeElement.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });

    this._deleteButtonElement.addEventListener("click", (evt) => {
      this._handleDeleteClick(this._id);
    });
  }
}




