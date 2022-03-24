export { UserInfo };

class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatarLink }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatarLink = document.querySelector(userAvatarLink);
  }

  getUserInfo() {
    this._userInfo = {}
    this._userInfo.name = this._userName.textContent;
    this._userInfo.description = this._userDescription.textContent;
    return this._userInfo;
  }

  setUserInfo(obj) {
    this._userName.textContent = obj.name;
    this._userDescription.textContent = obj.description;
    this._userAvatarLink.src = obj.avatar;
    this._userId = obj._id;
  }

}
