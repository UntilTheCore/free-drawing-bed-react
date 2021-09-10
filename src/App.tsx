import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import MyRouter from 'router';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loading from 'components/Loading';


function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/user" >user</Link>
          </li>
          <li>
            <Link to="/about" >about</Link>
          </li>
        </ul>
        <Header />
        <Suspense fallback={<Loading />}>
          <MyRouter></MyRouter>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
