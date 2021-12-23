const popupOpenButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form")
const popupName = document.querySelector(".popup__field_name");
const popupDescription = document.querySelector(".popup__field_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function openPopup() {
  popup.classList.add("popup_opened");
  popupName.value = profileName.textContent
  popupDescription.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    popup.classList.remove("popup_opened");
  }
}

function popupSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}

popupOpenButton.addEventListener("click", openPopup);

popupCloseButton.addEventListener("click", closePopup);

popup.addEventListener("click", closePopupOnOverlayClick);

popupForm.addEventListener("submit", popupSubmit);


