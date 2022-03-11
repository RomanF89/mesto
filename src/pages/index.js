import "../pages/index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js"
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import {
  popupEditOpenButton, popupEditForm, popupEditName,
  popupEditDescription,
  popupAddOpenButton, popupAddCardForm,
  initialCards, validationObject
} from "../utils/constants.js";


// Валидация форм

const newEditForm = new FormValidator(validationObject, popupEditForm);
const newCardForm = new FormValidator(validationObject, popupAddCardForm);
newEditForm.enableValidation();
newCardForm.enableValidation();


//Добавление карточек

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

function createCard(item) {
  const card = new Card({
    data: item, cardSelector: '.element-template',
    handleCardClick: () => {
      imagePopup.openPopup(item);
    }
  });
  const newCardElement = card.generateCard();
  cardList.addItem(newCardElement);
}

const cardList = new Section({
  items: initialCards, renderer: (item) => {
    createCard(item);
  }
}, '.elements');

cardList.renderItems();


// Добавление попапов с формой

const addCardFormPopup = new PopupWithForm('.popup_type_add-card', (formData) => {
  createCard(formData);
  console.log(formData);
  addCardFormPopup.closePopup();
})


const editProfileFormPopup = new PopupWithForm('.popup_type_edit', (formData) => {
  editProfileInfo.setUserInfo(formData);
  editProfileFormPopup.closePopup();
});

// Управление отображением информации о пользователе на странице

const editProfileInfo = new UserInfo({ userNameSelector: '.profile__name', userDescriptionSelector: '.profile__description' });

function setEditPopupInfo(inputObj) {
  popupEditName.value = inputObj.name;
  popupEditDescription.value = inputObj.description;
}

//Cлушатели

addCardFormPopup.setEventListeners();

editProfileFormPopup.setEventListeners();

popupEditOpenButton.addEventListener("click", function () {
  editProfileFormPopup.openPopup(), setEditPopupInfo(editProfileInfo.getUserInfo()),
    newEditForm.resetValidation()
});

popupAddOpenButton.addEventListener("click", function () { addCardFormPopup.openPopup(), newCardForm.resetValidation() });

