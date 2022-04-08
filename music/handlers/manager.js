const { Manager } = require('erela.js');
const client = require('../../index.js');
const setting = require('../../data/setting.js');
//plugin
const deezer = require("erela.js-deezer");
const Spotify = require("erela.js-spotify")
const apple = require("erela.js-apple");
const facebook = require("erela.js-facebook");
const JooxAPI = require("superweir-jooxapi");
const xtonesJoox = require("xtones-musicjoox");

const manager = new Manager({
    send(id, payload){
        let guild = client.guilds.cache.get(id);
        guild.shard.send(payload);
    },
    autoPlay : setting.music.autoplay,
    nodes : setting.music.nodes,
    plugins : [
        new Spotify({
            clientID : setting.music.spotify.id,
            clientSecret : setting.music.spotify.secret,
        }),
        new apple(),
        new facebook(),
        new deezer(),
        new JooxAPI(),
        new xtonesJoox(),
    ],
});

module.exports = manager;