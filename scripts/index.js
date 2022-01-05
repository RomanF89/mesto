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
  elementImage.alt = elementData.name;


  //Удалить карточку

  function deleteElement(e) {
    e.target.closest(".element").remove();
  }

  //Поставить/Убрать лайк

  elementLikeButton.addEventListener("click", function () {
    elementLikeButton.classList.toggle("element__like_active")
  });

  elementDeleteButoon.addEventListener("click", deleteElement);

  elementImage.addEventListener("click", function () { openImagePopup(elementImage, popupOpenImage) });

  return element;

}

//Создаём новые карточки

function renderCard(obj) {
  elements.prepend(createCard(obj));
}

initialCards.forEach(renderCard);

//Функции попапов

function openPopupWindow(popupWindow) {
  popupWindow.classList.add("popup_opened");
}

function closePopupWindow(popupWindow) {
  popupWindow.classList.remove("popup_opened");
}

function openEditPopup() {
  popupEditName.value = profileName.textContent
  popupEditDescription.value = profileDescription.textContent;
  openPopupWindow(popupEdit);
}

function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopupWindow(event.target);
  };
};

function SubmitEditPopup(evt) {
  evt.preventDefault()
  profileName.textContent = popupEditName.value;
  profileDescription.textContent = popupEditDescription.value;
  closePopupWindow(popupEdit);
}

function submitAddCardPopup(evt) {
  evt.preventDefault()
  renderCard({
    name: popupCardName.value,
    link: popupCardLink.value
  });
  closePopupWindow(popupAddCard);
  popupAddCardForm.reset();
}

//Открыть попап с картинкой

function openImagePopup(data, PopupWindowToOpen) {
  popupImage.src = data.src;
  popupImageCaption.textContent = data.alt;
  popupImage.alt = data.alt;
  openPopupWindow(PopupWindowToOpen);
}

//Cлушатели

popupEdit.addEventListener("click", closePopupOnOverlayClick);

popupEditForm.addEventListener("submit", SubmitEditPopup);

popupEditOpenButton.addEventListener("click", openEditPopup);

popupEditCloseButton.addEventListener("click", function () { closePopupWindow(popupEdit) });

popupAddCard.addEventListener("click", closePopupOnOverlayClick);

popupAddCardForm.addEventListener("submit", submitAddCardPopup);

popupAddOpenButton.addEventListener("click", function () { openPopupWindow(popupAddCard) });

popupAddCloseButton.addEventListener("click", function () { closePopupWindow(popupAddCard) });

popupOpenImage.addEventListener("click", closePopupOnOverlayClick);

popupImageCloseButton.addEventListener("click", function () { closePopupWindow(popupOpenImage) });



