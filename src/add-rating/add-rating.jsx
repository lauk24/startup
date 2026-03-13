import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function AddRating() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = React.useState(null);
  const [albumCover, setAlbumCover] = React.useState('/song_cover.jpg');
  const [rating, setRating] = React.useState("");
  const [review, setReview] = React.useState('');
  const [spTags, setSpTags] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!id) return;

    fetch(`https://musicbrainz.org/ws/2/recording/${id}?inc=artist-credits+releases&fmt=json`, {
      headers: { 'User-Agent': 'SoundEscape/1.0 (kentlau@byu.edu)' }
    })
    .then((res) => res.json())
    .then((data) => {
      setSong({
        mbid: data.id,
        title: data.title,
        artist: data['artist-credit']?.[0]?.name ?? 'Unknown Artist',
        album: data.releases?.[0]?.title ?? 'Unknown Album',
        releaseId: data.releases?.[0]?.id ?? null,
      });
      const releaseId = data.releases?.[0]?.id;
      if (releaseId) {
        setAlbumCover(`https://coverartarchive.org/release/${releaseId}/front`);
      }
    })
    .catch(() => {})
    .finally(() => setLoading(false));
  }, [id]);

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
        albumCover: albumCover,
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

  if (loading) return <main><p>Loading...</p></main>;
  if (!song) return <main><p>Song not found.</p></main>;
  return (
    <main>
        <section>
             <img src={albumCover || '/song_cover.jpg'} alt="Album Cover" width="200" height="200" onError={(e) => { e.target.src = '/song_cover.jpg'; }}/>
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