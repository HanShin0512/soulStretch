import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
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
import AuthForm from "./SignInUp/AuthForm";
import Contact from "./Contact/Contact";
import { ScrollProvider } from "./ScrollContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientID = "323470096188-pp48tc0cmds2vbq7840h9j3dcn9nvqif.apps.googleusercontent.com";

function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId={clientID}>
        <ScrollProvider> 
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
            <Route path="/SignInUp/AuthForm" element={<AuthForm/>}></Route>
            <Route path="/ScrollContext" element={<ScrollProvider/>}></Route>
            <Route path="/Contact/Contact" element={<Contact/>}></Route>
          </Routes>
        </ScrollProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
