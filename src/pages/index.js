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


  Promise.all([api.getProfile(), api.getCards()])
    .then(([res, cards]) => {

      //Получение данных профиля
      editProfileInfo.setUserInfo({name: res.name, description: res.about, avatar: res.avatar, _id: res._id});
      userId = res._id;

      //Отрисовка карточек
      cardList.renderItems(cards.reverse())
    })
      .catch(err => {
        console.log(err)
      })

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
          .catch(err => {
            console.log(err)
          })
      })
    },

    handleLikeClick: (id)=> {
      if(!card.isLiked()) {
        api.addLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        api.deleteLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  });
  const newCardElement = card.generateCard();
  cardList.addItem(newCardElement);
}

const cardList = new Section({
    renderer: (data) => {
    createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id
    });
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
    });
    addCardFormPopup.closePopup();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {addCardFormPopup.renderLoading(false)})

})

// Форма изменения данных профиля

const editProfileFormPopup = new PopupWithForm('.popup_type_edit', (formData) => {

  const {name, description} = formData;
  editProfileFormPopup.renderLoading(true);

  api.editProfile(name, description)
    .then((res)=>{
      editProfileInfo.setUserInfo({name: res.name, description: res.about, avatar: res.avatar, _id: res._id});
      editProfileFormPopup.closePopup();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {editProfileFormPopup.renderLoading(false)})

});

//Форма изменения аватара профиля

const editProfileAvatarPopup = new PopupWithForm('.popup_type_change-avatar', (formData) => {

  const {link} = formData;
  editProfileAvatarPopup.renderLoading(true);

  api.changeProfileAvatar(link)
    .then((res) => {
      editProfileInfo.setUserInfo({name: res.name, description: res.about, avatar: res.avatar, _id: res._id});
      editProfileAvatarPopup.closePopup();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {editProfileAvatarPopup.renderLoading(false)})
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

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validationObject);

// Cлушатели

editProfileAvatarPopup.setEventListeners();

addCardFormPopup.setEventListeners();

editProfileFormPopup.setEventListeners();

submitDeleteCardPopup.setEventListeners();

imagePopup.setEventListeners();

popupEditOpenButton.addEventListener("click", function () {
  editProfileFormPopup.openPopup();
  setEditPopupInfo(editProfileInfo.getUserInfo());
  formValidators['popup-form_edit'].resetValidation();
});

popupAddOpenButton.addEventListener("click", function () {
  addCardFormPopup.openPopup();
  formValidators['popup-form_add-card'].resetValidation();
});

profileAvatarContainer.addEventListener("click", function () {
  editProfileAvatarPopup.openPopup();
  formValidators['popup-form_change-avatar'].resetValidation();
 });



