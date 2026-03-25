import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function Song() {
    const { id } = useParams();
    const [song, setSong] = React.useState(null);
    const [tags, setTags] = React.useState([]);
    const [albumCover, setAlbumCover] = React.useState('/song_cover.jpg');
    const [communityRating, setCommunityRating] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!id) return;

        fetch(`https://musicbrainz.org/ws/2/recording/${id}?inc=artist-credits+releases+tags+artist-rels&fmt=json`, {
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
                releaseDate: data.releases?.[0]?.date ?? null,
            })
            const releaseId = data.releases?.[0]?.id;
            if (releaseId) {
                setAlbumCover(`https://coverartarchive.org/release/${releaseId}/front`);
            }
        })
        .catch(() => {
            setLoading(false);
        })
        .finally(() => {
            setLoading(false);
        });
        fetch(`/api/ratings/${id}`)
            .then((res) => res.json())
            .then((data) => setCommunityRating(data.averageRating))
            .catch(() => setCommunityRating(null));

    }, [id]);

    if (loading) return <main><p>Loading...</p></main>;
    if (!song) return <main><p>Song not found.</p></main>;

    return (
        <main>
            <section>
                <img src={albumCover} alt="Album Cover" width="200" height="200" onError={(e) => { e.target.src = '/song_cover.jpg'; }}/>
                <h2>{song.title}</h2>
                <h3>{song.artist}</h3>
                {communityRating && <span>⭐ Community Rating: {communityRating.toFixed(1)}/10</span>}
                <hr />
            </section>

            <section>
                {tags.length > 0 && (
                    <ul className="tags">
                        {tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                )}    
                {/* Consider cutting or rethink implementation
                <h3>Song Credits:</h3>

                {song.credits.artists.length > 0 && (
                    <>
                        <h4>Artist</h4>
                        <ul className="credit-list">
                        {song.credits.artists.map((artist) => (
                            <li key={artist}>{artist}</li>
                        ))}
                        </ul>
                    </>
                )}

                {song.credits.performers.length > 0 && (
                    <>
                        <h4>Performers</h4>
                        <ul className="credit-list">
                        {song.credits.performers.map((performers) => (
                            <li key={performers}>{performers}</li>
                        ))}
                        </ul>
                    </>
                )}

                {song.credits.writers.length > 0 && (
                    <>
                        <h4>Writing & Arrangement</h4>
                        <ul className="credit-list">
                        {song.credits.writers.map((writers) => (
                            <li key={writers}>{writers}</li>
                        ))}
                        </ul>
                    </>
                )}

                {song.credits.production.length > 0 && (
                    <>
                        <h4>Production & Engineering</h4>
                        <ul className="credit-list">
                        {song.credits.production.map((production) => (
                            <li key={production}>{production}</li>
                        ))}
                        </ul>
                    </>
                )}
                */}
            </section>
            <Link to={`/add-rating/${song.mbid}`}>
                <img src="/addButton.png" alt="Add Rating" width="100" height="100"/>
            </Link>
        </main>
    );
}
