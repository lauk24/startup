import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function SongCard({song}){
    return (
        <div className='song-card'>
            <Link to={`/song/${song.mbid}`}>
                <img src={song.albumCover} alt="Album Art" width="100" height="100" onError={(e) => { e.target.src = '/song_cover.jpg'; }}/>
            </Link>
            <div>
                <p>{song.title}</p>
                <p>{song.artist}</p>
                <p>{song.album}</p>
            </div>
        </div>
        );
    }

export function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [sortBy, setSortby] = React.useState('rating');
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    
    React.useEffect(() => {
        if (!query) return;
        setLoading(true);
        fetch(`https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(query)}&limit=10&fmt=json`, {
                headers: {'User-Agent': 'SoundEscape/1.0 (kentlau@byu.edu)'}
        })
        .then((res) => res.json())
        .then((data) => {
            const songs = data.recordings.map((recording) => ({
                mbid: recording.id,
                title: recording.title,
                artist: recording['artist-credit']?.[0]?.name ?? 'Unknown Artist',
                album: recording.releases?.[0]?.title ?? 'Unknown Album',
                releaseId: recording.releases?.[0]?.id ?? null,
                albumCover: recording.releases?.[0]?.id
                    ? `https://coverartarchive.org/release/${recording.releases[0].id}/front`
                    : '/song_cover.jpg',
            }));
            setResults(songs);
        })
        .catch(() => {
            setResults([]);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [query]);

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
            {loading && <p>Searching...</p>} 
            <div className="search-list">
                {results.map((song) => <SongCard key={song.mbid} song={song} />)}
            </div>
        </main>
    );
}