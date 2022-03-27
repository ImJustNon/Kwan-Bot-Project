const db = require("quick.db")

module.exports = {
    config: {
        name: "setmodlog",
        category: "moderation",
        aliases: ['setm', 'sm', 'smc', 'setmodlog'],
        description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
        usage: "[channel mention | channel ID | channel name]",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้น่ะคะ**")
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**ช่องสำหรับส่งการบันทึกคือ \`${channelName.name}\`! น่ะค้าา**`
        );
      } else
        return message.channel.send(
          "**โปรดระบุห้องหรือเลข ID ห้องเพื่อทำการตั้งค่าด้วยน่ะคะ**"
        );
    }
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send("**โปรดระบุห้องหรือเลข ID ห้องเเชทเท่านั้นน่ะคะ**");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send("**ช่องเเชทนี้ได้ถูกตั้งค่าเอาไว้เรียบร้อยเเล้วค่ะ**")
            } else {
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**ตั้งค่าช่องเเชทสำหรับบันทึกเรียบร้อย**")
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`**ตั้งค่าช่อง \`${channel.name}\` เป็นช่องสำหรับบันทึกกิจกรรมเรียบร้อยเเล้วค่ะ**`)
            }
        } catch {
            return message.channel.send("**Error - สิทธิการจักการเซิฟเวอร์หายไปน่ะคะ**");
        }
    }
};