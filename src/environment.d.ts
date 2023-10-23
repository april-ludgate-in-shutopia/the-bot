declare module "bun" {
  interface Env {
    DEV: boolean;
    DISCORD_BOT_TOKEN: string | undefined;
    DISCORD_APPID: string | undefined;
    OPENAI_API_KEY: string | undefined;
  }
}
