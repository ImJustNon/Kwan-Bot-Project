const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    config: {
        name: "mute",
        description: "Mutes a member in the discord!",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**คุณไม่มีสิทธิพอที่จะ Mute ผู้ใช้น่ะคะ - [MANAGE_GUILD]**");

            if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("**ดูเหมือนว่าสิิทธิของขวัญจะหายไปน่ะ - [MANAGE_GUILD]**")
            if (!args[0]) return message.channel.send("**โปรดใส่ชื่อผู้ใช้ที่ต้องการ Mute ด้วยค่ะ**");

            var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!mutee) return message.channel.send("**ไม่พบชื่อผู้ใช้นี้น่ะคะ**");

            if (mutee === message.member) return message.channel.send("**คุณไม่สามารถ Mute ตัวเองได้น่ะคะ**")
            if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**ไม่สามารถ Mute ผู้ใช้นี้ได้น่ะคะ**')

            let reason = args.slice(1).join(" ");
            if (mutee.user.bot) return message.channel.send("**ไม่สามารถ Mute บอทได้ค่ะ**");
            const userRoles = mutee.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r.id)

            let muterole;
            let dbmute = await db.fetch(`muterole_${message.guild.id}`);
            let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

            if (!message.guild.roles.cache.has(dbmute)) {
                muterole = muteerole
            } else {
                muterole = message.guild.roles.cache.get(dbmute)
            }

            if (!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                            name: "muted",
                            color: "#dcf104",
                            permissions: []
                        }
                    })
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
            };

            if (mutee.roles.cache.has(muterole.id)) return message.channel.send("**ผู้ใช้นี้ได้ถูก Mute ไว้เเล้ว**")

            db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
          try {
            mutee.roles.set([muterole.id]).then(() => {
                mutee.send(`**สวัสดีค่ะ, \nขอเเสดงความเสียใจด้วยน่ะคะคุณได้ถูก Mute จาก ${message.guild.name} เนื่องจาก ${reason || "ไม่ได้กำหนด"}`).catch(() => null)
            })
            } catch {
                 mutee.roles.set([muterole.id])                               
            }
                if (reason) {
                const sembed = new MessageEmbed()
                    .setColor("#dcf104")
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`${mutee.user.username} ถูก Mute เนื่องจาก ${reason}`)
                message.channel.send(sembed);
                } else {
                    const sembed2 = new MessageEmbed()
                    .setColor("#dcf104")
                    .setDescription(`${mutee.user.username} ถูก Mute เรียบร้อย`)
                    message.channel.send(sembed2);
                }
            
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            let embed = new MessageEmbed()
                .setColor('#dcf104')
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                .addField("**คำสั่ง**", "mute")
                .addField("**ผู้ใช้**", mutee.user.username)
                .addField("**Mute โดย**", message.author.username)
                .addField("**เนื่องจาก**", `${reason || "**No Reason**"}`)
                .addField("**วันที่**", message.createdAt.toLocaleString())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch {
            return;
        }
    }
}