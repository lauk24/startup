import React from 'react';
import { NavLink } from 'react-router-dom';

export function Profile() {
  return (
    <main>
        <section>
            <img src="profile.jpg" alt="Profile Picture" width="200" height="200"/>
            <h2>Username</h2>
            <hr />
        </section>
        <section>
            <h3>Recently Added</h3>
            <ul className="song-list">
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Recently Added Song #1</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Recently Added Song #2</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Recently Added Song #3</span>
                </li>
            </ul>
        </section>
        <section>
            <h3>Currently Obssesed</h3>
            <ul className="song-list">
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Currently Obssesed Song #1</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Currently Obssesed Song #2</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Currently Obssesed Song #3</span>
                </li>
            </ul>
        </section>
        <section>
            <h3>Favorites</h3>
            <ul className="song-list">
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Favorite Song #1</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Favorite Song #2</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Favorite Song #3</span>
                </li>
            </ul>
        </section>
    </main>
  );
}