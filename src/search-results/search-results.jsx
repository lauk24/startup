import React from 'react';
import { NavLink } from 'react-router-dom';

export function SearchResults() {
  return (
    <main>
        <section>
            <form>
                <select>
                    <option value="rating">Rating</option>
                    <option value="newest-added">Newest Added</option>
                    <option value="oldest-added">Oldest Added</option>
                    <option value="newest-released">Newest Released</option>
                    <option value="oldest-released">Oldest Released</option>
                    <option value="artist">Artist</option>
                </select>
            </form>
            <h2>Search Results:</h2>
        </section>
        <ul className="search-list">
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Searched Song #1</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Searched Song #2</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Searched Song #3</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Searched Song #4</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Searched Song #5</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Searched Song #6</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Searched Song #7</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Searched Song #8</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Searched Song #9</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Searched Song #10</span>
            </li>
        </ul>
    </main>
  );
}