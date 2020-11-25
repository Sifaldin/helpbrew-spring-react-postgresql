import AuthApi from '../api/AuthApi';

const tokenKey = '_token';

// Disclaimer: This simple auth implementation is for development purposes only.

class Auth {
  setLoggedIn = () => {};

  isLoggedIn() {
    return this._getToken() != null;
  }

  async login(loginData) {
    return await this._loginOrRegister(AuthApi.authenticate, loginData);
  }

  async register(registrationData) {
    return await this._loginOrRegister(AuthApi.register, registrationData);
  }

  logout() {
    this.setLoggedIn(false);
    this._clearToken();
  }

  bindLoggedInStateSetter(loggedInStateSetter) {
    this.setLoggedIn = loggedInStateSetter;
  }

  getAuthorizationHeader() {
    return 'Bearer ' + this._getToken();
  }

  async _loginOrRegister(action, data) {
    try {
      const response = await action(data);
      this._setToken(response.data.token);
      this.setLoggedIn(true);
      this.getEmail();
      return true;
    } catch (e) {
      console.error(e);
      this.setLoggedIn(false);
      return false;
    }
  }

  async getEmail() {
    try {
      const response = await AuthApi.getEmail();
      this._setUserEmail(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  _getToken() {
    return window.sessionStorage.getItem(tokenKey);
  }

  _setToken(token) {
    window.sessionStorage.setItem(tokenKey, token);
  }

  _clearToken() {
    window.sessionStorage.removeItem(tokenKey);
  }

  _setUserEmail(email) {
    window.sessionStorage.setItem('userEmail', email);
  }
}

export default new Auth();
