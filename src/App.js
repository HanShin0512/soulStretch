import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import the necessary components
import Home from './Home/Home';
import SunriseFlow from './ClassInfo/SunriseFlow';
import PageHeader from "./ClassInfo/Header/PageHeader";
import PowerPulse from "./ClassInfo/PowerPulse";
import YinYan from "./ClassInfo/YinYange";
import RulesFlower from "./ClassInfo/RulesFlower/RulesFlower";
import Prices from "./ClassInfo/Prices/Prices";
import Teachers from "./ClassInfo/Teachers/Teachers";
import Faq from "./ClassInfo/Faq/Faq";
import ClassSignup from "./ClassInfo/ClassSignup/ClassSignup";
import Article from "./Article/Article";
import Footer from "./Footer/Footer";

function App() {
  return (
    <BrowserRouter> {/* Wrap everything in BrowserRouter */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ClassInfo/SunriseFlow" element={<SunriseFlow />} />
        <Route path="/ClassInfo/PageHeader" element={<PageHeader/>} />
        <Route path="/ClassInfo/PowerPulse" element={<PowerPulse/>} />
        <Route path="/ClassInfo/YinYan" element={<YinYan/>}/>
        <Route path="/ClassInfo/rulesFlower/rulesFlower" element={<RulesFlower/>} />
        <Route path="/ClassInfo/Prices/Prices" element={<Prices />} />
        <Route path="/ClassInfo/Teachers/Teachers" element={<Teachers />} />
        <Route path="/ClassInfo/Faq/Faq" element={<Faq />} />
        <Route path="/ClassInfo/ClassSignup/ClassSignup" element={<ClassSignup/>}></Route>
        <Route path="/Article/Article" element={<Article/>}></Route>
        <Route path="/Footer/Footer" element={<Footer/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
