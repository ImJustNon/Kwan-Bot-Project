const chalk = require('chalk')

module.exports = {
    name: "ready",
    exec: async (client) => {
        console.log(chalk.blue.bold(`[Music-Client] `) + chalk.green.bold('------------ [MusicClient] ------------'))
        console.log(chalk.blue.bold(`[Music-Client] `) + chalk.white.bold('Logged in as ') + chalk.blue.bold(`${client.user.tag}`));


        if (client.spotify) await client.spotify.requestToken();

        const nodes = [...client.manager.nodes.values()];
        for (const node of nodes) {
            try {
                await node.connect();
            } catch (e) {
                client.manager.emit("error", e, node);
            }
        }
    }
};
