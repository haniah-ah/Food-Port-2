import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Share from "./pages/Share";
import Transit from "./pages/Transit";

/*
  FoodPort front-end main app.
  - Home: create/manage grocery lists
  - Transit: find routes + compare stores/prices (API integration points noted)
  - Share: post lists for neighbors to pick up
*/

export default function App(){
  return (
    <BrowserRouter>
      <div style={{fontFamily: "Arial, sans-serif", padding: 20}}>
        <h1>FoodPort</h1>
        <nav style={{display: "flex", gap: 10, marginBottom: 20}}>
          <Link to="/">Home</Link>
          <Link to="/transit">Transit & Prices</Link>
          <Link to="/share">Share</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/transit" element={<Transit/>}/>
          <Route path="/share" element={<Share/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
