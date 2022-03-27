const db = require('../../database/quickmongo.js');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');

module.exports = {
    config: {
        name: 'chatbot-delete',
        aliases: ['cb-delete','cb-remove','chatbot-remove'],
        description: 'remove chatbot channel',
    },
    run: async(bot, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");

            const checkdata = await db.get(`chatbot_${message.guild.id}_ch`);
            if(checkdata == null ) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณ **ยังไม่ได้** ทำการตั้งค่าห้องคุยกับขวัญเอาไว้น่ะคะ')

            const embed = new MessageEmbed()
            .setColor('#ff1c59')
            .setTitle(`หากต้องการจะลบการตั้งค่าสถานะเซิฟเวอร์ให้กด \`ยืนยัน\` \nหากต้องการยกเลิกให้กด \`ยกเลิก\``)
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
                    await deletedata(message);
                }
                if(b.id == 'no'){
                    await message.channel.send('ทำการยกเลิกรายการเรียบร้อยค่ะ');
                    await MESSAGE.delete();
                }
                await b.reply.defer();
            });

            async function deletedata(message) {
                await db.delete(`chatbot_${message.guild.id}_ch`);
                await db.delete(`chatbot_${message.guild.id}_lang`);
                
                await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าเรียบร้อยค่ะ')
                await MESSAGE.delete();
            }

        }
        catch(err){
            console.log(err);
        }
    }
}