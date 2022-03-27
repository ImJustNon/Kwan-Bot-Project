const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports = {
    config: {
        name: "whois",
        description: "userinfo",
        usage: "m/whois <mention a member/member id>",
        aliases: ['ui', 'userinfo']
    },
    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'ไม่มี';
        let whoisPermErr = '**ขออภัยค่ะ คุณจำเป็นต้องมีสิทธิ \` MANAGE_MESSAGES \` **';

        if(!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES") ) {
            return message.channel.send(whoisPermErr)
        }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        

        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Manage Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("No Key Permissions Found");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'เจ้าของเซิฟเวอร์';
        }
    
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('#2F3136')
            .setThumbnail(member.user.displayAvatarURL())
            .addField('__ID__',`${member.id}`)
            .addField('__เข้าร่วมเมื่อ:__ ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
            .addField('__สร้างเมื่อ:__', member.user.createdAt.toLocaleString())
            .addField(`\n__ยศที่มี: [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`)
            .addField("\n__สถานะ:__ ", `${acknowledgements}`)
            .addField("\n__สิทธิ:__ ", `${permissions.join(` | `)}`)
            .setFooter('K w a n')
            .setTimestamp()

        message.channel.send({embed});
    
    }
}
