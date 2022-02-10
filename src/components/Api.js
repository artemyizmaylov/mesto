export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch(dir, method, data) {
    return fetch(`${this._baseUrl}/${dir}`, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  getUser() {
    return this._fetch('users/me', 'GET');
  }

  getCards() {
    return this._fetch('cards', 'GET');
  }

  setUser(data) {
    return this._fetch('users/me', 'PATCH', data);
  }

  setUserAvatar(data) {
    return this._fetch('users/me/avatar', 'PATCH', data);
  }

  addCard(data) {
    return this._fetch('cards', 'POST', data);
  }

  deleteCard(cardId) {
    return this._fetch(`cards/${cardId}`, 'DELETE');
  }

  likeCard(cardId) {
    return this._fetch(`cards/${cardId}/likes`, 'PUT');
  }

  unlikeCard(cardId) {
    return this._fetch(`cards/${cardId}/likes`, 'DELETE');
  }
}
