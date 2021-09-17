import AV, { User } from "leancloud-storage";

AV.init({
  appId: "GgIlxGEpg1g7fCuWM80nsc3s-gzGzoHsz",
  appKey: "hs6Q9EkWT5YcFIxiSjbGB2iQ",
  serverURL: "https://ggilxgep.lc-cn-n1-shared.com",
});

const Auth = {
  register(username: string, password: string) {
    const user = new User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve: (user: User) => void, reject: any) => {
      user.signUp().then(
        (user) => resolve(user),
        (error) => reject(error)
      );
    });
  },

  login(username: string, password: string) {
    return new Promise((resolve: (user: User) => void, reject: any) => {
      User.logIn(username, password).then(
        (user) => resolve(user),
        (error) => reject(error)
      );
    });
  },

  logout() {
    User.logOut();
  },

  getCurrentUser() {
    return User.current();
  },
};

export { Auth };
