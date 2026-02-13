import React from 'react';

export function AddRating() {
  return (
    <main>
        <section>
            <img src="song_cover.jpg" alt="Album Cover" width="200" height="200"/>
            <h2>Song Name</h2>
            <h3>Artist Name</h3>
            <form action="/tbd" method="post">
                <label for="rating">Rate this song (0–10):</label>
                <input type="number" id="rating" name="rating" min="0" max="10"/>
                <button type="submit">Add Rating</button>
            </form>
        </section>
    </main>
  );
}