import { createContext, useContext } from "react";
import authStore from "store/auth";
import userStore from "store/user";
import imageStore from "store/image";
import historyStore from "store/history";
import { createStore } from "redux";
import { User } from "leancloud-storage";

const context = createContext({
  AuthStore: authStore,
  userStore,
  imageStore,
  historyStore,
});

// HACK store 内容数据附加到 window 上进行数据查看和跟踪
(window as any).store = {
  AuthStore: authStore,
  userStore,
  imageStore,
  historyStore,
};

// 通过闭包，扩大context的作用域。从而避免组件中使用context.Provider
// 另外，根据官方说明：只有当组件所处的树中没有匹配到 Provider 时，
// 其 defaultValue 参数才会生效。这也是为什么不在<App />组件外部用context.Provider包裹的原因，
// 由于defaultValue就是被Mobx管理的数据，且调用了 useContext 的组件总会在 context 值变化时重新渲染
// 这样就实现了响应式的渲染，即使React的组件本身并不清楚状态的改变，但React会触发UI的重新渲染！
export const useStores = () => useContext(context);

export type RootState = {
  userInfo?: User | undefined;
};

type Action = { type: "get_current_uer" };

function reducer(state: RootState = {}, action: Action) {
  const { type } = action;
  switch (type) {
    case "get_current_uer":
      return { ...state };
    default:
      return { ...state };
  }
}

export const store = createStore(reducer);
