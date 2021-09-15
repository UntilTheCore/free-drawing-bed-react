import {
  observable,
  action,
  computed,
  makeObservable,
  runInAction,
} from "mobx";

class AuthStore {
  private isLogin = false;
  private isLoading = false;
  private userInfo = {
    username: "",
    password: "",
  };

  constructor() {
    makeObservable<AuthStore, "isLogin" | "isLoading" | "userInfo">(this, {
      isLogin: observable,
      isLoading: observable,
      userInfo: observable,

      setIsLogin: action,
      setUserName: action,
      setPassword: action,
      login: action,
      register: action,
      logout: action,

      getUserName: computed,
    });
  }

  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  setUserName(username: string) {
    this.userInfo.username = username;
  }

  get getUserName() {
    return this.userInfo.username;
  }

  setPassword(password: string) {
    this.userInfo.password = password;
  }

  login() {
    console.log("登录中。。。");
    this.isLoading = true;
    setTimeout(() => {
      console.log("登录成功");
      // 需要异步执行的代码块需要在一个action中执行。
      runInAction(() => {
        this.isLogin = true;
        this.isLoading = false;
      });
    }, 1000);
  }

  register() {
    console.log("注册中。。。");
    this.isLoading = true;
    setTimeout(() => {
      console.log("注册成功");
      // 需要异步执行的代码块需要在一个action中执行。
      runInAction(() => {
        this.isLogin = true;
        this.isLoading = false;
      });
    }, 1000);
  }

  logout() {
    console.log("已注销");
  }
}

export default AuthStore;
