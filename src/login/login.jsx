import React from 'react';

export function Login() {
  return (
    <main>
        <h2>Sign in to get started</h2>
        <form method="get" action="profile.html">
            <div>
                <span>@</span>
                <input type="text" placeholder="your@email.com"/>
            </div>
            <div>
                <span>🔒</span>
                <input type="password" placeholder="password"/>
            </div>
        </form>
    </main>
  );
}