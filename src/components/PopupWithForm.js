import { Popup } from "./Popup.js";

export { PopupWithForm };

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitPopup) {
    super(popupSelector);
    this._handleSubmitPopup = handleSubmitPopup;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._inputList = this._popup.querySelectorAll('.popup__field');
  }

  _getInputValues() {
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
    this._popup.addEventListener('submit', (evt) => {
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

