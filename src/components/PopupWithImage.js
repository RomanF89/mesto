export { PopupWithImage };

import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__image');

    this._popupImageCaption = this._popupSelector.querySelector(".popup__image-caption");
  }
  openPopup(data) {
    super.openPopup();
    this._cardName = data.name;
    this._cardImageLink = data.link || data.description;
    this._popupImage.src = this._cardImageLink;
    this._popupImageCaption.textContent = this._cardName;
    this._popupImage.alt = this._cardName;
  }



}
