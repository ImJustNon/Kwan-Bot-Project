const { Database } = require("quickmongo");
const db = require('../../database/quickmongo.js');

module.exports = {
    config: {
        name: 'voice-add2',
        aliases: ['v-add2','vc-add2'],
    },
    run: async(bot, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้น่ะคะ**")
            if (!args[0]) return message.channel.send('โปรดระบุช่องเสียงที่ต้องการจะทำเป็นช่องอัตโนมัติด้วยน่ะคะ');
            const channel = message.guild.channels.cache.get(args[0]) ||  message.guild.channels.cache.find(c=>c.type==="voice"&&c.name.toLowerCase()===args[0].toLowerCase());
            if (channel.type !== 'voice') return message.channel.send("เดี๋ยวน่ะ นี่มันไม่ใช้ห้องเสียงน่ะ!");
            const data  = await db.get(`voice_${message.guild.id}_2`)
            if (data !== null ) return message.channel.send('คุณได้ตั้งค่าช่องเสียงเอาไว้เเล้วน่ะคะ');

            await db.set(`voice_${message.guild.id}_2`, channel.id);
            await message.channel.send(`ได้ตั้งค่าช่อง \` ${channel.name} \` เป็นช่องอัตโนมัติเรียบร้อยค่ะ`);
        }
        catch(err){
            console.log(err);
        }
    }
}