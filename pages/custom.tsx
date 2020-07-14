import React from "react";
import Head from "next/head";
import Link from "next/link";

const Custom = () => {
  return (
    <main>
      <Head>
        <title>Deploying on a custom static server</title>
      </Head>

      <h1>Deploying on a custom static server</h1>
      <p>
        This post is about deploying a Next build onto remote server via SSH.
      </p>

      <h2>Prerequisites</h2>
      <p>
        In order to complete this manual you're going to need a remote server
        with SSH access to it.
      </p>

      <h2>1. Create a Repo on GitHub</h2>
      <p>
        Firstly, create a new repository to connect Heroku with your codebase.
        It will allow you to use commits to <code>master</code> as a trigger to
        deploy.
      </p>
      <img src="/custom-1.png" alt="Create a new GitHub repository" />

      <p>Setup name, description and other repository settings.</p>
      <img
        src="/custom-2.png"
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

      <h2>2. Setup a GitHub Action</h2>
      <p>
        Go to{" "}
        <a href="https://github.com/marketplace/actions/ssh-deploy">
          “SSH Deploy” Action's page
        </a>{" "}
        and scroll to{" "}
        <a href="https://github.com/marketplace/actions/ssh-deploy#example-usage-in-workflow">
          “Usage” section
        </a>
        .
      </p>

      <p>
        There you will find an example of how to use this Action in your
        workflow.
      </p>
      <p>
        To activate it create a directory <code>.github</code> in the root of
        your project and inside create another directory called{" "}
        <code>workflows</code>. There, create a YAML-file called{" "}
        <code>custom.yml</code>.
      </p>

      <p>In this file describe the configuration for build and deploy.</p>

      <pre
        dangerouslySetInnerHTML={{
          __html: `name: Deploy on a custom server

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: "12"
      - run: npm install
      - run: npm run build
      - run: npx next export
      - uses: easingthemes/ssh-deploy@v2.1.1
        env:
          SSH_PRIVATE_KEY: \${{ secrets.SERVER_SSH_KEY }}
          ARGS: "-rltgoDzvO --delete"
          SOURCE: "out/"
          REMOTE_HOST: \${{ secrets.REMOTE_HOST }}
          REMOTE_USER: \${{ secrets.REMOTE_USER }}
          TARGET: \${{ secrets.REMOTE_TARGET }}
`,
        }}
      />

      <p>
        For this to work you're going to need to specify some secrets that
        should be stored in “Secrets” section in your GitHub repository.
      </p>

      <h2>3. Generate Keys for GitHub Actions on a Server</h2>
      <p>For “SSH Deploy” to work we need to grant it access to a server.</p>
      <p>
        Connect to your server via SSH. (You may be asked a password if you
        connect first time.)
      </p>
      <pre
        dangerouslySetInnerHTML={{ __html: `ssh your_user@your-server.com` }}
      />

      <p>When connected, generate new key pair. Keep password empty.</p>
      <pre dangerouslySetInnerHTML={{ __html: `ssh-keygen -t rsa` }} />

      <p>
        You might want to set some unique name for the key, just to make it
        easier to find it later.
      </p>

      <p>When generated, authorize those keys:</p>
      <pre
        dangerouslySetInnerHTML={{
          __html: `ssh-copy-id -i ~/.ssh/key-name your_user@your-server.com`,
        }}
      />

      <p>
        Now copy private key value and paste it as a value for{" "}
        <code>SERVER_SSH_KEY</code> in “Secrets” section.
      </p>
      <pre dangerouslySetInnerHTML={{ __html: `pbcopy < ~/.ssh/key-name` }} />

      <h2>4. Setup Project Secrets</h2>
      <p>Create new secrets in the “Secrets” section in GitHub repository.</p>
      <img
        src="/custom-3.png"
        alt="Create new secrets in the “Secrets” section"
      />

      <ul>
        <li>
          <code>SERVER_SSH_KEY</code>, private SSH key on a server, required for
          authenticating this action on a server;
        </li>
        <li>
          <code>REMOTE_HOST</code>, server host to connect via SSH;
        </li>
        <li>
          <code>REMOTE_USER</code>, user to connect via SSH;
        </li>
        <li>
          <code>TARGET</code>, directory on a server to upload build assets to.
        </li>
      </ul>

      <p>
        When it's done, update your code, push changes to <code>master</code>{" "}
        branch and GitHub Action will build your project, export everything to{" "}
        <code>out</code> directory and deploy all the assets using{" "}
        <code>rsync</code> utility.
      </p>

      <p>
        <Link href="/">
          <a>Back to main page</a>
        </Link>
      </p>
    </main>
  );
};

export default Custom;
