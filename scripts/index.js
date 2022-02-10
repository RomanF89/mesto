import { FormValidator} from "./FormValidator.js";
import { Card } from "./Card.js";
import {
  popupEdit, popupEditOpenButton, popupEditForm, popupEditName,
  popupEditDescription, profileName, profileDescription, popupAddCard,
  popupAddOpenButton, popupAddCardForm, popupCardName, popupCardLink,
  initialCards, validationObject
} from "./constants.js";

export { openPopupWindow, closePopupWindow };


//Функции попапов

function openPopupWindow(popupWindow) {
  popupWindow.classList.add("popup_opened");
  document.addEventListener('keydown', checkEscKeydown);
}

function closePopupWindow(popupWindow) {
  popupWindow.classList.remove("popup_opened");
  document.removeEventListener('keydown', checkEscKeydown);
}

function openEditPopup() {
  popupEditName.value = profileName.textContent
  popupEditDescription.value = profileDescription.textContent;
  openPopupWindow(popupEdit);
}


function submitEditPopup(evt) {
  evt.preventDefault()
  profileName.textContent = popupEditName.value;
  profileDescription.textContent = popupEditDescription.value;
  closePopupWindow(popupEdit);
}

function submitAddCardPopup(evt) {
  evt.preventDefault()
  addCard({
    name: popupCardName.value,
    link: popupCardLink.value
  });
  closePopupWindow(popupAddCard);
  popupAddCardForm.reset();
}

// Реализация закрытия по Esc

function checkEscKeydown(evt) {
  if (evt.key === 'Escape') {
    const popupWindow = document.querySelector('.popup_opened');
    closePopupWindow(popupWindow);
  };
}

// Универсальная функция закрытия попапов
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopupWindow(popup);
    }
    else if (evt.target.classList.contains('popup__close-button')) {
      closePopupWindow(popup);
    }
  })
})

// Валидация форм

const newEditForm = new FormValidator(validationObject, popupEditForm);
const newCardForm = new FormValidator(validationObject, popupAddCardForm);
newEditForm.enableValidation();
newCardForm.enableValidation();


//Добавление карточек

initialCards.forEach(addCard);

function createCard(item) {
  const card = new Card(item, '.element-template');
  const newCardElement = card.generateCard();
  return newCardElement;
}

function addCard(obj) {
  document.querySelector('.elements').prepend(createCard(obj));
}


//Cлушатели

popupEditForm.addEventListener("submit", submitEditPopup);

popupEditOpenButton.addEventListener("click", function () { openEditPopup(), newEditForm.resetValidation() });

popupAddCardForm.addEventListener("submit", submitAddCardPopup);

popupAddOpenButton.addEventListener("click", function () { openPopupWindow(popupAddCard)});







