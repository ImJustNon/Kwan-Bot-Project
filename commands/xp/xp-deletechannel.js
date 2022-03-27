const db = require('../../database/quickmongo.js');

module.exports = {
    config: {
        name: 'xp-deletechannel',
        aliases: ['xp-deletech','xp-removechannel','xp-removech',],
        description: 'setup chatbot channel',
    },
    run: async(bot, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
            const XPactivate = await db.get(`xp_${message.guild.id}_activate`);
            if(XPactivate == null ) return message.channel.send(`เซิฟเวอร์นี้ยังไม่ได้มีการตั้งค่าระบบเลเวลเลยน่ะคะ`);
            const checkdata = await db.get(`chatbot_${message.guild.id}_ch`);
            if(checkdata == null ) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้ทำการตั้งค่าช่องเเจ้งเตือนเลเวลเลยน่ะคะ')

            await db.delete(`chatbot_${message.guild.id}_ch`);
            await message.channel.send(':white_check_mark: ทำการลบตั้งค่าช่องเเจ้งเตือนเลเวลเรียบร้อยค่ะ ');
        }
        catch(err){
            console.log(err);
        }
    }
}