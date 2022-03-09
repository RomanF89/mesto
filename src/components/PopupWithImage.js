export { PopupWithImage };

import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._cardName = data.name;
    this._cardImageLink = data.link;
    this._popupImageCaption = this._popupSelector.querySelector(".popup__image-caption");
  }
  openPopup() {
    super.openPopup();
    this._popupImage.src = this._cardImageLink;
    this._popupImageCaption.textContent = this._cardName;
    this._popupImage.alt = this._cardName;
  }



}
