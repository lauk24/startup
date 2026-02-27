import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'; 

import { BrowserRouter, NavLink, Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import { Login } from './login/login';
import { AddRating } from './add-rating/add-rating';
import { Library } from './library/library';
import { Profile } from './profile/profile';
import { SearchResults } from './search-results/search-results';
import { Song } from './song/song';
import { AuthState } from './login/authState';


export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  function handleAuthChange(userName, authState) {
  setAuthState(authState);
  setUserName(userName);
  }

  return (
      <BrowserRouter>
        <AppContent 
          userName={userName}
          authState={authState}
          onAuthChange={handleAuthChange}
        />
      </BrowserRouter>
  )
}

function AppContent({ userName, authState, onAuthChange }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  return(
    <div className="body">
      {!isLoginPage && (
        <header>
            <h1>SoundEscape</h1>
            <SearchForm />   
            <nav>
                <ul>
                    <li><NavLink to="profile">Profile</NavLink></li>
                    <li><NavLink to="library">My Library</NavLink></li>
                    <li><NavLink to="/">Sign Out</NavLink></li>
                </ul>
            </nav>
        </header>
      )}
      <main>
          <Routes>
              <Route path='/' element={
                <Login 
                  userName={userName}
                  authState={authState}
                  onAuthChange={onAuthChange}
                />
              }/>
              <Route path='/add-rating' element={<AddRating />} />
              <Route path='/library' element={<Library />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/search-results' element={<SearchResults />} />
              <Route path='/song/:id' element={<Song />} />
              <Route path='*' element={<NotFound />} />
          </Routes>
      </main>
      <footer>
          <hr />
          <a href="https://github.com/lauk24/startup">GitHub</a>
      </footer>
    </div>
  )
}


function SearchForm() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search-results?q=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}