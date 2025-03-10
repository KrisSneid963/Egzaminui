import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import NavBar from "./components/main/NavBar";
import Footer from "./components/main/Footer";
import Header from "./components/main/Header";
import AdsPage from "./Ads/AdsPage";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Header />
      <Routes>
      <Route path="/" element={<AdsPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />  
        </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
