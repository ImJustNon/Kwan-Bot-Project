const db = require('quick.db');
const setting = require('../data/setting.js');
const { MessageEmbed } = require('discord.js');

module.exports = async(bot, guild) =>{
    let prefix;
    try{
        let fetched = await db.fetch(`prefix_${guild.id}`);
        if (fetched == null) {
            prefix = setting.mainbot.Prefix
        } else {
            prefix = fetched
        }
    } 
    catch(e){
        console.log(e)
    };

    let findGuildOwner = bot.users.cache.find(user => user.id === guild.ownerID);
    let ownerName;
    if(findGuildOwner) ownerName = findGuildOwner.tag;
    else ownerName = 'ไม่พบผู้ใช้';

    let findSystemChannel = guild.channels.cache.get(guild.systemChannelID);
    let SystemChannelName;
    if(SystemChannelName) SystemChannelName = findSystemChannel.name;
    else SystemChannelName = 'ไม่พบช่องข้อความระบบ';

    let logchannel = bot.channels.cache.get(setting.mainbot.logChannel)
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const embed = new MessageEmbed()
        .setColor('#fff126')
        .setAuthor(`${bot.user.tag} Join Guild Logging`,bot.user.displayAvatarURL())
        .setThumbnail(guild.iconURL())
        .setDescription(`**\`\`\`asciidoc
Guild Name          :: ${guild.name}
Guild ID            :: ${guild.id}
Prefix              :: ${prefix}
Region              :: ${guild.region}
MemberCount         :: ${guild.memberCount}
Owner Name          :: ${ownerName}
Owner ID            :: ${guild.ownerID}
Large               :: ${guild.large ? 'True' : 'False'}
SystemChannelName   :: ${SystemChannelName}
SystemChannelID     :: ${guild.systemChannelID}
PremiumTier         :: ${guild.premiumTier}
premiumSubsCount    :: ${guild.premiumSubscriptionCount}
Date                :: ${date}
Time                :: ${time}
\`\`\`**`)
        .setFooter('K w a n')
        .setTimestamp()

    logchannel.send(embed);
}