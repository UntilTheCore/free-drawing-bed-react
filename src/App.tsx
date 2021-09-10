import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import MyRouter from 'router';
import Header from 'components/Header';
import Footer from 'components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <ul>
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/home" >home</Link>
          </li>
          <li>
            <Link to="/about" >about</Link>
          </li>
        </ul>
        <MyRouter></MyRouter>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
