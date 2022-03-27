const { MessageEmbed } = require('discord.js');
const db = require('../../database/quickmongo.js');

module.exports = {
    config: {
        name: 'xp-setchannel',
        aliases: ['xp-setch','xp-addchannel','xp-addch'],
        description: 'show user level',
    },
    run: async(bot, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");

            const XPactivate = await db.get(`xp_${message.guild.id}_activate`);
            if(XPactivate == null ) return message.channel.send(`เซิฟเวอร์นี้ยังไม่ได้มีการตั้งค่าระบบเลเวลเลยน่ะคะ`);
            const checkdata = await db.get(`xp_${message.guild.id}_ch`);
            if(checkdata !== null ) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะได้ทำการตั้งค่าช่องเเจ้งเตือนเลเวลเอาไว้เเล้วน่ะคะ');
        
            const setchannel = args.join(" ");

            if(!setchannel) return message.channel.send('โปรดระบุช่องที่ต้องการจะตั้งค่าเป็นช่องสำหรับเเจ้งเตือนเลเวลด้วยน่ะคะ ');
            let checkchannel = message.guild.channels.cache.get(setchannel) || message.mentions.channels.first();
            if(!checkchannel) return message.channel.send('โปรดระบุช่องถูกต้องด้วยน่ะคะ');
            if(checkchannel.type !== 'text') return message.channel.send('โปรดระบุช่องข้อความเท่านั้นน่ะคะ');

            await db.set(`xp_${message.guild.id}_ch`,checkchannel.id);
            await message.channel.send(`ได้ทำการตั้งค่าช่อง \`${checkchannel.name}\` สำหรับเเจ้งเตือนเลเวลเเล้วค่ะ`);
        }
        catch(err) {
            console.log(err);
        }
    }
}