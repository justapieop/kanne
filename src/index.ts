(await (import("dotenv"))).config();
import { ClusterManager, Cluster } from "discord-hybrid-sharding";

const manager: ClusterManager = new ClusterManager("dist/client/index.js", {
    token: process.env.DISCORD_TOKEN,
    totalShards: "auto",
    totalClusters: "auto",
    mode: "worker"
});

manager.on("clusterCreate", (cluster: Cluster) =>
    console.log(`Cluster ID: ${cluster.id} is ready.`)
);

await manager.spawn({ timeout: -1 });