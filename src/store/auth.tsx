import {
  observable,
  action,
  computed,
  makeObservable,
  runInAction,
} from "mobx";
import { Auth } from "models";

type UserInfo = {
  username: string,
}

class AuthStore {
  private userInfo: UserInfo = {
    username: "",
  };

  constructor() {
    makeObservable<AuthStore, "userInfo">(this, {
      userInfo: observable,

      setUserName: action,
      login: action,
      register: action,
      logout: action,

      getUserName: computed,
    });
  }

  get getUserName() {
    return this.userInfo.username;
  }

  setUserName(username: string) {
    this.userInfo.username = username;
  }

  login(username: string, password: string) {
    return new Promise((resolve: (userInfo: UserInfo) => void, reject: any) => {
      Auth.login(username, password)
        .then((user) => {
          resolve(user.attributes.username);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  register(username: string, password: string) {
    return new Promise((resolve: (userInfo: UserInfo) => void, reject: any) => {
      Auth.register(username, password)
        .then((user) => {
          resolve(user.attributes.username);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  logout() {
    Auth.logout();
  }
}

export default AuthStore;
