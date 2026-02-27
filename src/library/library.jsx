import React from 'react';
import { NavLink } from 'react-router-dom';

const mockLibrary = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', albumCover: 'song_cover.jpg', rating: 9},
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', albumCover: 'song_cover.jpg', rating: 8},
  { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', albumCover: 'song_cover.jpg', rating: 7},
  { id: 4, title: 'Seaside Rendezvous', artist: "Queen", album: 'A Night at the Opera', albumCover: 'song_cover.jpg', rating: 10}
];

function SongCard({song}){
    return (
        <div className='song-card'>
            <img src={song.albumCover} alt="Album Art" width="100" height="100"/>
            <div>
                <p>{song.title}</p>
                <p>{song.artist}</p>
                <p>{song.album}</p>
                <p>⭐ {song.rating}/10</p>
            </div>
        </div>
        );
    }

export function Library() {
    const [sortBy, setSortby] = React.useState('rating');
    const [query, setQuery] = React.useState('');

    const filteredSongs = mockLibrary.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
);

    return (
        <main>
            <section>
                <input
                    className="library-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search your library..."
                />
                <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
                    <option value="rating">Rating</option>
                    <option value="newest-added">Newest Added</option>
                    <option value="oldest-added">Oldest Added</option>
                    <option value="newest-released">Newest Released</option>
                    <option value="oldest-released">Oldest Released</option>
                    <option value="artist">Artist</option>
                </select>
            </section>
            <div className="library-list">
                {filteredSongs.map((song) => <SongCard key={song.id} song={song}/>)}
            </div>
        </main>
    );
}
