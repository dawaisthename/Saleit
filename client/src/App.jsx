import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home.jsx";
import MainHome from "./partials/MainHome.jsx";
import ProLayout from "./partials/ProLayout.jsx";
import Detail from "./Detail.jsx";
import Cart from "./cart.jsx";
import All from "./all.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainHome />}>
          <Route index element={<Home />} />
          <Route path="/category/:category" element={<All />}>
            <Route index element={<All />} />
          </Route>
          <Route path="/product/:id" element={<ProLayout />}>
            <Route index element={<Detail />} />
          </Route>
          <Route path="cart">
            <Route index element={<Cart />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
