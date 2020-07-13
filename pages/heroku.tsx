import React from "react";
import Head from "next/head";
import Link from "next/link";

const Heroku = () => {
  return (
    <main>
      <Head>
        <title>Deploying on Heroku</title>
      </Head>

      <h1>Deploying on Heroku</h1>
      <p>
        Heroku is a cloud platform for building and delivering applications.
      </p>

      <p>
        We will use it with{" "}
        <a href="https://github.com/features/actions">GitHub Actions</a>
        —automatization workflow manager by GitHub.
      </p>

      <h2>1. Create a Repo on GitHub</h2>
      <p>
        Firstly, create a new repository to connect Heroku with your codebase.
        It will allow you to use commits to <code>master</code> as a trigger to
        deploy.
      </p>
      <img src="/heroku-1.png" alt="Create a new GitHub repository" />

      <p>Setup name, description and other repository settings.</p>
      <img
        src="/heroku-2.png"
        alt="Setup repository name, description and other settings"
      />

      <p>
        After it's done, make changes in the code, commit and push them into the
        repo.
      </p>

      <p>
        <pre
          dangerouslySetInnerHTML={{
            __html: `git add .
git commit -m "Add app starter files"
git push origin master`,
          }}
        />
      </p>

      <h2>2. Create an Account on Heroku</h2>
      <p>
        To connect a GitHub repo with Heroku you're going to need to sign up to
        Heroku. (If you already have an account, you can skip this section.)
      </p>

      <p>
        Go to a <a href="https://signup.heroku.com/">signup page</a> and create
        an account.
      </p>

      <h2>3. Create a New Heroku App</h2>
      <p>
        Go to <a href="https://dashboard.heroku.com/">Heroku Dashboard</a> and
        hit “New“ button. In modal select “Create new app” option.
      </p>

      <p>
        It will redirect you to a page with new app settings. There, enter a
        name for your app and select a region for hosting.
      </p>
      <img src="/heroku-3.png" alt="Enter a name for the app" />

      <p>Create a new pipeline with production stage. Choose a name for it.</p>
      <img
        src="/heroku-4.png"
        alt="Create a new pipeline with production stage"
      />

      <p>
        After it's done, on the next screen, select a deployment method
        “GitHub”. Select your GitHub account in a select below and type the name
        of the repository.
      </p>
      <img src="/heroku-5.png" alt="GitHub deployment method" />

      <p>
        For automatic deploys select <code>master</code> branch in “Enable
        automatic deploys” section.
      </p>
      <img src="/heroku-6.png" alt="Automatic deploys with GitHub" />
      <p>
        Optionally check “wait for CI to pass before deploy” to ensure your
        tests pass before a project goes to production if there are any tests.
      </p>

      <h2>4. Setup a GitHub Action</h2>

      <p>
        On GitHub we need to activate a GitHub Action. Actions are an
        automatization workflow for building, testing, deployment and other
        routines.
      </p>
      <img src="/heroku-7.png" alt="Automatic deploys with GitHub" />

      <p>
        Go to{" "}
        <a href="https://github.com/marketplace/actions/deploy-to-heroku">
          “Deploy to Heroku” Action's page
        </a>{" "}
        and scroll to{" "}
        <a href="https://github.com/marketplace/actions/deploy-to-heroku#getting-started">
          “Getting Started” section
        </a>
        .
      </p>

      <p>
        There you will find a code snippet that needs to be copied in{" "}
        <code>.github/workflows/main.yml</code> file.
      </p>
      <pre
        dangerouslySetInnerHTML={{
          __html: `name: Deploy

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.2.6
        with:
          heroku_api_key: \${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "YOUR_APP_NAME"
          heroku_email: "YOUR_EMAIL"
`,
        }}
      />

      <p>
        This is a YAML-file that tells “Deploy on Heroku” action what to do,
        when a new push comes to <code>master</code> branch.
      </p>

      <p>
        <code>heroku_api_key</code> field keeps a API token, that should be
        generated and stored in “Secrets” section in GitHub.
      </p>

      <h2>5. Install Heroku CLI</h2>
      <p>
        Install{" "}
        <a href="https://devcenter.heroku.com/articles/heroku-cli">
          Heroku CLI
        </a>
        . (If you already have it installed you can skip this section.)
      </p>

      <h2>6. Generate Heroku API Token</h2>
      <p>Authenticate in CLI:</p>
      <pre dangerouslySetInnerHTML={{ __html: `heroku login` }} />

      <p>When it's done, you should see something line:</p>
      <pre
        dangerouslySetInnerHTML={{
          __html: `heroku: Waiting for login...
Logging in... done
Logged in as YOUR_EMAIL`,
        }}
      />

      <p>Generate a new token with:</p>
      <pre dangerouslySetInnerHTML={{ __html: `heroku auth:token` }} />

      <p>
        Paste generated value in “Secrets” section in GitHub: Settings, Secrets,
        New Secret.
      </p>
      <img src="/heroku-8.png" alt="Automatic deploys with GitHub" />
      <p>
        GitHub will inject this value at build time automatically. This is ho
        Heroku knows whose build is being triggered.
      </p>

      <h2>
        7. Update <code>start</code> script
      </h2>
      <p>
        In your <code>package.json</code> update <code>start</code> script to
        be:
      </p>
      <pre
        dangerouslySetInnerHTML={{ __html: `"start": "next start -p $PORT"` }}
      />

      <p>
        Pay attention to <code>$PORT</code> environment variable, that{" "}
        <a href="https://devcenter.heroku.com/articles/dynos#local-environment-variables">
          must be specified
        </a>
        .
      </p>

      <p>
        When it's done, update your code, push changes to <code>master</code>{" "}
        branch and they will be deployed on Heroku. In the Dashboard you will
        see a new deployment, which will contain a link to the app.
      </p>

      <p>
        <Link href="/">
          <a>Back to main page</a>
        </Link>
      </p>
    </main>
  );
};

export default Heroku;
