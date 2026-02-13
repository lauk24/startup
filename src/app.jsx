import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body">
        <header>
            <h1>SoundEscape</h1>
            <form action="search-results.html" method="get" className="search-form">
                <input type="text" name="q" placeholder="Search for a song" className="search-input"/>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="profile.html">Profile</a></li>
                    <li><a href="library.html">My Library</a></li>
                </ul>
            </nav>
        </header>
        <main>
            App Components go here
        </main>
        <footer>
            <hr />
            <a href="https://github.com/lauk24/startup">GitHub</a>
        </footer>
  </div>
  )
}