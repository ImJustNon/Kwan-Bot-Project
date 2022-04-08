const prettyMs = require("pretty-ms");
const util = require("../util");
const moment = require("moment");

module.exports = {
    name: "musicstats",
    exec: (msg) => {
        /** @type {import("lavacord").LavalinkNode[]} */
        const nodes = [...msg.client.manager.nodes.values()];

        msg.channel.send(util.embed()
            .setAuthor("สถานะ Lavalink Node(s)")
            .setDescription(
                nodes.map(node  => {
                    const cpuLoad = (node.stats.cpu.lavalinkLoad * 100).toFixed(2);
                    const memUsage = (node.stats.memory.used / 1024 / 1024).toFixed(2);
                    const uptime = prettyMs(node.stats.uptime, { verbose: true, secondsDecimalDigits: 0 });

                    return `\`\`\`asciidoc
ID        :: ${node.id}
Status    :: ${node.connected ? "Connected" : "Disconnected"}
CPU Load  :: ${cpuLoad}%
Mem Usage :: ${memUsage} MB
Uptime    :: ${uptime}\`\`\``;
                })
            )
            .setFooter('K w a n')
            .setTimestamp()
        );
    }
};
