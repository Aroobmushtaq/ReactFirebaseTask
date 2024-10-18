import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./compunents/login";
import Navbar from "./compunents/navbar";
import Home from "./compunents/home";
import About from "./compunents/about";
import Contact from "./compunents/contact";
import Footer from "./compunents/footer";
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
