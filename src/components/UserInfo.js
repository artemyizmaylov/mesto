export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._name = document
            .querySelector(`.${nameSelector}`);
        this._about = document
            .querySelector(`.${aboutSelector}`);
        this._avatar = document
            .querySelector(`.${avatarSelector}`);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src,
            _id: this._id
        };
    }

    setUserInfo({
        name,
        about,
        avatar,
        _id
    }) {
        this._id = _id;
        if (name && about) {
            this._name.textContent = name;
            this._about.textContent = about;
        }
        if (avatar) {
            this._avatar.src = avatar;
        }
    }
}