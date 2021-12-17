const popupOpenButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form")
const popupName = document.querySelector(".popup__field-name");
const popupDescription = document.querySelector(".popup__field-description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function togglePopup() {
  popup.classList.toggle("popup_opened");
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
  togglePopup();
}

popupOpenButton.addEventListener("click", togglePopup);

popupCloseButton.addEventListener("click", togglePopup);

popup.addEventListener("click", closePopupOnOverlayClick);

popupForm.addEventListener("submit", popupSubmit);


