import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockLibrary = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', albumCover: 'song_cover.jpg', rating: 9, spTags: ["obs", "fav"], dateAdded: "2025-12-02"},
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', albumCover: 'song_cover.jpg', rating: 8, spTags: ["fav"], dateAdded: "2026-01-21"},
  { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', albumCover: 'song_cover.jpg', rating: 7, spTags: [], dateAdded: "2025-12-20"},
  { id: 4, title: 'Seaside Rendezvous', artist: "Queen", album: 'A Night at the Opera', albumCover: 'song_cover.jpg', rating: 10, spTags: ["obs"], dateAdded: "2026-02-26"}
];

export function AddRating() {
  const { id } = useParams();
  const song = mockLibrary.find((s) => s.id === Number(id));
  const navigate = useNavigate();
  const [rating, setRating] = React.useState("");

  function uploadRating(e) {
    e.preventDefault()
    localStorage.setItem(song.title, rating);
    navigate(`/song/${id}`); 
  }

  return (
    <main>
        <section>
            <img src="/song_cover.jpg" alt="Album Cover" width="200" height="200"/>
            <h2>{song.title}</h2>
            <h3>{song.artist}</h3>
            <form onSubmit={uploadRating}>
                <label htmlFor="rating">Rate this song (0–10):</label>
                <input 
                  type="number" 
                  id="rating" 
                  min="0" 
                  max="10"
                  value = {rating}  
                  onChange={(e) => setRating(e.target.value)}
                />
                <button type="submit">Add Rating</button>
            </form>
        </section>
    </main>
  );
}