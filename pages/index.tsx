import React from "react";
import Link from "next/link";
import Head from "next/head";

const App = () => {
  return (
    <main className="frontpage">
      <Head>
        <title>Hello Next!</title>
      </Head>

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
