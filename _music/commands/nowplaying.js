const util = require("../util");
const canvacord = require("canvacord");
const Discord = require('discord.js');

module.exports = {
    name: "nowplaying",
    aliases: ["np", "nowplay"],
    exec: (msg) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setDescription("❌ | Currently not playing anything."));
        const progress = util.progress(music.player.state.position, music.current.info.length);

        const videothumbnail = `https://i.ytimg.com/vi/${music.current.info.identifier}/maxresdefault.jpg`;

        

            
        const embed = util.embed()
            .setColor('#ee30ff')
            .setThumbnail(videothumbnail)
            .setTitle(`🎶 | กำลังเล่นเพลง `)
            .setDescription(`${music.current.info.isStream ? "[**\🔴 ถ่ายทอดสด**]  " : ""}\n[${music.current.info.title}](${music.current.info.uri})` + `${music.current.info.isStream ? "" : `\n\n${util.millisToDuration(music.player.state.position)} ${progress.bar} ${util.millisToDuration(music.current.info.length)}`}`)
            .setFooter('K w a n')
            .setTimestamp()

        msg.channel.send(embed);
    }
};



/*const card = new canvacord.Spotify()
            .setTitle(music.current.info.title)
            .setAuthor(music.current.info.author)
            .setStartTimestamp(0.04)
            .setEndTimestamp(util.millisToDuration(music.current.info.length))
            .setImage(videothumbnail)
        card.build().then(async(data) =>{
            const attachment = new Discord.MessageAttachment(data, `nowplaying-card.png`);
            const embed = util.embed()
                .setThumbnail(videothumbnail) 
                .attachFiles(attachment)
                .setImage('attachment://nowplaying-card.png')
                .setFooter('K w a n')
                .setTimestamp()
            await msg.channel.send(embed);
            console.log(music.player.state.position);
            console.log(util.millisToDuration(music.player.state.position))
        });*/
