const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector(".element-template").content;

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
const popupImageCloseButton = popupOpenImage.querySelector(".popup__close-button");
const popupImage = popupOpenImage.querySelector(".popup__image");
const popupImageCaption = popupOpenImage.querySelector(".popup__image-caption");



// Добавляем новые карточки

function createCard(elementData) {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector(".element__mask-group");
  const elementTitle = element.querySelector(".element__title");
  const elementLikeButton = element.querySelector(".element__like");
  const elementDeleteButoon = element.querySelector(".element__delete-button");

  elementImage.src = elementData.link;
  elementTitle.textContent = elementData.name;

  //Открыть попап с картинкой
  function openImagePopup(e) {
    popupOpenImage.classList.add("popup_opened");
    popupImage.src = e.target.src;
    popupImageCaption.textContent = elementTitle.textContent;
  }

  //Удалить карточку
  function deleteElement(e) {
    e.target.closest(".element").remove();
  }

  //Поставить/Убрать лайк
  elementLikeButton.addEventListener("click", function () {
    elementLikeButton.classList.toggle("element__like_active")
  });

  elementDeleteButoon.addEventListener("click", deleteElement);

  elementImage.addEventListener("click", openImagePopup);

  elements.prepend(element);

}


//Создаём новые карточки

initialCards.forEach(createCard);

//Функции попапов

function openEditPopup() {
  popupEdit.classList.add("popup_opened");
  popupEditName.value = profileName.textContent
  popupEditDescription.value = profileDescription.textContent;
}

function closeEditPopup() {
  popupEdit.classList.remove("popup_opened");
}

function closeEditPopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeEditPopup();
  }
}

function SubmitEditPopup(evt) {
  evt.preventDefault()
  profileName.textContent = popupEditName.value;
  profileDescription.textContent = popupEditDescription.value;
  closeEditPopup();
}

function openAddCardPopup() {
  popupAddCard.classList.add("popup_opened");
}

function closeAddCardPopup() {
  popupAddCard.classList.remove("popup_opened");
}


function closeAddCardPopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeAddCardPopup();
  }
}

function submitAddCardPopup(evt) {
  evt.preventDefault()
  createCard({
    name: popupCardName.value,
    link: popupCardLink.value
  });
  closeAddCardPopup();
  popupAddCardForm.reset();
}

function closeImagePopup() {
  popupOpenImage.classList.remove("popup_opened");
}

function closeOpenImagePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeImagePopup();
  }
}

//Cлушатели

popupEdit.addEventListener("click", closeEditPopupOnOverlayClick);

popupEditForm.addEventListener("submit", SubmitEditPopup);

popupEditOpenButton.addEventListener("click", openEditPopup);

popupEditCloseButton.addEventListener("click", closeEditPopup);

popupAddCard.addEventListener("click", closeAddCardPopupOnOverlayClick);

popupAddCardForm.addEventListener("submit", submitAddCardPopup);

popupAddOpenButton.addEventListener("click", openAddCardPopup);

popupAddCloseButton.addEventListener("click", closeAddCardPopup);

popupOpenImage.addEventListener("click", closeOpenImagePopupOnOverlayClick);

popupImageCloseButton.addEventListener("click", closeImagePopup);


