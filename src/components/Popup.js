export { Popup };

class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popupSelector.classList.add("popup_opened");
  }

  closePopup() {
    this._popupSelector.classList.remove("popup_opened");
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.closePopup();
      };
    });
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup();
      }
      else if (evt.target.classList.contains('popup__close-button')) {
        this.closePopup();
      }
    });
    this._handleEscClose();
  }
}


