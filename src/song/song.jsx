import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const songList = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', albumCover: '/song_cover.jpg', rating: 9, tags: ["Rock", "Hype"], credits: {artists: ["Queen"], performers: ["Brian May", "Freddie Mercury"], writers: ["Freddy Mercury"], production: ["Bob Ludwig"], other: []}},
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', albumCover: '/song_cover.jpg', rating: 8, tags:["Nostalgia"], credits: {artists: ["The Weekend"], performers: ["Max Martin"], writers: [], production: [], other: []}},
  { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', albumCover: '/song_cover.jpg', rating: 7, tags: ["Love", "Dance"], credits: {artists: ["Ed Sheeran"], performers: ["Ed Sheeran", "Chris Laws"], writers: [], production: [], other: []}},
  { id: 4, title: 'Seaside Rendezvous', artist: "Queen", album: 'A Night at the Opera', albumCover: '/song_cover.jpg', rating: 10, tags: ["Summer"], credits: {artists: ["Queen"], performers: ["Brian May", "Freddie Mercury"], writers: ["Freddy Mercury"], production: ["Bob Ludwig"], other: []}}
];


export function Song() {
    const { id } = useParams();
    const song = songList.find((s) => s.id === Number(id));
    return (
        <main>
            <section>
                <img src={song.albumCover} alt="Album Cover" width="200" height="200"/>
                <h2>{song.title}</h2>
                <h3>{song.artist}</h3>
                <span>⭐ {song.rating}/10</span>
                <hr />
            </section>

            <section>
                <ul className="tags">
                    {song.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>

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

            </section>
            <Link to={`/add-rating/${song.id}`}>
                <img src="/addButton.png" alt="Add Rating" width="100" height="100"/>
            </Link>
        </main>
    );
}
