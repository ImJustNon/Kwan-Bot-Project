const db = require('../../database/quickmongo.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'autorole-add',
        aliases: [],
        description: 'configuration guild chaptcha',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");

        const getRoleCount = await db.get(`autorole_${message.guild.id}_count`);
        let count;
        if(getRoleCount == null) count = 0;
        else count = parseInt(getRoleCount);

        let roleCount = parseInt(count) + 1;

        if(!args[0]) return message.lineReplyNoMention('โปรดระบุยศที่ต้องการด้วยน่ะคะ');

        const getrole = message.guild.roles.cache.find(r => r.id === args[0]) || message.mentions.roles.first();
        if(!getrole) return message.lineReplyNoMention('โปรดระบุยศที่ต้องการให้ถูกต้องด้วยน่ะคะ');

        await db.set(`autorole_${message.guild.id}_${roleCount.toString()}`, getrole.id).then(async() =>{
            await db.set(`autorole_${message.guild.id}_count`, roleCount.toString());
            await message.channel.send(`:white_check_mark: ทำการเพิ่มยศ <@&${getrole.id}> เป็นยศอัตโนมัติลำดับที่ \`${roleCount}\` เรียบร้อยค่ะ`);
        });
    }
}