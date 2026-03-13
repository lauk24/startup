import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const navigate = useNavigate();

  async function loginUser() {
    loginOrCreate('/api/auth/login');
  }

  async function createUser() {
    loginOrCreate('/api/auth/create');
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      localStorage.setItem('userName', email);
      onAuthChange(email, AuthState.Authenticated);
      navigate('/library');
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <main>
      <h2>Sign in to get started</h2>
      <div>
        <div>
          <span>@</span>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='your@email.com'
          />
        </div>
        <div>
          <span>🔒</span>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
        </div>
        <button onClick={() => loginUser()} disabled={!email || !password}>
          Login
        </button>
        <button onClick={() => createUser()} disabled={!email || !password}>
          Create Account
        </button>
      </div>

      {displayError && (
        <div onClick={() => setDisplayError(null)}>
          {displayError}
        </div>
      )}
    </main>
  );
}
