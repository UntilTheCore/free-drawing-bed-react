import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MyRouter from "router";
import Header from "components/Header";
import Footer from "components/Footer";
import Loading from "components/Loading";
import Center from "components/Center";
import { useStores } from "store";

function App() {
  const { userStore } = useStores();
  // 在页面每次加载时，都主动获取一次用户信息，防止用户强刷后页面用户信息丢失。
  userStore.pollUser();

  return (
    <Router>
      <div>
        <Header />
        <Suspense fallback={<Loading />}>
          <Center>
            <MyRouter />
          </Center>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
