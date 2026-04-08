import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import './search-results.css'; 

function SongCard({song}){
    return (
        <div className='song-card'>
            <div className="album-art">
                <Link to={`/song/${song.mbid}`}>
                    <img src={song.albumCover} alt="Album Art" width="100" height="100" onError={(e) => { e.target.src = '/song_cover.jpg'; }}/>
                </Link>
            </div>
            <div className="song-info">
                <div className="song-title">{song.title}</div>
                <div className="song-sub">{song.artist} • {song.album}</div>
                <div className="rating">Rating: {song.userRating ? song.userRating.toFixed(1) : 'N/A'}</div>
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
        const searchQuery = `
        recording:(${query})^3 OR 
        artist:(${query})^2 OR
        release:(${query})
        `;
        fetch(`https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(searchQuery)}&limit=15&fmt=json`, {
            headers: { 'User-Agent': 'SoundEscape/1.0 (kentlau@byu.edu)' }
        })
        .then((res) => res.json())
        .then((data) => {
        const songs = data.recordings
            .filter(r => r.releases && r.releases.length > 0 && r.score > 60)
            .sort((a, b) => b.score - a.score)
            .map((recording) => {
                const release =
                recording.releases?.find(r => r.status === "Official") ||
                recording.releases?.[0];
                return {
                    mbid: recording.id,
                    title: recording.title,
                    artist: recording['artist-credit']?.[0]?.name ?? 'Unknown Artist',
                    album: release?.title ?? 'Unknown Album',
                    releaseId: release?.id ?? null,
                    releaseDate: release?.date ?? '',
                    albumCover: release?.id
                    ? `https://coverartarchive.org/release/${release.id}/front-250`
                    : '/song_cover.jpg',
                    userRating: 0,
                };
            });
            const mbids = songs.map(s => s.mbid).join(',');
            fetch(`/api/ratings?mbids=${mbids}`)
                .then(res => res.json())
                .then(ratingsData => {
                    const songsWithRatings = songs.map(song => ({
                        ...song,
                        userRating: ratingsData[song.mbid] ?? 0,
                    }));
                    setResults(songsWithRatings); 
                })
                .catch(() => setResults(songs)); 
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, [query]);

    React.useEffect(() => {
        setResults(prevResults => {
            const sorted = [...prevResults];
            switch(sortBy) {
            case 'rating':
                sorted.sort((a, b) => (b.userRating ?? 0) - (a.userRating ?? 0));
                break;
            case 'artist':
                sorted.sort((a, b) => a.artist.localeCompare(b.artist));
                break;
            case 'newest-released':
                sorted.sort((a, b) => (b.releaseDate || '').localeCompare(a.releaseDate || ''));
                break;
            case 'oldest-released':
                sorted.sort((a, b) => (a.releaseDate || '').localeCompare(b.releaseDate || ''));
                break;
            default:
                break;
            }
            return sorted;
        });
    }, [sortBy]);

    return (
        <main>
            <section>
                <h2>Search Results: {query}</h2>
                <form>
                    <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
                        <option value="rating">Rating</option>
                        <option value="newest-released">Newest Released</option>
                        <option value="oldest-released">Oldest Released</option>
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