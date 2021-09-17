import { action, makeObservable } from "mobx";
import { Auth } from "models";
import userStore from "store/user";

type UserInfo = {
  username: string;
};

class AuthStore {
  constructor() {
    makeObservable(this, {
      login: action,
      register: action,
      logout: action,
    });
  }

  login(username: string, password: string) {
    return new Promise((resolve: (userInfo: UserInfo) => void, reject: any) => {
      Auth.login(username, password)
        .then((user) => {
          userStore.pollUser();
          resolve(user.attributes.username);
        })
        .catch((error) => {
          userStore.resetUser();
          reject(error);
        });
    });
  }

  register(username: string, password: string) {
    return new Promise((resolve: (username: UserInfo) => void, reject: any) => {
      Auth.register(username, password)
        .then((user) => {
          userStore.pollUser();
          resolve(user.attributes.username);
        })
        .catch((error) => {
          userStore.resetUser();
          reject(error);
        });
    });
  }

  logout() {
    Auth.logout();
    userStore.resetUser();
  }
}

export default new AuthStore();
