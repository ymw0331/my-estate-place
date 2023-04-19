import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./contexts/auth"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./components/nav/Main"
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword"
import AccessAccount from "./pages/auth/AccessAccount";
import Dashboard from "./pages/user/Dashboard";
import AdCreate from "./pages/user/ad/AdCreate";
import PrivateRoute from "./components/routes/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Main />
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/account-activate/:token" element={<AccountActivate />} />
            <Route path="/auth/forgot-password/" element={<ForgotPassword />} />
            <Route path="/auth/access-account/:token" element={<AccessAccount />} />


            <Route path="/" element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="ad/create" element={<AdCreate />} />
            </Route>


          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;