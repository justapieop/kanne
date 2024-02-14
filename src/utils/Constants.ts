(await (import("dotenv"))).config();
import { IntentsBitField } from "discord.js";

const Constants = {
    intents: IntentsBitField.Flags.Guilds |
        IntentsBitField.Flags.GuildMembers,
    devMode: process.env.NODE_ENV.toLowerCase() === "dev"
};

export default Constants;