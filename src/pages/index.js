import "../pages/index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js"
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { api } from "../components/Api";
import {
  popupEditOpenButton, popupEditForm, popupEditName,
  popupEditDescription,
  popupAddOpenButton, popupAddCardForm,
  validationObject, profileAvatarContainer,
  popupAvatarEditForm
} from "../utils/constants.js";


//Получение данных профиля и карточек с сервера

let userId

api.getProfile()
  .then(res => {
    editProfileInfo.setUserInfo({name: res.name, description: res.about, avatar: res.avatar});
    userId = res._id
  });

api.getCards()
  .then(cardList => {
    cardList.reverse().forEach( data => { //Массив перевернут из-за того что при добалении карточка находится в начале, а при обновлении страницы попадает в конец
      createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      });
    })
  });



//Добавление карточек

function createCard(item) {
  const card = new Card({
    data: item, cardSelector: '.element-template',

    handleCardClick: () => {
      imagePopup.openPopup(item);
    },

    handleDeleteClick: (id) => {
      submitDeleteCardPopup.openPopup();
      submitDeleteCardPopup.changeSubmitHandler(()=> {
        api.deleteCard(id)
          .then(res => {
            submitDeleteCardPopup.closePopup()
            card.deleteCardElement()
          })
      })
    },

    handleLikeClick: (id)=> {
      if(!card.isLiked()) {
        api.addLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
      } else {
        api.deleteLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
      }
    }
  });
  const newCardElement = card.generateCard();
  cardList.addItem(newCardElement);
}

const cardList = new Section({
  items:[], renderer: (item) => {
    createCard(item);
  }
}, '.elements');


// Форма добавления карточек

const addCardFormPopup = new PopupWithForm('.popup_type_add-card', (formData) => {

  addCardFormPopup.renderLoading(true);

  api.addCard(formData.name, formData.description)
  .then(res => {
    createCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id,
      userId: userId,
      ownerId: res.owner._id
    })
  })
  .finally(() => {addCardFormPopup.renderLoading(false)})
  .then (() =>{ addCardFormPopup.closePopup()})
})

// Форма изменения данных профиля

const editProfileFormPopup = new PopupWithForm('.popup_type_edit', (formData) => {

  const {name, description} = formData;
  editProfileFormPopup.renderLoading(true);

  api.editProfile(name, description)
    .then((res)=>{
      editProfileFormPopup.renderLoading(true)
      editProfileInfo.setUserInfo({name: res.name, description: res.about, avatar: res.avatar})
    })
      .finally(() => {editProfileFormPopup.renderLoading(false)})
      .then (() =>{ editProfileFormPopup.closePopup()})
});

//Форма изменения аватара профиля

const editProfileAvatarPopup = new PopupWithForm('.popup_type_change-avatar', (formData) => {

  const {link} = formData;
  editProfileAvatarPopup.renderLoading(true);

  api.changeProfileAvatar(link)
    .then((res) => {
      editProfileInfo.setUserInfo(res);
    })
    .finally(() => {editProfileAvatarPopup.renderLoading(false)})
    .then (() =>{ editProfileAvatarPopup.closePopup()})
  });

const submitDeleteCardPopup = new PopupWithForm('.popup_type_delete-submit');

// Попап с отображением картинки с карточки

const imagePopup = new PopupWithImage('.popup_type_image');


// Управление отображением информации о пользователе на странице

const editProfileInfo = new UserInfo({ userNameSelector: '.profile__name', userDescriptionSelector: '.profile__description', userAvatarLink: '.profile__avatar' });


function setEditPopupInfo(inputObj) {
  popupEditName.value = inputObj.name;
  popupEditDescription.value = inputObj.description;
}

// Валидация форм

const newEditForm = new FormValidator(validationObject, popupEditForm);
const newCardForm = new FormValidator(validationObject, popupAddCardForm);
const newEditAvatarProfileForm = new FormValidator(validationObject, popupAvatarEditForm);
newEditForm.enableValidation();
newCardForm.enableValidation();
newEditAvatarProfileForm.enableValidation();

// Cлушатели

editProfileAvatarPopup.setEventListeners();

addCardFormPopup.setEventListeners();

editProfileFormPopup.setEventListeners();

submitDeleteCardPopup.setEventListeners();

imagePopup.setEventListeners();

popupEditOpenButton.addEventListener("click", function () {
  editProfileFormPopup.openPopup(), setEditPopupInfo(editProfileInfo.getUserInfo()),
    newEditForm.resetValidation()
});

popupAddOpenButton.addEventListener("click", function () { addCardFormPopup.openPopup(), newCardForm.resetValidation() });

profileAvatarContainer.addEventListener("click", function () { editProfileAvatarPopup.openPopup(), newEditAvatarProfileForm.resetValidation() });


