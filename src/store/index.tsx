import { createContext, useContext } from "react";
import authStore from "store/auth";
import userStore from "store/user";

const context = createContext({
  AuthStore: authStore,
  userStore,
});

(window as any).store = {
  AuthStore: authStore,
  userStore,
};

// TODO 这里可以写一篇文章
// 通过闭包，扩大context的作用域。从而避免组件中使用context.Provider
// 另外，根据官方说明：只有当组件所处的树中没有匹配到 Provider 时，
// 其 defaultValue 参数才会生效。这也是为什么不在<App />组件外部用context.Provider包裹的原因，
// 由于defaultValue就是被Mobx管理的数据，且调用了 useContext 的组件总会在 context 值变化时重新渲染
// 这样就实现了响应式的渲染，即使React的组件本身并不清楚状态的改变，但React会触发UI的重新渲染！
export const useStores = () => useContext(context);
