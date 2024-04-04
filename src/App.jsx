import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Protected } from './protection/protected';
import { Header } from './components/header';

import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';
import { ApplicationsPage } from './pages/applications';
import { UsersPage } from './pages/users';
import { AccountsPage } from './pages/accounts';
import { ClubsPage } from './pages/clubs';
import { DashboardPage } from './pages/dashboard';
import { NotFoundPage } from './pages/notfound';


function App() {

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const Auth = localStorage.getItem('Auth');
    const AuthBoolean = Auth === 'true';
    setShowContent(AuthBoolean);
  }, []);

  return (
    <BrowserRouter>

      {showContent  ? <Header /> : null}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/home"
              element={
                <Protected>
                  <HomePage />
                </Protected>
              }
            />
            <Route path="/dashboard"
              element={
                <Protected>
                  <DashboardPage />
                </Protected>
              }
            />
            <Route path="/applications"
              element={
                <Protected>
                  <ApplicationsPage />
                </Protected>
              }
            />
            <Route path="/clubs"
              element={
                <Protected>
                  <ClubsPage />
                </Protected>
              }
            />
            <Route path="/users"
              element={
                <Protected>
                  <UsersPage />
                </Protected>
              }
            />
            <Route path="/accounts"
              element={
                <Protected>
                  <AccountsPage />
                </Protected>
              }
            />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
