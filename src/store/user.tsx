import { makeObservable, observable, action, computed } from "mobx";
import { User } from "leancloud-storage";
import { Auth } from "models";

class UserStore {
  private currentUser: User | undefined;

  constructor() {
    makeObservable<UserStore, "currentUser">(this, {
      currentUser: observable,

      pollUser: action,
      resetUser: action,

      getCurrentUser: computed,
      getCurrentUserName: computed,
    });
  }

  get getCurrentUser() {
    return this.currentUser;
  }

  get getCurrentUserName() {
    return this.currentUser?.attributes.username || "";
  }

  pollUser() {
    this.currentUser = Auth.getCurrentUser();
  }

  resetUser() {
    this.currentUser = undefined;
  }
}

export default new UserStore();
