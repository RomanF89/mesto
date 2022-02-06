import * as validation from "./validation.js";

import * as card from "./cards.js";

export { openPopupWindow, closePopupWindow };


const popupEdit = document.querySelector(".popup_type_edit");
const popupEditOpenButton = document.querySelector(".profile__edit-button");
const popupEditCloseButton = popupEdit.querySelector(".popup__close-button");
const popupEditForm = popupEdit.querySelector(".popup__form")
const popupEditName = document.querySelector(".popup__field_type_name");
const popupEditDescription = document.querySelector(".popup__field_type_description");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const popupAddCard = document.querySelector(".popup_type_add-card");
const popupAddOpenButton = document.querySelector(".profile__add-button");
const popupAddCloseButton = popupAddCard.querySelector(".popup__close-button");
const popupAddCardForm = popupAddCard.querySelector(".popup__form");
const popupCardName = document.querySelector(".popup__field_type_card-name");
const popupCardLink = document.querySelector(".popup__field_type_card-link");

const popupOpenImage = document.querySelector(".popup_type_image");

//Функции попапов

function openPopupWindow(popupWindow) {
  popupWindow.classList.add("popup_opened");
  document.addEventListener('keydown', checkEscKeydown);
}

function closePopupWindow(popupWindow) {
  popupWindow.classList.remove("popup_opened");
  document.removeEventListener('keydown', checkEscKeydown);
}

// Реализация закрытия по Esc

function checkEscKeydown(evt) {
  const popupWindow = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopupWindow(popupWindow);
  };
}

//Функция удаления ошибок при повторном открытии попапа

function removeErrors(form) {
  const inputs = form.querySelectorAll('.popup__field');
  inputs.forEach(function (input) {
    input.classList.remove('popup__field_type_error');
    const errorContainer = form.querySelector(`#${input.id}-error`);
    errorContainer.classList.remove('popup__error-message_visible');
    errorContainer.textContent = '';
  })

}

function openEditPopup() {
  popupEditName.value = profileName.textContent
  popupEditDescription.value = profileDescription.textContent;
  removeErrors(popupEditForm);
  openPopupWindow(popupEdit);
}

function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopupWindow(event.target);
  };
};

function submitEditPopup(evt) {
  evt.preventDefault()
  profileName.textContent = popupEditName.value;
  profileDescription.textContent = popupEditDescription.value;
  closePopupWindow(popupEdit);
}

function submitAddCardPopup(evt) {
  evt.preventDefault()
  card.createCards({
    name: popupCardName.value,
    link: popupCardLink.value
  });
  closePopupWindow(popupAddCard);
  popupAddCardForm.reset();
}


//Cлушатели

popupEdit.addEventListener("click", closePopupOnOverlayClick);

popupEditForm.addEventListener("submit", submitEditPopup);

popupEditOpenButton.addEventListener("click", openEditPopup);

popupEditCloseButton.addEventListener("click", function () { closePopupWindow(popupEdit) });

popupAddCard.addEventListener("click", closePopupOnOverlayClick);

popupAddCardForm.addEventListener("submit", submitAddCardPopup);

popupAddOpenButton.addEventListener("click", function () { openPopupWindow(popupAddCard) });

popupAddCloseButton.addEventListener("click", function () { closePopupWindow(popupAddCard) });

popupOpenImage.addEventListener("click", closePopupOnOverlayClick);


