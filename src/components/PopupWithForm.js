import { Popup } from "./Popup.js";

export { PopupWithForm };

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitPopup) {
    super(popupSelector);
    this._handleSubmitPopup = handleSubmitPopup;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__field');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;

  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleSubmitPopup = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitPopup(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    }

    else  {
      this._submitButton.textContent = 'Сохранить'
    }
  }
}

