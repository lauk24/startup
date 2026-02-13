import React from 'react';
import { NavLink } from 'react-router-dom';

export function Song() {
  return (
    <main>
        <section>
            <img src="song_cover.jpg" alt="Album Cover" width="200" height="200"/>
            <h2>Song Name</h2>
            <h3>Artist Name</h3>
            <span>⭐ #/10</span>
            <hr />
        </section>
        <section>
            <ul className="tags">
                <li>Tag #1</li>
                <li>Tag #2</li>
                <li>Tag #3</li>
                <li>Tag #4</li>
                <li>Tag #5</li>
                <li>Tag #6</li>
            </ul>
            <h3>Song Credits:</h3>
            <h4>Artist</h4>
            <ul className="credit-list">
                <li>Artist 1</li>
                <li>Artist 2</li>
            </ul>
            <h4>Performers</h4>
            <ul className="credit-list">
                <li>Performer 1</li>
                <li>Performer 2</li>
            </ul>
            <h4>Writing & Arrangement</h4>
            <ul className="credit-list">
                <li>Composer 1</li>
                <li>Composer 2</li>
            </ul>
            <h4>Production & Engineering</h4>
            <ul className="credit-list">
                <li>Producer 1</li>
                <li>Producer 2</li>
            </ul>
            <h4>Other Rolse</h4>
            <ul className="credit-list">
                <li>Other 1</li>
                <li>Other 2</li>
            </ul>
        </section>
        <NavLink to="/add-rating">
            <img src="addButton.png" alt="Album Art" width="100" height="100"/>
        </NavLink>
    </main>
  );
}