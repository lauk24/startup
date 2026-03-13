import React from 'react';
import { Link } from 'react-router-dom';

function SongCard({song}){
    return (
        <div className='song-card'>
            <Link to={`/song/${song.mbid}`}>
                <img src={song.albumCover} alt="Album Art" width="100" height="100"/>
            </Link>
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
    const [library, setLibrary] = React.useState([]);
    React.useEffect(() => {
    fetch('/api/library')
        .then((res) => res.json())
        .then((data) => setLibrary(data))
        .catch(() => {
        });
    }, []);

    const filteredSongs = library.filter((song) =>
        song.title?.toLowerCase().includes(query.toLowerCase()) ||
        song.artist?.toLowerCase().includes(query.toLowerCase())
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
                {filteredSongs.map((song) => <SongCard key={song.mbid} song={song}/>)}
            </div>
        </main>
    );
}
