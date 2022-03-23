export { UserInfo };

class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatarLink }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userDescriptionSelector = document.querySelector(userDescriptionSelector);
    this._userAvatarLink = document.querySelector(userAvatarLink);
  }

  getUserInfo() {
    this._userInfo = {}
    this._userInfo.name = this._userNameSelector.textContent;
    this._userInfo.description = this._userDescriptionSelector.textContent;
    return this._userInfo;
  }

  setUserInfo(obj) {
    this._userNameSelector.textContent = obj.name;
    this._userDescriptionSelector.textContent = obj.description;
    this._userAvatarLink.src = obj.avatar;
  }

}
