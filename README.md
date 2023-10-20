# the-bot

# Setup

A file called `.env` should be created with the following values:

- BOT_TOKEN: On Discord **Bot** page after [creating bot user](https://discord.com/developers/applications/)
- OPENAI_API_KEY: from https://platform.openai.com/account/api-keys

If you want to develop, [Bun](https://bun.sh) is required. Once installed run `bun install` to download dependencies from npm.

## Running

`docker-compose up`, or `docker-compose up --build` after changes - this is meant for production or testing only and will not restart on changes.

A local dev build that will restart on file changes can be started with `bun dev`.
