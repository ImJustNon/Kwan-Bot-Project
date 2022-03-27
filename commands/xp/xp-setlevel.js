const db = require('../../database/quickmongo.js'); 
const Levels = require('discord-xp');

module.exports = {
    config: {
        name: 'xp-setlevel',
        aliases: [],
        description: 'setting user xp',
    },
    run: async(bot, message, args) =>{
        try{

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");

        const checkdata = await db.get(`xp_${message.guild.id}_activate`);
        if(checkdata == null ) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้ทำการตั้งค่าระบบเลเวลเลยน่ะคะ');

        if(!args[0]) return message.channel.send('โปรดระบุชื่อผู้ใช้เเละจำนวน Level ที่ต้องการจะเพิ่มด้วยน่ะคะ');
        if(!args[1]) return message.channel.send('โปรดระบุ Level ที่ต้องการจะเพิ่มด้วยน่ะคะ');
        if(isNaN(args[1])) return message.channel.send('โปรดระบุ Level เป็นตัวเลขเท่านั้นน่ะคะ');

        const user = message.mentions.users.first();

        await Levels.setLevel(user.id, message.guild.id, parseInt(args[1]));
        await message.channel.send(`:white_check_mark: ได้ตั้งค่า Level ของ **\`${user.username}\`** เป็น **\`${args[1]}\`** เรียบร้อยเเล้วค่ะ`);
        }
        catch(err){
            message.channel.send('โปรดระบุชื่อผู้ใช้ให้ถูกต้องด้วยน่ะคะ');
        }
    }
}