import React from "react";
import Head from "next/head";
import Link from "next/link";

const Vercel = () => {
  return (
    <main>
      <Head>
        <title>Deploying on Vercel</title>
      </Head>

      <h1>Deploying on Vercel</h1>
      <p>
        First of all, let's deploy our app on Vercel—an all-in-one platform with
        Global CDN supporting static & JAMstack deployment and Serverless
        Functions.
      </p>

      <h2>1. Create a Repo on GitHub</h2>
      <p>
        Firstly, create a new repository to connect Vercel with your codebase.
        It will allow you to use commits to <code>master</code> as a trigger to
        deploy.
      </p>
      <img src="/vercel-1.png" alt="Create a new GitHub repository" />

      <p>It can be public or private, Vercel works with either.</p>
      <img
        src="/vercel-2.png"
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

      <h2>2. Create an Account on Vercel</h2>
      <p>
        To connect a GitHub repo with Vercel you're going to need to sign up to
        Vercel. (If you already have an account, you can skip this section.)
      </p>

      <p>
        Go to a <a href="https://vercel.com/onboarding">signup page</a> and
        create an account.
      </p>

      <h2>3. Import a Project</h2>
      <p>
        When your account is ready, go to a{" "}
        <a href="https://vercel.com/dashboard">dashboard</a> and find an “Import
        Project” button.
      </p>
      <img
        src="/vercel-3.png"
        alt="Vercel dashboard with “Import project” button"
      />

      <p>Hit that button and select “Import Git Repository” option after.</p>
      <img src="/vercel-4.png" alt="Vercel “Import Git Repository” screen" />

      <p>Then, enter the repository URL and hit “Continue”.</p>
      <img src="/vercel-5.png" alt="A text field for specifying git URL" />

      <p>
        You will be asked by GitHub for permissions. Allow Vercel to read and
        write access to selected repository.
      </p>

      <p>
        Then GitHub will redirect you on Vercel back and you will see the import
        settings screen.
      </p>
      <img
        src="/vercel-6.png"
        alt="Deployment settings such as build options and environment variables"
      />

      <p>
        On this screen you can specify build options and environment variables.
        For example, if you have a custom build script you can override default{" "}
        <code>npm run build</code> command with your own in the special text
        field.
      </p>

      <p>
        Same with the environment variables, if you need to pass a{" "}
        <code>NODE_ENV</code> or some other variables you can do it here.
      </p>

      <p>
        After you hit “Deploy” you will see congratulations screen with a
        “Visit” link, which will lead to freshly deployed app on vercel.app
        domain. Hit this link to open and inspect the current deployment.
      </p>
      <img src="/vercel-7.png" alt="Deployment result screen" />

      <p>
        Also on dashboard you will be able to see a current production
        deployment and a list of “Preview deployments”.
      </p>
      <img src="/vercel-8.png" alt="Production deployment screen" />

      <p>
        The ”Preview deployments“ list will be empty until you create a
        pull-request to <code>master</code> branch in your repo.
      </p>

      <p>
        Preview deployments are useful to inspect changes in deployed project
        live. When you create a new branch, update code, commit and push changes
        to a repo, create a pull-request from this branch to <code>master</code>
        .
      </p>
      <img src="/vercel-9.png" alt="“Create pull-request” button on GitHub" />

      <p>
        Vercel-bot will automatically deploy this pull-request to a stage server
        which you can inspect by a link that Vercel will give you in a comment.
      </p>
      <img
        src="/vercel-10.png"
        alt="Vercel-bot's comment on pull-request with info about stage deployment"
      />

      <p>
        Also, this stage deployment will be displayed in the list of preview
        deployments in Vercel dashboard.
      </p>
      <img src="/vercel-11.png" alt="The list of preview deployments" />

      <p>
        <Link href="/">
          <a>Back to main page</a>
        </Link>
      </p>
    </main>
  );
};

export default Vercel;
