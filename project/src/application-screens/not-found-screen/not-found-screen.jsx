import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundScreen() {
  return (
    <section>
      <h1>404. Page not found</h1>
      <Link to="/">Back to the main page</Link>
    </section>
  );
}

export default NotFoundScreen;
