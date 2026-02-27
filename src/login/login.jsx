import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

  function loginUser() {
    localStorage.setItem('userName', email);
    onAuthChange(email, AuthState.Authenticated);
    navigate('/library');
  }

  function createUser() {
    localStorage.setItem('userName', email);
    onAuthChange(email, AuthState.Authenticated);
    navigate('/library');
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
    </main>
  );
}