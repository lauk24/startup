import React from 'react';
import { Link } from 'react-router-dom';

function SongCard({song}){
    return (
        <div className='song-card'>
            <Link to={`/song/${song.mbid}`}>
                <img src={song.albumCover} alt="Album Art" width="100" height="100" onError={(e) => { e.target.src = '/song_cover.jpg'; }}/>
            </Link>
            <div>
                <p>{song.title}</p>
            </div>
        </div>
    );
 }

export function Profile() {

    const [library, setLibrary] = React.useState([]);
    React.useEffect(() => {
        fetch('/api/library')
            .then((res) => res.json())
            .then((data) => setLibrary(data))
            .catch(() => {
            });
    }, []);

    const recentlyAdded = [...library].sort((a, b) => 
        b.dateAdded > a.dateAdded ? 1 : -1
    );
    const currentlyObsessed = library.filter((song) =>
        song.spTags.includes("obs")
    );
    const favorites = library.filter((song) =>
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
                    {recentlyAdded.map((song) => <SongCard key={song.mbid} song={song}/>)}
                </div>
            </section>
            <section>
                <h3>Currently Obsessed</h3>
                <div className="profile-list">
                    {currentlyObsessed.map((song) => <SongCard key={song.mbid} song={song}/>)}
                </div>
            </section>
            <section>
                <h3>Favorites</h3>
                <div className="profile-list">
                    {favorites.map((song) => <SongCard key={song.mbid} song={song}/>)}
                </div>
            </section>
        </main>
    );
}