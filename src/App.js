import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boardcreate from "./pages/Board/Boardcreate"
import Boardview from "./pages/Board/Boardview";
import Root from "./pages/root/Root";
import Login from "./pages/Login/Login";
import Membership from "./pages/membership/Membership";
import Boardlist from "./pages/Board/Boardlist";
import Boardedit from "./pages/Board/Boardedit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />

          <Route path="/Boardlist" element={<Boardlist />} />
          <Route path="/Main" element={<Root />} />
          <Route path="/Boardcreate" element={<Boardcreate />}/>
          <Route path="/Boardview/:idx" element={<Boardview />}/>

          <Route path="/Login" element={<Login />} />
          <Route path="/Membership" element={<Membership />} />
          <Route path="/Board/edit/" element={<Boardedit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
