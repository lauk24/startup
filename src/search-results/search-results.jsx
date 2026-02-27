import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function SongCard({song}){
    return (
        <div className='song-card'>
            <img src={song.albumCover} alt="Album Art" width="100" height="100"/>
            <div>
                <p>{song.title}</p>
                <p>{song.artist}</p>
                <p>{song.album}</p>
            </div>
        </div>
        );
    }

const mockResults = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', albumCover: 'song_cover.jpg' },
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', albumCover: 'song_cover.jpg' },
];

export function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [sortBy, setSortby] = React.useState('rating');
    
    return (
        <main>
            <section>
                <h2>Search Results: {query}</h2>
                <form>
                    <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
                        <option value="rating">Rating</option>
                        <option value="newest-added">Newest Added</option>
                        <option value="oldest-added">Oldest Added</option>
                        <option value="newest-released">Newest Released</option>
                        <option value="oldest-released">Oldest Released</option>
                        <option value="artist">Artist</option>
                    </select>
                </form>
            </section>
            <div className="search-list">
                {mockResults.map((song) => <SongCard key={song.id} song={song} />)}
            </div>
        </main>
    );
}