import React from 'react';
import { NavLink } from 'react-router-dom';

export function Library() {
  return (
    <main>
        <section>
            <form>
                <input type="text" name="q" placeholder="Search for a song in library"/>
                <button type="submit">Search</button>
            </form>
            <form>
                <select id="sortSelect" onchange="sortCards()">
                    <option value="rating">Rating</option>
                    <option value="newest-added">Newest Added</option>
                    <option value="oldest-added">Oldest Added</option>
                    <option value="newest-released">Newest Released</option>
                    <option value="oldest-released">Oldest Released</option>
                    <option value="artist">Artist</option>
                </select>
            </form>
        </section>
        <ul className="ratings-list">
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Song #1</span>
                <span>⭐ #/10</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Song #2</span>
                <span>⭐ #/10</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Song #3</span>
                <span>⭐ #/10</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Song #4</span>
                <span>⭐ #/10</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Song #5</span>
                <span>⭐ #/10</span>
            </li>
            <li>
                <NavLink to="/song">
                    <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                </NavLink>
                <span className="song-title">Song #6</span>
                <span>⭐ #/10</span>
            </li>
        </ul>
    </main>
  );
}