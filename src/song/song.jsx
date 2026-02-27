import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const songList = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', albumCover: '/song_cover.jpg', rating: 9},
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', albumCover: '/song_cover.jpg', rating: 8},
  { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', albumCover: '/song_cover.jpg', rating: 7},
  { id: 4, title: 'Seaside Rendezvous', artist: "Queen", album: 'A Night at the Opera', albumCover: '/song_cover.jpg', rating: 10}
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
                    <li>Tag #1</li>
                    <li>Tag #2</li>
                    <li>Tag #3</li>
                    <li>Tag #4</li>
                    <li>Tag #5</li>
                    <li>Tag #6</li>
                </ul>
                <h3>Song Credits:</h3>
                <h4>Artist</h4>
                <ul className="credit-list">
                    <li>Artist 1</li>
                    <li>Artist 2</li>
                </ul>
                <h4>Performers</h4>
                <ul className="credit-list">
                    <li>Performer 1</li>
                    <li>Performer 2</li>
                </ul>
                <h4>Writing & Arrangement</h4>
                <ul className="credit-list">
                    <li>Composer 1</li>
                    <li>Composer 2</li>
                </ul>
                <h4>Production & Engineering</h4>
                <ul className="credit-list">
                    <li>Producer 1</li>
                    <li>Producer 2</li>
                </ul>
                <h4>Other Rolse</h4>
                <ul className="credit-list">
                    <li>Other 1</li>
                    <li>Other 2</li>
                </ul>
            </section>
            <Link to={`/add-rating/${song.id}`}>
                <img src="/addButton.png" alt="Add Rating" width="100" height="100"/>
            </Link>
        </main>
    );
}
