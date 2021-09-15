import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MyRouter from "router";
import Header from "components/Header";
import Footer from "components/Footer";
import Loading from "components/Loading";
import Center from "components/Center";

function App() {
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
