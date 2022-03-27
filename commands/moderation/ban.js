
  
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const setting = require("../../data/setting.js")

module.exports = {
    config: {
        name: "ban",
        aliases: ["b", "banish"],
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    },
    run: async (bot, message, args) => {
       
       const e1 =  new MessageEmbed()
        .setDescription(`**คุณไม่มีสิทธิในการเเบนได้น่ะคะ [BAN_MEMBERS]**`)
        .setColor("RED")

        const e2 =  new MessageEmbed()
        .setDescription(`โปรดใส่ชื่อผู้ใช้ที่ต้องการจะเเบนด้วยน่ะคะ`)
        .setColor("YELLOW")

        const e3 =  new MessageEmbed()
        .setDescription(`ไม่มีผู้ใช้ ชื่อนี้ในในเซิฟเวอร์`)
        .setColor("RED")

        const e4 =  new MessageEmbed()
        .setDescription(`เดี๋ยวน่ะ! คุณไม่สามารถเเบนตัวเองได้น่ะคะ`)
        .setColor("RED")

       const e5 =  new MessageEmbed()
       .setDescription(`ไม่สามารถเเบนผู้ใช้ ที่มียศสูงกว่าได้น่ะคะ`)     
       .setColor("YELLOW")
       
        try {
            if (!message.member.hasPermission("BAN_MEMBERS") && !setting.mainbot.OwnerID .includes(message.author.id)) return message.channel.send(e1);

            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(e1);
            if (!args[0]) return message.channel.send(e2)

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send(e3);
            if (banMember === message.member) return message.channel.send(e4)

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send(e5)
            try {
            message.guild.members.ban(banMember)
            banMember.send(`**สวัสดีค่ะ, \nขอเเสดงความเสียใจด้วยน่ะคะคุณได้ถูกเเบนจาก ${message.guild.name} เนื่องจาก ${reason || "ไม่ได้กำหนด"}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** ถูกเเบนเนื่องจาก ${reason}`)
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** ถูกเเบนเเล้ว`)
            message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**คำสั่ง**", "ban")
                .addField("**ผู้ใช้**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**เเบนโดย**", message.author.username)
                .addField("**เนื่องจาก**", `${reason || "**No Reason**"}`)
                .addField("**วันที่**", message.createdAt.toLocaleString())
                .setFooter('K w a n')
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};
