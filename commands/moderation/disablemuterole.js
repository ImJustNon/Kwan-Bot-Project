const db = require('quick.db');

module.exports = {
    config: {
        name: "disablemuterole",
        aliases: ['clearmuterole', 'dmr', 'disablemr', 'dmrole'],
        description: 'Disables Server Mute Role',
        usage: '[role name | role mention | role ID]',
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้น่ะคะ**")

        try {
            let a = db.fetch(`muterole_${message.guild.id}`)

            if (!a) {
                return message.channel.send("**ยังไม่มีการตั้งค่าปิดการใช้งาน Mute นะค่ะ**")
            } else {
                let role = message.guild.roles.cache.get(a)
                db.delete(`muterole_${message.guild.id}`)

                message.channel.send(`**\`${role.name}\` ได้ถูกปิดการใช้งานเรียบร้อย**`)
            }
            return;
        } catch {
            return message.channel.send("**Error - สิทธิการจักการเซิฟเวอร์หายไปน่ะคะ**")
        }
    }
}