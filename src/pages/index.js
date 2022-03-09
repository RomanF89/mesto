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


const cardList = new Section({
  items: initialCards, renderer: (item) => {
    const card = new Card({
      data: item, cardSelector: '.element-template',
      handleCardClick: () => {
        const imagePopup = new PopupWithImage(item, '.popup_type_image');
        imagePopup.openPopup();
        imagePopup.setEventListeners();
      }
    });
    const newCardElement = card.generateCard();
    cardList.addItem(newCardElement);
  }
}, '.elements');

cardList.renderItems();


// Добавление попапов с формой

const addCardFormPopup = new PopupWithForm('.popup_type_add-card', (formData) => {
  const card = new Card({
    data: formData, cardSelector: '.element-template',
    handleCardClick: () => {
      const imagePopup = new PopupWithImage(formData, '.popup_type_image');
      imagePopup.openPopup();
      imagePopup.setEventListeners();
    }

  });
  const newCardElement = card.generateCard();
  cardList.addItem(newCardElement);
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

