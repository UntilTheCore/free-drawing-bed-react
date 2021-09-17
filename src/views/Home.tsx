import React from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "store";
import Upload from "components/Upload";

const Home: React.FC = observer(() => {
  const { userStore } = useStores();
  return (
    <div>
      {userStore.getCurrentUser ? (
        <div>欢迎你，{userStore.getCurrentUserName}</div>
      ) : (
        <div>用户未登录</div>
      )}
      <Upload />
    </div>
  );
});

export default Home;
