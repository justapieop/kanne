import "reflect-metadata";
(await (import("dotenv"))).config();
import { PrismaClient } from "@prisma/client";
import { Client } from "discordx";
import { Options } from "discord.js";
import Constants from "../utils/Constants.js";
import { dirname, importx } from "@discordx/importer";
import { getInfo } from "discord-hybrid-sharding";

declare module "discord.js" {
    export interface Client {
        prisma?: PrismaClient
    }
}

export default class BotClient extends Client {
    public constructor() {
        super({
            intents: Constants.intents,
            makeCache: Options.cacheWithLimits({
                ...Options.DefaultMakeCacheSettings,
                MessageManager: {
                    maxSize: 25
                }
            }),
            sweepers: {
                ...Options.DefaultSweeperSettings,
                messages: {
                    interval: 43200,
                    lifetime: 21600
                }
            },
            silent: !Constants.devMode,
            shards: getInfo().SHARD_LIST,
            shardCount: getInfo().TOTAL_SHARDS,
        })

        this.prisma = new PrismaClient();
    }

    public async run(): Promise<void> {
        await importx(`${dirname(import.meta.url)}/../{commands,events}/**/*.{js,ts}`);

        try {
            await this.prisma.$connect();
            console.log("Connected to database");
        } catch (e: any) {
            console.log("Failed to connect to database. Exiting...");
            process.exit(1);
        }

        await this.login(process.env.DISCORD_TOKEN);
    }
}