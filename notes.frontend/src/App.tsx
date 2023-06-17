import { FC, ReactElement, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import userManager, { loadUser, signinRedirect, signoutRedirect } from './auth/user-service';
import AuthProvider from './auth/auth-provider';
import SignInOidc from './auth/SigninOidc';
import SignOutOidc from './auth/SignoutOidc';
import Notes from './NewNotes/Notes';

const App: FC<{}> = (): ReactElement => {
    loadUser();
    return (
        <div className="App">
            <header className="header">
                <h2>Заметки</h2>
                <div className="Login">    
                    <div onClick={() => signinRedirect()}>Login</div>
                </div>
                <div className="Logout">    
                    <div onClick={() => signoutRedirect()}>Logout</div>
                </div>
            </header>
                <AuthProvider userManager={userManager}>
                    <Router>
                        <Routes>
                            <Route path="/" element={ <> 
                                <Notes />
                            </>} />
                            <Route path="/signout-oidc" element={<SignOutOidc />} />
                            <Route path="/signin-oidc" element={<SignInOidc />} />
                        </Routes>
                    </Router>
                </AuthProvider>
            
        </div>
    );
};

export default App;
