import { CommandInteraction, Client } from "discord.js";
import { Next, GuardFunction } from "discordx";

export default class InteractionGuards {
    public static async Defer(
        interaction: CommandInteraction,
        _: Client,
        next: Next
    ): Promise<GuardFunction<CommandInteraction>> {
        try {
            await interaction.deferReply();
            await next();
        } catch (e: any) {
            return;
        }
    }
}