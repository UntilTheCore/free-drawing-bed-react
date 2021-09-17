import React from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "store";

const Home: React.FC = observer(() => {
  const { userStore } = useStores();
  return (
    <div>
      {userStore.getCurrentUser ? (
        <div>欢迎你，{userStore.getCurrentUserName}</div>
      ) : (
        <div>用户未登录</div>
      )}
    </div>
  );
});

export default Home;
