import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { AddRating } from './add-rating/add-rating';
import { Library } from './library/library';
import { Profile } from './profile/profile';
import { SearchResults } from './search-results/search-results';
import { Song } from './song/song';


export default function App() {
  return (
    <BrowserRouter>
        <div className="body">
            <header>
                <h1>SoundEscape</h1>
                <form action="search-results.html" method="get" className="search-form">
                    <input type="text" name="q" placeholder="Search for a song" className="search-input"/>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="profile">Profile</NavLink></li>
                        <li><NavLink to="library">My Library</NavLink></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/add-rating' element={<AddRating />} />
                    <Route path='/library' element={<Library />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/search-results' element={<SearchResults />} />
                    <Route path='/song' element={<Song />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
            <footer>
                <hr />
                <a href="https://github.com/lauk24/startup">GitHub</a>
            </footer>
        </div>
  </BrowserRouter>
  )
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}