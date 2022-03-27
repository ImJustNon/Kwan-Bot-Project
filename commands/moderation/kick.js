const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    config: {
        name: "kick",
        category: "moderation",
        description: "Kicks the user",
        accessableby: "Administrator",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        aliases: [],
    },
    run: async (bot, message, args) => {

        const em1 =  new MessageEmbed()
            .setDescription(`คุณไม่มีสิทธิพอน่ะคะ`)
            .setColor("YELLOW")

      const em2 =  new MessageEmbed()

       .setDescription(`ดูเหมือนว่าสิทธิในการเตะผู้ใช้หายไปน่ะคะ`)
      .setColor("YELLOW")

        try {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(em1);
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(em2);

            if (!args[0]) return message.channel.send('**โปรดใส่ชื่อผู้ใช้ด้วยค่ะ**')

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send("**ไม่พบชื่อผู้ใช้ในเซิฟเวอร์**");

            if (kickMember.id === message.member.id) return message.channel.send("**เอ๊ะ! คุณไม่สามารถเตะตัวเองได้น่ะคะ**")

            if (!kickMember.kickable) return message.channel.send("**ไม่สามารถเตะผู้ใช้นี้ได้ค่ะ**")
            if (kickMember.user.bot) return message.channel.send("**ไม่สามารถเตะสมาชิกที่เป็นบอทได้ค่ะ**")

            var reason = args.slice(1).join(" ");
            try {
                const sembed2 = new MessageEmbed()
                    .setColor("#dcf104")
                    .setDescription(`**สวัสดีค่ะ, \nขอเเสดงความเสียใจด้วยน่ะคะคุณได้ถูกเตะออกจาก ${message.guild.name} เนื่องจาก ${reason || "ไม่ได้กำหนด"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send(sembed2).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** ถูกเตะเนื่องจาก ${reason}`)
            message.channel.send(sembed);
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** ถูกเตะเรียบร้อยเเล้วค่ะ`)
            message.channel.send(sembed2);
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**คำสั่ง**", "kick")
                .addField("**ผู้ใช้**", kickMember.user.username)
                .addField("**เตะโดย**", message.author.username)
                .addField("**เนื่องจาก**", `${reason || "**No Reason**"}`)
                .addField("**วันที่**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}