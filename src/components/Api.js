export {api};

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

_checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

  getProfile() {
    return fetch(
      `${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse)
  }

  getCards() {
    return fetch(
      `${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(this._checkResponse)
  }

  editProfile(name, about) {
    return fetch(
    `${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse)
  }

  addCard(name, link) {
    return fetch(
      `${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(
      `${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(
      `${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(
      `${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(this._checkResponse)
  }

  changeProfileAvatar(avatar) {
    return fetch(
    `${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse)
  }
}

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '656fe77d-0d5d-4667-83c7-0ce1cda6be37',
    'Content-Type': 'application/json'
  }
});
