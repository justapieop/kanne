import { Colors, CommandInteraction, Message } from "discord.js";
import { Client, Discord, Guard, Slash } from "discordx";
import InteractionGuards from "../../guards/InteractionGuards.js";

@Discord()
export default class Ping {
    @Slash({
        name: "ping",
        description: "Show how long it takes for the bot to reach the server."
    })
    @Guard(InteractionGuards.Defer)
    private async onPing(
        interaction: CommandInteraction,
        client: Client
    ): Promise<void> {
        const wsPing: number = client.ws.ping;

        const msg: Message = await interaction.editReply({
            embeds: [
                {
                    color: Colors.Green,
                    description: "🏓 Pinging..."
                }
            ]
        });

        const ping: number = Math.abs(interaction.createdTimestamp - msg.createdTimestamp);

        await msg.edit({
            embeds: [
                {
                    color: Colors.Green,
                    description: `🏓 Ping: ${ping}ms\n🏓 Websocket Ping: ${wsPing}ms`
                }
            ]
        });
    }
}