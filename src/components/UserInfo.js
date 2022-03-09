export { UserInfo };

class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userDescriptionSelector = document.querySelector(userDescriptionSelector);
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
  }

}
