const db = require('quick.db');
const setting = require('../data/setting.js');
const { MessageEmbed } = require('discord.js');

module.exports = async function (bot,current,track) {
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const guild = bot.guilds.cache.get(track.guildId);

    let logchannel = bot.channels.cache.get(setting.mainbot.logChannel)
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const embed = new MessageEmbed()
        .setColor('#24ff3d')
        .setAuthor(`${bot.user.tag} Track Logging`,bot.user.displayAvatarURL())
        .setThumbnail(`https://i.ytimg.com/vi/${current.info.identifier}/maxresdefault.jpg`)
        .setDescription(`**\`\`\`asciidoc
Name        :: ${current.info.title}
Channel     :: ${current.info.author}
Length      :: ${millisToMinutesAndSeconds(current.info.length)}
Url         :: ${current.info.uri}
Identifier  :: ${current.info.identifier}
Platform    :: ${current.info.sourceName}
Track       :: ${current.track}
User        :: ${current.requester.username}
UserID      :: ${current.requester.id}
Guild       :: ${guild.name}
GuildID     :: ${guild.id}
Date        :: ${date}
Time        :: ${time}
\`\`\`**`)
        .setFooter('K w a n')
        .setTimestamp()

    logchannel.send(embed);
}