import { Client, Discord, On } from "discordx";
import Constants from "../utils/Constants.js";

@Discord()
export default class Ready {
    @On({ event: "ready" })
    private async onReady([], client: Client): Promise<void> {
        await client.guilds.fetch();
        await client.clearApplicationCommands();
        if (Constants.devMode) {
            await client.initGlobalApplicationCommands();
        } else await client.initGuildApplicationCommands(
            process.env.DISCORD_DEV_GUILD_ID,
            Array.from(client.applicationCommands)
        );

        console.log(`Logged in as ${client.user.username}`);
    }
}