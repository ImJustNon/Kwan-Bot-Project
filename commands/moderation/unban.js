const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
    config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "[name | tag | mention | ID] <reason> (optional)",
        aliases: ["ub", "unbanish"],
    },
    run: async (bot, message, args) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [BAN_MEMBERS] เพื่อใช้คำสั่งนี้น่ะคะ**")

        if (!args[0]) return message.channel.send("**โปรดใส่ชื่อผู้ใช้ที่ต้องการจะปลดเเบนด้วยค่ะ**")
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send("**ไม่พบชื่อผู้ใช้นี้โปรดระบุชื่อหรือ ID ให้ถูกต้องด้วยค่ะ**")

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**เอ๊ะ! ดูเหมือนว่าสิทธิของขวัญจะหายไปน่ะคะ  [BAN_MEMBERS]**")
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${bannedMember.user.tag} ถูกปลดเเบนเนื่องจาก ${reason}**`)
                message.channel.send(sembed)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${bannedMember.user.tag} ถูกปลดเเบนเรียบร้อย**`)
                message.channel.send(sembed2)
            }
        } catch {
            
        }

        let channel = db.fetch(`modlog_${message.guild.id}`);
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .addField("**คำสั่ง**", "unban")
            .addField("**ปลดเเบน**", `${bannedMember.user.username}`)
            .addField("**ID**", `${bannedMember.user.id}`)
            .addField("**โดย**", message.author.username)
            .addField("**เนื่องจาก**", `${reason}` || "**ไม่ระบุ**")
            .addField("**วันที่**", message.createdAt.toLocaleString())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
}