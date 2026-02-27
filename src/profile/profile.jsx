import React from 'react';
import { Link } from 'react-router-dom';

const mockLibrary = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', albumCover: 'song_cover.jpg', rating: 9, spTags: ["obs", "fav"], dateAdded: "2025-12-02"},
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', albumCover: 'song_cover.jpg', rating: 8, spTags: ["fav"], dateAdded: "2026-01-21"},
  { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', albumCover: 'song_cover.jpg', rating: 7, spTags: [], dateAdded: "2025-12-20"},
  { id: 4, title: 'Seaside Rendezvous', artist: "Queen", album: 'A Night at the Opera', albumCover: 'song_cover.jpg', rating: 10, spTags: ["obs"], dateAdded: "2026-02-26"}
];

function SongCard({song}){
    return (
        <div className='song-card'>
            <Link to={`/song/${song.id}`}>
                <img src={song.albumCover} alt="Album Art" width="100" height="100"/>
            </Link>
            <div>
                <p>{song.title}</p>
            </div>
        </div>
    );
 }

export function Profile() {
    const recentlyAdded = [...mockLibrary].sort((a, b) => 
        b.dateAdded > a.dateAdded ? 1 : -1
    );
    const currentlyObsessed = mockLibrary.filter((song) =>
        song.spTags.includes("obs")
    );
    const favorites = mockLibrary.filter((song) =>
        song.spTags.includes("fav")
    );
    
    return (
        <main>
            <section>
                <img src="profile.jpg" alt="Profile Picture" width="200" height="200"/>
                <h2>{localStorage.getItem('userName')}</h2>
                <hr />
            </section>
            <section>
                <h3>Recently Added</h3>
                <div className="profile-list">
                    {recentlyAdded.map((song) => <SongCard key={song.id} song={song}/>)}
                </div>
            </section>
            <section>
                <h3>Currently Obssesed</h3>
                <div className="profile-list">
                    {currentlyObsessed.map((song) => <SongCard key={song.id} song={song}/>)}
                </div>
            </section>
            <section>
                <h3>Favorites</h3>
                <div className="profile-list">
                    {favorites.map((song) => <SongCard key={song.id} song={song}/>)}
                </div>
            </section>
        </main>
    );
}