const setting = require('../../data/setting.js');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');

module.exports = {
    config: {
        name: 'shutdown',
        aliases: [],
        description: 'Shutdown Client and Process',
    },
    run: async(client, message, args) => {
        if(message.author.id !== setting.mainbot.OwnerID) return message.channel.send('คำสั่ง `shutdown` อนุญาติให้ใช้ได้เฉพาะ Dev.เท่านั้นค่ะ')
        
        const embed = new MessageEmbed()
            .setColor('#ff1c59')
            .setTitle(`หากต้องการจะทำการปิดระบบให้กด \`ยืนยัน\` \nหากต้องการยกเลิกให้กด \`ยกเลิก\``)
            .setFooter('K w a n')
            .setTimestamp()

            let yes = new MessageButton()
                .setLabel(`ยืนยัน [Accept]`)
                .setID(`yes`)
                .setStyle(`red`)
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
            collector.on('collect', async (b) =>{
                if(b.id == 'yes'){
                    await b.reply.defer();
                    await shutdown(client, MESSAGE);
                }
                if(b.id == 'no'){
                    await message.channel.send('ทำการยกเลิกรายการเรียบร้อยค่ะ');
                    await MESSAGE.delete();
                }
                await b.reply.defer();
            });
        
    }
}


let shutdown = async(client, MESSAGE) => {
    function wait(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    const CHANNEL = client.channels.cache.get(setting.mainbot.offline_log_channel);
    if(CHANNEL){
        const embedLog = new MessageEmbed()
            .setColor('#000000')
            .setDescription(`:signal_strength: | ${client.user.tag} Is Now Offline`)
            .setFooter('k w a n')
            .setTimestamp()
        
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('จะทำการปิดระบบในอีก 5 วินาที').setFooter('K w a n').setTimestamp());
        wait(1000);
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('จะทำการปิดระบบในอีก 4 วินาที').setFooter('K w a n').setTimestamp());
        wait(1000);
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('จะทำการปิดระบบในอีก 3 วินาที').setFooter('K w a n').setTimestamp());
        wait(1000);
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('จะทำการปิดระบบในอีก 2 วินาที').setFooter('K w a n').setTimestamp());
        wait(1000);
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('จะทำการปิดระบบในอีก 1 วินาที').setFooter('K w a n').setTimestamp());
        wait(1000);
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('ทำการปิดระบบเรียบร้อยค่ะ').setFooter('K w a n').setTimestamp());
        wait(500);
        await MESSAGE.delete()
        await CHANNEL.send(embedLog);
        wait(1000);
        process.exit(1);
    }   
    else{
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('จะทำการปิดระบบในอีก 5 วินาที').setFooter('K w a n').setTimestamp());
        wait(1000);
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('จะทำการปิดระบบในอีก 4 วินาที').setFooter('K w a n').setTimestamp());
        wait(1000);
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('จะทำการปิดระบบในอีก 3 วินาที').setFooter('K w a n').setTimestamp());
        wait(1000);
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('จะทำการปิดระบบในอีก 2 วินาที').setFooter('K w a n').setTimestamp());
        wait(1000);
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('จะทำการปิดระบบในอีก 1 วินาที').setFooter('K w a n').setTimestamp());
        wait(1000);
        await MESSAGE.edit(new MessageEmbed().setColor('#fcb90f').setDescription('ทำการปิดระบบเรียบร้อยค่ะ').setFooter('K w a n').setTimestamp());
        wait(500);
        await MESSAGE.delete()
        await CHANNEL.send(embedLog);
        wait(1000);
        process.exit(1);
    }
}