const db = require('../../database/quickmongo.js');
const { MessageEmbed } = require('discord.js');
const setting = require('../../data/setting.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');


module.exports = {
    config: {
        name: 'music-disable',
        aliases: ['music-remove','music-delete'],
        description: 'disable music system',
    },
    run: async(client, message, args, prefix) =>{
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        let ckeckChannel = await db.get(`music_${message.guild.id}_channel`);
        if(ckeckChannel === null) return message.lineReplyNoMention('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่มีการตั้งค่าระบบห้องเพลงเลยน่ะคะ');


        const embed = new MessageEmbed()
            .setColor('#ff1c59')
            .setTitle(`หากต้องการจะลบระบบห้องเพลงให้กด \`ยืนยัน\` \nหากต้องการยกเลิกให้กด \`ยกเลิก\``)
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
        collector.on('collect', async (b) => {
            if(b.id == 'yes'){
                disableMusic()
                await MESSAGE.delete();
            }
            if(b.id == 'no'){
                await message.channel.send('ทำการยกเลิกรายการเรียบร้อยค่ะ');
                await MESSAGE.delete();
            }
            await b.reply.defer();
        });

        async function disableMusic(){
            try{
                await db.delete(`music_${message.guild.id}_channel`);
                await db.delete(`music_${message.guild.id}_support_message`);
                await db.delete(`music_${message.guild.id}_track_message`);
                await db.delete(`music_${message.guild.id}_queue_message`);
                await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าห้องระบบเพลงเรียบร้อยเเล้วค่ะ')
            }
            catch(err){
                console.log(err);
            }
        }
    }
}