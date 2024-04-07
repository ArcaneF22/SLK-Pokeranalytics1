import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Protected } from './protection/protected';
import { Header } from './components/header';

import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';
import { ApplicationsPage } from './pages/applications';
import { ClubsPage } from './pages/clubs';
import { UsersPage } from './pages/users';
import { AccountsPage } from './pages/accounts';
import { NotificationPage } from './pages/notification';
import { HistoryPage } from './pages/history';
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
            <Route path="/notification"
              element={
                <Protected>
                  <NotificationPage />
                </Protected>
              }
            />
            <Route path="/history"
              element={
                <Protected>
                  <HistoryPage />
                </Protected>
              }
            />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
