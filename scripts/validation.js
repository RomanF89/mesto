
const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error-message_visible'
};


enableValidation(validationObject);


function submitForm(evt) {
  evt.preventDefault();
}

function toggleButton(form, { submitButtonSelector, inactiveButtonClass }) {
  const button = form.querySelector(submitButtonSelector);
  const isFormValid = form.checkValidity();
  if (isFormValid) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  }

  else {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', '');
  }
}

function showError(input, errorContainer, errorMessage, { inputErrorClass, errorClass }) {
  input.classList.add(inputErrorClass);
  errorContainer.classList.add(errorClass);
  errorContainer.textContent = errorMessage;
}

function hideError(input, errorContainer, { inputErrorClass, errorClass }) {
  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(errorClass);
  errorContainer.textContent = '';
}

function validateInput(form, input, classes) {
  const errorContainer = document.querySelector(`#${input.id}-error`);
  const isValid = input.validity.valid;
  const errorText = input.validationMessage;

  if (isValid) {
    hideError(input, errorContainer, classes);
  }

  else {
    showError(input, errorContainer, errorText, classes);
  }
  toggleButton(form, classes);
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach(function (form) {
    form.addEventListener('submit', submitForm);
    const inputs = form.querySelectorAll(inputSelector);

    inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        validateInput(form, input, rest);
      });
    });
    toggleButton(form, rest);
  });

  toggleButton(popupEditForm, rest)
}
