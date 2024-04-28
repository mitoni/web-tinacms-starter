# Web CMS Starter 🦙

Preconfigured version of Tina Self Hosted for quicker development of custom websites with a visual CMS.

- Bun 🥠
- UI components' file structure divided in:
    - Bits: displayed in sections,
    - Sections: displayed in layouts,
    - Layouts: pages layouts,
- Dynamic load of components from a single file using utility function `getComponentFromFilename`,
- Next Auth with email and password without using Tina Cloud and being limited to 2 users,
- More to come,

### Environment Variable Setup

After the repository is created, you will need to do the following steps to get the environment variables setup:

1. Create a new [GitHub personal access token (PAT)](https://github.com/settings/personal-access-tokens/new) with content access to the new repository and copy the token as the value for the `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable.
2. Fill out the `NEXTAUTH_SECRET` environment variable with a random string generated using `scripts/generate-auth-secret.sh`.
3. Store the Github PAT as well as the `NEXTAUTH_SECRET` in Vercel's Environment Variables.
4. Copy the `NEXTAUTH_SECRET` in the local .env file (if you haven't already, create a copy of `.env.example` and rename it `.env`.

### Users Setup
To be able to login in the production environment we need to set a password locally while connected to the production kv storage.
1. Fill out `KV_REST_API_URL` and `KV_REST_API_TOKEN` in the `.env` file with the values from Vercel.
2. Run the app using `bun dev:prod` 
3. Login using the default credentials found in `content/user/index.json` and change the password accordingly. 
4. After deploying the website, login using the default user name and the newly created password.


# Local Development

## Requirements

- Git, [Node.js Active LTS](https://nodejs.org/en/about/releases/), Yarn installed for local development.

Set up the .env file:

```
cp .env.example .env
```

Fill in the .env file with your own values.

> Hint: NEXTAUTH_SECRET can be generated with `openssl rand -base64 32`

```env
GITHUB_OWNER=***
GITHUB_REPO=***
GITHUB_BRANCH=***
GITHUB_PERSONAL_ACCESS_TOKEN=***

NEXTAUTH_SECRET=***
```

Run the project locally:

> This will start TinaCMS in "Local Mode", meaning all changes will be made to the local file system and no auth is required.

```
bun run dev
```

Run the project locally with Vercel KV:

> This will start TinaCMS in "Production Mode", meaning all changes will be made to the Vercel KV, and GitHub. Database and auth are required.

First add the following environment variables to your `.env` file:

```env
# Get these from vercel if you want to run yarn dev:prod
KV_REST_API_URL=***
KV_REST_API_TOKEN=***
```

Then run the following command:

```
bun run dev:prod
```

## Environment Variables

| Variable                       | Description                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `GITHUB_OWNER`                 | The owner of the repository you want to use for your content. Required in local development. Defaults to VERCEL_GIT_REPO_OWNER in Vercel.  |
| `GITHUB_REPO`                  | The name of the repository you want to use for your content. Required in local development. Defaults to VERCEL_GIT_REPO_SLUG in Vercel.    |
| `GITHUB_BRANCH`                | The branch of the repository you want to use for your content. Defaults to `VERCEL_GIT_COMMIT_REF` or `main` if not specified.             |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | A [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with `repo` access. |
| `NEXTAUTH_SECRET`              | A secret used by NextAuth.js to encrypt the NextAuth.js JWT.                                                                               |
| `KV_REST_API_URL`              | The URL of the Vercel KV database.                                                                                                         |
| `KV_REST_API_TOKEN`            | The token for authenticating to the Vercel KV database.                                                                                    |
| `NEXT_PUBLIC_TINA_CLIENT_ID`   | The client id for your Tina Cloud application. Only required for Tina Cloud authorization.                                                 |

## Deploying to Vercel

This demo is configured with default username / password authentication backed by [Vercel KV](https://vercel.com/docs/storage/vercel-kv). Other
NextAuth providers can be used, as well other auth solutions such as [Clerk](https://clerk.com).

### Setting up Vercel KV

1. Create a Vercel account and visit the Storage [tab](https://vercel.com/dashboard/stores) in the dashboard.
2. Click Create and select the KV (Durable Redis) option.
3. Give the KV database a name, select the nearest region and click Create.
4. In Quickstart, click `.env.local` and Copy Snippet to get the connection details (save these for later).

![Animation showing how to setup Vercel KV](public/setup-kv-store.gif?raw=true "Setting up Vercel KV")

### Create a GitHub personal access token

1. Create a [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with `repo` access. (Note the expiration date of the token.)
2. Add the token to the `.env` file (`GITHUB_PERSONAL_ACCESS_TOKEN`)

![Animation showing how to create a personal access token](public/create-token.gif?raw=true "Creating a personal access token")

### Deploying the project in Vercel

1. Create a new project in Vercel and select this Git repository.
2. In the Environment Variables section, you can copy and paste your entire `.env` file into the first input.
3. Click Deploy and wait for the project to build.
4. Visit the project URL and navigate to `/admin/index.html` to log in. The default username and password can be found in [content/users/index.json](content/users/index.json). After your first login, be sure to update your password.

![Animation showing deployment to Vercel](public/deploy-vercel.gif?raw=true "Deploying to Vercel")
