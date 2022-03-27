const { MessageActionRow, MessageButton } = require('discord-buttons');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('../../database/quickmongo.js');

module.exports = {
    config: {
        name: 'captcha-disable',
        aliases: ['captcha-remove', 'captcha-delete' , 'captcha-off'],
        description: 'disable guild chaptcha',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        const checkActivate = await db.get(`captcha_${message.guild.id}_activate`);
        if(checkActivate == null) return message.lineReplyNoMention('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้ทำการตั้งค่าเลยน่ะคะ');

        const embed = new MessageEmbed()
            .setColor('#ff1c59')
            .setTitle(`หากต้องการจะตั้งค่าระบบยืนยันตัวตนให้กด \`ยืนยัน\` \nหากต้องการยกเลิกให้กด \`ยกเลิก\``)
            .setFooter('K w a n')
            .setTimestamp()

        let yes = new MessageButton()
            .setLabel(`ยืนยัน [Accept]`)
            .setID(`yes`)
            .setStyle(`SUCCESS`)
            .setEmoji(`✅`)
        let no = new MessageButton()
            .setLabel(`ยกเลิก [Cancel]`)
            .setID(`no`)
            .setStyle(`PRIMARY`)
            .setEmoji(`❌`)
        let row = new MessageActionRow()
            .addComponents(yes,no)
        const MESSAGE = await message.channel.send(embed,row)
        const filter = ( button ) => button.clicker.id === message.author.id
        const collector = MESSAGE.createButtonCollector(filter, { time : 30000 });
        collector.on('collect', async (b)  => {
            if(b.id == 'yes'){
                const checkRoleID = await db.get(`captcha_${message.guild.id}_roleid`);
                const checkRoleRemoveID = await db.get(`captcha_${message.guild.id}_roleremoveid`);
                const checkGuildLogCH = await db.get(`captcha_${message.guild.id}_guildlogch`);
                if(checkRoleID !== null){
                    await db.delete(`captcha_${message.guild.id}_roleid`).then(() =>{
                        message.channel.send(':white_check_mark: ทำการลบการตั้งค่าเพิ่มยศอัตโนมัติเรียบร้อยค่ะ');
                    });
                }
                if(checkRoleRemoveID !== null){
                    await db.delete(`captcha_${message.guild.id}_roleremoveid`).then(() =>{
                        message.channel.send(':white_check_mark: ทำการลบการตั้งค่านำยศออกอัตโนมัติเรียบร้อยค่ะ');
                    });
                }
                if(checkGuildLogCH !== null){
                    await db.delete(`captcha_${message.guild.id}_guildlogch`).then(() =>{
                        message.channel.send(':white_check_mark: ทำการลบการตั้งค่าช่องเเจ้งเตือนเรียบร้อยค่ะ');
                    });
                }
                await db.set(`captcha_${message.guild.id}_activate`).then(() =>{
                    message.channel.send(':white_check_mark: ทำการตั้งค่าระบบยืนยันตัวตนเสร็จเรียบร้อยเเล้วค่ะ');
                });
            }
            if(b.id == 'no'){
                await message.channel.send('ทำการยกเลิกรายการเรียบร้อยค่ะ');
                await MESSAGE.delete();
            }
            await b.reply.defer();
        });
    }
}