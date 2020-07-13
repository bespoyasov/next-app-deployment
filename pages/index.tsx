import React from "react";
import Link from "next/link";

const App = () => {
  return (
    <main>
      <h1>Hello Next!</h1>
      <p>
        This is the example Next.js app, which we're going to deploy on{" "}
        <Link href="/vercel">
          <a>Vercel</a>
        </Link>
        ,{" "}
        <Link href="/heroku">
          <a>Heroku</a>
        </Link>{" "}
        and a{" "}
        <Link href="/custom">
          <a>custom static server</a>
        </Link>
        .
      </p>
    </main>
  );
};

export default App;
