const setting = require('../data/setting.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')

module.exports = async function (bot,message,args,commandfile) {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
    try {
        let fetched = await db.fetch(`prefix_${message.guild.id}`);
        if (fetched == null) {
            prefix = setting.mainbot.Prefix
        } else {
            prefix = fetched
        }
    } catch (e) {
        console.log(e)
    };

    let logchannel = bot.channels.cache.get(setting.mainbot.logChannel)
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const embed = new MessageEmbed()
        .setColor('#fc1c85')
        .setAuthor(`${bot.user.tag} Music-Client Logging`,bot.user.displayAvatarURL())
        .setThumbnail(message.guild.iconURL())
        .setDescription(`**\`\`\`asciidoc
Name        :: ${commandfile.name}
Description :: ${commandfile.description ||'ไม่ได้ระบุ'}
Aliases     :: ${commandfile.aliases || 'ไม่ได้ระบุ'}
Prefix      :: ${prefix}
User        :: ${message.author.tag}
UserID      :: ${message.author.id}
Channel     :: ${message.channel.name}
ChannelID   :: ${message.channel.id}
Guild       :: ${message.guild.name} 
GuildID     :: ${message.guild.id}
Args        :: ${args.join(' ') || 'ไม่ได้ระบุ'}
MemberCount :: ${message.guild.memberCount}
Date        :: ${date}
Time        :: ${time}
\`\`\`**`)
        .setFooter('K w a n')
        .setTimestamp()

    logchannel.send(embed);
}