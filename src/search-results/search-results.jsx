import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [sortby, setSortby] = React.useState('rating');
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
            <ul className="search-list">
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Searched Song #1</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Searched Song #2</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Searched Song #3</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Searched Song #4</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Searched Song #5</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Searched Song #6</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Searched Song #7</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Searched Song #8</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Searched Song #9</span>
                </li>
                <li>
                    <NavLink to="/song">
                        <img src="song_cover.jpg" alt="Album Art" width="100" height="100"/>
                    </NavLink>
                    <span className="song-title">Searched Song #10</span>
                </li>
            </ul>
        </main>
    );
}