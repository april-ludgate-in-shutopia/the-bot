# the-bot

# Setup

A file called `.env` should be created with the following values:

- DISCORD_BOT_TOKEN (string): On Discord **Bot** page after [creating bot user](https://discord.com/developers/applications/)
- DISCORD_APPID (string): Discord Application ID from the same page
- OPENAI_API_KEY (string): from https://platform.openai.com/account/api-keys

If you want to develop, [Bun](https://bun.sh) is required. Once installed run `bun install` to download dependencies from npm.

> [!IMPORTANT]
> When installing new dependencies, you must use the same **Bun** version as in [Dockerfile](./Dockerfile)

## Running

`docker-compose up`, or `docker-compose up --build` after changes - this is meant for production or testing only and will not restart on changes.

A local dev build that will restart on file changes can be started with `bun dev`.
