import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import Home from "./component/Home/Home.js";
import Signup from "./component/Client/Auth/Signup.js";
import Login from "./component/Client/Auth/Login.js";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/c/signup" element={<Signup />} />
        <Route exact path="/c/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
