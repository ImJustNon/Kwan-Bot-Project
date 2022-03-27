const { MessageActionRow, MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const db = require('../../database/quickmongo.js');

module.exports = {
    config: {
        name: 'xp-delete',
        aliases: ['xp-remove'],
        description: 'remove xp system',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        const checkdata = await db.get(`xp_${message.guild.id}_activate`);
        if( checkdata == null ) return  message.channel.send(`เอ๊ะ! คุณยังไม่ได้มีการตั้งค่าระบบเลเวลในเซิฟเวอร์คุณเลยน่ะค่ะ`);

        const embed = new MessageEmbed()
            .setColor('#46eb34')
            .setTitle(`หากต้องการลบระบบเลเวลให้กด \`ยืนยัน\` \nหากต้องการยกเลิกให้กด \`ยกเลิก\``)
            .setFooter('K w a n')
            .setTimestamp()

        let yes = new MessageButton()
            .setLabel(`ยืนยัน`)
            .setID(`yes`)
            .setStyle(`SUCCESS`)
            .setEmoji(`✅`)
        let no = new MessageButton()
            .setLabel(`ยกเลิก`)
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
                await removexp(message);     
            }
            if(b.id == 'no'){
                await message.channel.send('ทำการยกเลิกรายการเรียบร้อยค่ะ');
                await MESSAGE.delete();
            }
            await b.reply.defer()
        });

        async function removexp(message) {
            const checkCh = await db.get(`xp_${message.guild.id}_ch`);
            if(checkCh !== null){
                await db.delete(`xp_${message.guild.id}_activate`);
                await db.delete(`xp_${message.guild.id}_ch`);     
            }
            else {
                await db.delete(`xp_${message.guild.id}_activate`);
            }
            await message.channel.send(':white_check_mark: ทำการลบตั้งค่าระบบเลเวลเรียบร้อยค่ะ')
            await MESSAGE.delete();
        }
    }
}