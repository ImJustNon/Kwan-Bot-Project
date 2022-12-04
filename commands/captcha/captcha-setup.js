const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('../../database/quickmongo.js');
const { Captcha } = require('captcha-canvas');
const { MessageActionRow, MessageButton } = require('discord-buttons');

module.exports = {
    config: {
        name: 'captcha-setup',
        aliases: [],
        description: 'setup guild chaptcha',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        const checkActivate = await db.get(`captcha_${message.guild.id}_activate`);
        if(checkActivate !== null) return message.lineReplyNoMention('เอ๊ะ! ดูเหมือนว่าคุณจะได้ทำการตั้งค่าระบบยืนยันตัวตนเอาไว้เเล้วน่ะคะ');
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
                await db.set(`captcha_${message.guild.id}_activate`, 'true').then(async() =>{
                    await db.set(`captcha_${message.guild.id}_timeout`, 45);
                    await message.channel.send(':white_check_mark: ทำการตั้งค่าระบบยืนยันตัวตนเสร็จเรียบร้อยเเล้วค่ะ');
                    await MESSAGE.delete();
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