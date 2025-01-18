import { ROUTES } from "./constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Nekretnine from "./Pages/Nekretnine";
import AddNew from "./Pages/AddNew";
import Account from "./Pages/Account";
import Header from "./components/Header";
import PostView from "./components/PostView";
import HomePage from "./Pages/HomePage";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  return (
    <div className="flex flex-col h-full">
      <BrowserRouter>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path={ROUTES.LANDING} element={<LandingPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.NEKRETNINE} element={<Nekretnine />} />
            <Route path={ROUTES.DODAJ_NEKRETNINU} element={<AddNew />} />
            <Route path={ROUTES.ACCOUNT} element={<Account />} />
            <Route path={ROUTES.POST_VIEW} element={<PostView />} />
            <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
            <Route path={ROUTES.FALLBACK} element={<LandingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
