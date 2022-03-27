const Rest = require("./Rest");
const util = require("../util");
const setting = require('../../data/setting.js')
const FiltersValues = require("../constants/FilterValues.js");

module.exports = class MusicHandler {
    /** 
     * @param {import("discord.js").Guild} guild 
     */
    constructor(guild) {
        this.guild = guild;
        this.volume = 100;
        this.loop = 0; // 0 = none; 1 = track; 2 = queue;
        this.previous = null;
        this.current = null;
        this.queue = [];
        /** @type {import("discord.js").TextChannel|null} */
        this.textChannel = null;
        this.shouldSkipCurrent = false;
    }

    get voiceChannel() {
        return this.guild.me.voice.channel;
    }

    /** @returns {import("../structures/MusicClient")} */
    get client() {
        return this.guild.client;
    }

    get player() {
        return this.client.manager.players.get(this.guild.id) || null;
    }

    get node() {
        return this.client.manager.nodes.get("main");
    }

    reset() {
        this.loop = 0;
        this.volume = 100;
        this.previous = null;
        this.current = null;
        this.queue = [];
        this.textChannel = null;
    }

    /** @param {import("discord.js").VoiceChannel} voice */
    async join(voice) {
        if (this.player) return;
        await this.client.manager.join({
            channel: voice.id,
            guild: this.guild.id,
            node: this.node.id
        }, { selfdeaf: true });

        this.player.on("start", async (track) => {
                this.current = this.queue.shift();
                if (this.textChannel){
                    function millisToMinutesAndSeconds(millis) {
                        var minutes = Math.floor(millis / 60000);
                        var seconds = ((millis % 60000) / 1000).toFixed(0);
                        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                    }

                    await this.textChannel.send(util.embed()
                        .setColor('#4fe7fd')
                        .setThumbnail(`https://i.ytimg.com/vi/${this.current.info.identifier}/maxresdefault.jpg`)
                        .addField(`${setting.emoji.music} |  เพลง :`,`[${this.current.info.title}](${this.current.info.uri})`,false)
                        .addField(`เพิ่มโดย`,`**\` ${this.current.requester.username} \`**`,true)
                        .addField(`ความยาวเพลง`,`**\` ${millisToMinutesAndSeconds(this.current.info.length)} \`**`,true)
                        .setFooter('K w a n')
                        .setTimestamp()
                    );
                    const logchannel = require('../../log/tracklog.js');
                    logchannel(this.client,this.current,track);
                }
            })
            .on("end", (data) => {
                if (data.reason === "REPLACED") return;
                this.previous = this.current;
                this.current = null;

                if (this.loop === 1 && !this.shouldSkipCurrent) this.queue.unshift(this.previous);
                else if (this.loop === 2) this.queue.push(this.previous);

                if (this.shouldSkipCurrent) this.shouldSkipCurrent = false;

                if (!this.queue.length) {
                    this.client.manager.leave(this.guild.id);
                    if (this.textChannel) this.textChannel.send(util.embed().setDescription("✅ | Queue is empty. Leaving voice channel.."));
                    this.reset();
                    return;
                }
                this.start();
            })
            .on("error", console.error);
    }

    /** @param {import("discord.js").TextChannel} text */
    setTextCh(text) {
        this.textChannel = text;
    }

    async load(query) {
        const res = await Rest.load(this.node, query, this.client.spotify);
        return res;
    }

    async start() {
        if (!this.player) return;
        await this.player.play(this.queue[0].track);
    }

    async pause() {
        if (!this.player) return;
        if (!this.player.paused) await this.player.pause(true);
    }

    async resume() {
        if (!this.player) return;
        if (this.player.paused) await this.player.pause(false);
    }

    async skip(to = 1) {
        if (!this.player) return;
        if (to > 1) {
            this.queue.unshift(this.queue[to - 1]);
            this.queue.splice(to, 1);
        }
        if (this.loop === 1 && this.queue[0]) this.shouldSkipCurrent = true;
        await this.player.stop();
    }

    async stop() {
        if (!this.player) return;
        this.loop = 0;
        this.queue = [];
        this.vaporwave = false;
        this.nightcore = false;
        this._8d = false;
        this.bassboost = false;
        await this.skip();
    }

    async setVolume(newVol) {
        if (!this.player) return;
        const parsed = parseInt(newVol, 10);
        if (isNaN(parsed)) return;
        await this.player.volume(parsed);
        this.volume = newVol;
    }

    async setNightcore(val) {
        if(val === true){
            this.vaporwave = false;
            this._8d = false;
            this.bassboost = false;
            this.player.node.send({
                op: "filters",
                guildId: this.guild.id || this.guild,
                timescale: { speed: 1.1999999523162842, pitch: 1.2999999523163953, rate: 1 },
            });
            this.nightcore = true;
        }
        else if(val === false){
            this.player.node.send({
                op: "filters",
                guildId: this.guild.id || this.guild,
            });
            this.nightcore = false;
        }
        else return;
    }

    async setVaporwave(val) {
        if(val === true){
            this.nightcore = false;
            this._8d = false;
            this.bassboost = false;
            this.player.node.send({
                op: "filters",
                guildId: this.guild.id || this.guild,
                timescale: { speed:0.8500000238418579, pitch: 0.800000011920929, rate: 1 },
            });
            this.vaporwave = true;
        }
        else if(val === false){
            this.player.node.send({
                op: "filters",
                guildId: this.guild.id || this.guild,
            });
            this.vaporwave = false;
        }
        else return;
    }

    async setBassboost(bassboost) {
        if (bassboost) {
            this.nightcore = false;
            this.vaporwave = false;
            this.setNightcore(false);
            this.setNightcore(false);
            this.player.equalizer(Array(3).fill(null).map((n, i) => ({ band: i, gain: bassboost })));
            this.bassboost = bassboost;
        } else this.player.node.send({
            op: "filters",
            guildId: this.guild.id || this.guild,
        });
        this.bassboost = bassboost;
        return this;
    }
};
