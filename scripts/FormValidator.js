export { FormValidator}

class FormValidator {
  constructor(object, form) {
    this._form = form;
    this._obj = object;
    this._inputList = this._form.querySelectorAll(this._obj.inputSelector);
  }

  enableValidation() {
    this._form.addEventListener('submit', this._submitForm);
    this._form.addEventListener('reset', () => {this._disableButton()});

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
      });
    });
    this._toggleButton();

  }

  _submitForm(evt) {
    evt.preventDefault();
  }

  _validateInput(input) {
    const errorContainer = document.querySelector(`#${input.id}-error`);
    const isValid = input.validity.valid;
    const errorText = input.validationMessage;

    if (isValid) {
      this._hideError(input, errorContainer);
    }

    else {
      this._showError(input, errorContainer, errorText);
    }
    this._toggleButton();
  }

  _showError(input, errorContainer, errorMessage) {
    input.classList.add(this._obj.inputErrorClass);
    errorContainer.classList.add(this._obj.errorClass);
    errorContainer.textContent = errorMessage;
  }

  _hideError(input, errorContainer) {
    input.classList.remove(this._obj.inputErrorClass);
    errorContainer.classList.remove(this._obj.errorClass);
    errorContainer.textContent = '';
  }

  _enableButton() {
    const button = this._form.querySelector(this._obj.submitButtonSelector);
    button.classList.remove(this._obj.inactiveButtonClass);
    button.removeAttribute('disabled');
  }

  _disableButton() {
    const button = this._form.querySelector(this._obj.submitButtonSelector);
    button.classList.add(this._obj.inactiveButtonClass);
    button.setAttribute('disabled', '');
  }

  _toggleButton() {
    const isFormValid = this._form.checkValidity();
    if (isFormValid) {
      this._enableButton();
    }

    else {
      this._disableButton();
    }
  }

  resetValidation() {
    this._toggleButton();
    this._inputList.forEach((input) => {
      const errorContainer = document.querySelector(`#${input.id}-error`);
      this._hideError(input, errorContainer);
    });
  }
}








