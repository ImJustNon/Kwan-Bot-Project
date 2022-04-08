const { Manager } = require("@lavacord/discord.js"); //@lavacord/discord.js
const { Client, Collection } = require("discord.js");
const { promises: { readdir } } = require("fs");
const { join } = require("path");
const { LavasfyClient } = require("lavasfy");
const { PREFIX, Token} = require("../../config.js")
const setting = require('../../data/setting.js')
const chalk = require('chalk')
require("../extensions");





module.exports = class MusicClient extends Client {
    /** @param {import("discord.js").ClientOptions} [opt] */
    



    constructor(opt) {
        super(opt);
        this.commands = new Collection();
        this.manager = new Manager(this, [
            {
                id: setting.music.lavalink.id,
                host: setting.music.lavalink.host,
                port: setting.music.lavalink.port,
                password: setting.music.lavalink.pass,
                secure: setting.music.lavalink.secure,
            }
        ]);
        this.spotify = setting.music.spotify.enable
            ? new LavasfyClient({
                clientID: setting.music.spotify.id,
                clientSecret: setting.music.spotify.secret,
                playlistLoadLimit: setting.music.spotify.spotify_playlist_page_limit,
                audioOnlyResults: true,
                useSpotifyMetadata: true
            }, [...[...this.manager.nodes.values()]])
            : null;

        this.prefix = PREFIX ;
    }

    build() {
        this.loadCommands();
        this.loadEventListeners();
        this.login(Token);

        this.manager
            .on("ready", node => {
                console.log(chalk.blue.bold(`[Music-Client] `) + chalk.white.bold(`Lava-link ${node.id} is connected`))
                console.log(chalk.blue.bold(`[Music-Client] `) + chalk.green.bold('------------ [MusicClient] ------------'))
            })
            .on("disconnect", (ws, node) => console.log(`Node ${node.id} disconnected.`))
            .on("reconnecting", (node) => console.log(`Node ${node.id} tries to reconnect.`))
            .on("error", (error, node) => console.log(chalk.blue.bold(`[Music-Client] `) + chalk.white.bold(`Node ${node.id} got an error: ${error.message}`)));
    }

    /** @private */
    async loadCommands() {
        const commands = await readdir(join(__dirname, "..", "commands"));
        for (const commandFile of commands) {
            const command = require(`../commands/${commandFile}`);
            console.log(chalk.blue.bold(`[Music-Client] `) + chalk.magenta.bold(`Loading command : `) + chalk.cyan.bold(`${commandFile}`))
            this.commands.set(command.name, command);
        }
    }

    /** @private */
    async loadEventListeners() {
        const listeners = await readdir(join(__dirname, "..", "events"));
        for (const listenerFile of listeners) {
            const listener = require(`../events/${listenerFile}`);
            console.log(chalk.blue.bold(`[Music-Client] `) + chalk.magenta.bold(`Loading event : `) + chalk.cyan.bold(`${listenerFile}`))
            this.on(listener.name, (...args) => listener.exec(this, ...args));
        }
    }

};
