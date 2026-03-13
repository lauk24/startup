import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockLibrary = [
  { mbid: '1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', albumCover: 'song_cover.jpg', rating: 9, spTags: ["obs", "fav"], dateAdded: "2025-12-02"},
  { mbid: '2', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', albumCover: 'song_cover.jpg', rating: 8, spTags: ["fav"], dateAdded: "2026-01-21"},
  { mbid: '3', title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', albumCover: 'song_cover.jpg', rating: 7, spTags: [], dateAdded: "2025-12-20"},
  { mbid: '4', title: 'Seaside Rendezvous', artist: "Queen", album: 'A Night at the Opera', albumCover: 'song_cover.jpg', rating: 10, spTags: ["obs"], dateAdded: "2026-02-26"}
];

export function AddRating() {
  const { id } = useParams();
  const song = mockLibrary.find((s) => s.mbid === id);
  const navigate = useNavigate();
  const [rating, setRating] = React.useState("");
  const [review, setReview] = React.useState('');
  const [spTags, setSpTags] = React.useState([]);

  async function uploadRating(e) {
    e.preventDefault()
    const response = await fetch('/api/library', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify ({
        mbid: id,
        rating: Number(rating),
        title: song?.title,
        artist: song?.artist,
        album: song?.album,
        albumCover: song?.albumCover,
        spTags: spTags,
        review: review
      })
    })
    if (response.ok) {
      navigate(`/song/${id}`)
    }
  }

  function toggleTag(tag) {
  setSpTags((prev) => {
    if (prev.includes(tag)) {
      return prev.filter((t) => t !== tag);
    } else {
      return [...prev, tag];         
    }
  });
}

  return (
    <main>
        <section>
             <img src={song?.albumCover || '/song_cover.jpg'} alt="Album Cover" width="200" height="200" onError={(e) => { e.target.src = '/song_cover.jpg'; }}/>
            <h2>{song?.title}</h2>
            <h3>{song?.artist}</h3>
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
                <label htmlFor="review">Review:</label>
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review..."
                  /> 
                  <div>
                    <label>Tags:</label>
                    <button type="button" onClick={() => toggleTag('fav')}
                      style={{ fontWeight: spTags.includes('fav') ? 'bold' : 'normal' }}>
                      ❤️ Favorite
                    </button>
                    <button type="button" onClick={() => toggleTag('obs')}
                      style={{ fontWeight: spTags.includes('obs') ? 'bold' : 'normal' }}>
                      🔥 Obsessed
                    </button>
                </div>
                <button type="submit">Submit Rating</button>
            </form>
        </section>
    </main>
  );
}