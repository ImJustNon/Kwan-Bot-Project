const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
    config: {
        name: "unmute",
        aliases: ["um"],
        description: "Unmutes a member in the discord!",
        usage: "[name | nickname | mention | ID] <reason> (optional)"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [MANAGE_GUILD] เพื่อใช้คำสั่งนี้น่ะคะ**");

        if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("**ขวัญไม่มีสิทธิพอน่ะคะ ต้องการยศ [MANAGE_GUILD] ค่ะ**")
        if (!args[0]) return message.channel.send("**โปรดระบุชื่อผู้ใช้ด้วยน่ะคะ**")
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee) return message.channel.send("**โปรดระบุชื่อผู้ใช้ให้ถูกต้องน่ะคะ**");

        let reason = args.slice(1).join(" ");

        let muterole;
        let dbmute = await db.fetch(`muterole_${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }
      
        let rolefetched = db.fetch(`muteeid_${message.guild.id}_${mutee.id}`)
        if (!rolefetched) return;

        if (!muterole) return message.channel.send("**ไม่มียศ Mute ที่ถูกนำออกค่ะ**")
        if (!mutee.roles.cache.has(muterole.id)) return message.channel.send("**ผู้ใช้นี้ไม่ได้ถูก Muteน่ะคะ**")
        try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send(`**สวัสดีค่ะ, ตอนนี้คุณได้ถูกปลด Mute ในเซิฟเวอร์ ${message.guild.name} เเล้วเนื่องจาก ${reason || "ไม่ระบุ"}**`).catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
        })
        } catch {
            let roleadds2 = rolefetched
            if (!roleadds2) return;
            mutee.roles.add(roleadds2)                            
          }
            const sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${mutee.user.username} ปลด Mute เรียบร้อย`)
            message.channel.send(sembed);
        

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("RED")
            .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .addField("**คำสั่ง**", "unmute")
            .addField("**ผู้ใช้**", mutee.user.username)
            .addField("**โดย**", message.author.username)
            .addField("**เนื่องจาก**", `${reason || "**ไม่ระบุ**"}`)
            .addField("**วันที่**", message.createdAt.toLocaleString())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)

    }
}