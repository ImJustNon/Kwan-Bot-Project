const db = require('quick.db');

module.exports = {
    config: {
        name: "disablemodlog",
        aliases: ['dmc', 'disablem', 'disablemodlog'],
        category: 'moderation',
        description: 'Disables Server Modlog Channel',
        usage: '[channel name | channel mention | channel ID]',
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้น่ะคะ**")

        try {
            let a = db.fetch(`modlog_${message.guild.id}`)

            if (!a) {
                return message.channel.send('**ยังไม่มีการตั้งค่าห้องบันทึกข้อมูลน่ะคะ**')
            } else {
                let channel = message.guild.channels.cache.get(a)
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**ปิดการใช้งานห้องต้อนรับเรียบร้อย**")
                db.delete(`modlog_${message.guild.id}`)

                message.channel.send(`**ห้องบันทึกข้อมูลได้ปิดการใช้งานเรียบร้อยในห้อง \`${channel.name}\`**`)
            }
            return;
        } catch {
            return message.channel.send("**ERROR - `สิทธิการจักการเซิฟเวอร์หายไปน่ะคะ`**")
        }
    }
}