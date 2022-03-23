export {
  popupEditOpenButton, popupEditForm, popupEditName,
  popupEditDescription, popupEdit, popupAddCard,
  popupAddOpenButton, popupAddCardForm,
  popupOpenImage, popupImage, popupImageCaption, validationObject, profileAvatarContainer,
  popupAvatarEditForm, popupAvatarEdit
}


const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error-message_visible'
};

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditOpenButton = document.querySelector(".profile__edit-button");
const popupEditForm = popupEdit.querySelector(".popup__form")
const popupEditName = document.querySelector(".popup__field_type_name");
const popupEditDescription = document.querySelector(".popup__field_type_description");

const popupAddCard = document.querySelector(".popup_type_add-card");
const popupAddOpenButton = document.querySelector(".profile__add-button");
const popupAddCardForm = popupAddCard.querySelector(".popup__form");

const popupOpenImage = document.querySelector(".popup_type_image");
const popupImage = popupOpenImage.querySelector(".popup__image");
const popupImageCaption = popupOpenImage.querySelector(".popup__image-caption");

const profileAvatarContainer = document.querySelector(".profile__avatar-container");
const popupAvatarEdit = document.querySelector(".popup_type_change-avatar");
const popupAvatarEditForm = popupAvatarEdit.querySelector(".popup__form");





