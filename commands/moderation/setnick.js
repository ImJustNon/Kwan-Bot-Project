const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: "setnick",
        aliases: ["sn", 'nick'],
        category: "moderation",
        description: "Sets Or Changes Nickname Of An User",
        usage: "[mention | name | nickname | ID] <nickname>",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [CHANGE_NICKNAME] เพื่อใช้คำสั่งนี้น่ะคะ**");

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**ขวัญไม่มีสิทธิพอน่ะคะ ต้องการยศ [CHANGE_NICKNAME] ค่ะ**");
      
        if (!args[0]) return message.channel.send("**โปรดใส่ชื่อผู้ใข้ด้วยค่ะ**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**โปรดใส่ชื่อผู้ใข้ด้วยค่ะ**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**ไม่สามารถเปลี่ยนชื่อผู้ใช้นี้ได้ค่ะ**')

        if (!args[1]) return message.channel.send("**โปรดใส่ชื่อที่ต้องการจะเปลี่ยนด้วยค่ะ**");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**เปลี่ยนชื่อผู้ใช้ของ ${member.displayName} เป็น ${nick}**`)
        message.channel.send(embed)
        } catch {
            return message.channel.send("**เอ๊ะ! ดูเหมือนว่าสิทธิของขวัญจะหายไปน่ะคะ [CHANGE_NICKNAME]")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**คำสั่ง**", "setnick")
            .addField("**ชื่อของ**", member.user.username)
            .addField("**เปลี่ยนโดย**", message.author.username)
            .addField("**เปลี่ยนเป็น**", args[1])
            .addField("**วันที่**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}