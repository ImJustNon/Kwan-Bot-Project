const db = require('../../database/quickmongo.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: 'ss-delete',
        aliases: ['ss-remove'],
        description: 'remove stats data from database',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
       
        if(!args[0]){
            const data = await db.get(`stats_${message.guild.id}`);
            if( data == null ) return  message.channel.send(`เอ๊ะ! คุณยังไม่ได้มีการตั้งค่าการเเสดงสถานะเซิฟเวอร์ในเซิฟเวอร์ของคุณเลยน่ะค่ะ`);
            const embed = new MessageEmbed()
                .setColor('#ff1c59')
                .setTitle(`หากต้องการจะลบการตั้งค่าสถานะเซิฟเวอร์ให้กด \`ยืนยัน\` \nหากต้องการยกเลิกให้กด \`ยกเลิก\``)
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
                    await deletechannel(message);
                    await MESSAGE.delete();
                }
                if(b.id == 'no'){
                    await message.channel.send('ทำการยกเลิกรายการเรียบร้อยค่ะ');
                    await MESSAGE.delete();
                }
                await b.reply.defer()
            });

            async function deletechannel(message) {
                const categoryid = await db.get(`stats_${message.guild.id}_category`)
                const allmemberid = await db.get(`stats_${message.guild.id}_allmember`);
                const memberid = await db.get(`stats_${message.guild.id}_member`);
                const botid = await db.get(`stats_${message.guild.id}_bot`);
                const category = message.guild.channels.cache.get(categoryid);
                const allmember = message.guild.channels.cache.get(allmemberid);
                const member = message.guild.channels.cache.get(memberid);
                const bot = message.guild.channels.cache.get(botid);
                if(allmember && member && bot && category) {
                    await allmember.delete();
                    await member.delete();
                    await bot.delete();
                    await category.delete();

                    await db.delete(`stats_${message.guild.id}_allmember`);
                    await db.delete(`stats_${message.guild.id}_member`);
                    await db.delete(`stats_${message.guild.id}_bot`);
                    await db.delete(`stats_${message.guild.id}_category`);
                    await db.delete(`stats_${message.guild.id}`);
                    
                    await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าการเเสดงสถานะเซิฟเวอร์เรียบร้อยค่ะ');
                }
                else{
                    await db.delete(`stats_${message.guild.id}_allmember`);
                    await db.delete(`stats_${message.guild.id}_member`);
                    await db.delete(`stats_${message.guild.id}_bot`);
                    await db.delete(`stats_${message.guild.id}_category`);
                    await db.delete(`stats_${message.guild.id}`);
                    
                    await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าออกจากฐานข้อมูลเรียบร้อยค่ะ'); 
                }    
            }  
        }
        if(args[0].toLowerCase() == '-status'){
            const checkStatusStatsActivation = await db.get(`stats_${message.guild.id}_add_status_activate`);
            if(checkStatusStatsActivation == null) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้มีการตั้งค่าส่วนเสริมเเสดงสถานะสมาชิกเลยน่ะคะ');
            if(!args[1]) return message.channel.send(`โปรดพิมพ์ \`confirm\` ตามหลังเพื่อยืนยันค่ะ`);
            if(args[1].toLowerCase() == 'confirm'){
                const statusCH1_id = await db.get(`stats_${message.guild.id}_add_status_1`);
                const statusCH2_id = await db.get(`stats_${message.guild.id}_add_status_2`);
                const checkStatusCH1 = message.guild.channels.cache.get(statusCH1_id);
                const checkStatusCH2 = message.guild.channels.cache.get(statusCH2_id);
                if(checkStatusCH1 && checkStatusCH2){
                    await checkStatusCH1.delete();
                    await checkStatusCH2.delete();
                    await db.delete(`stats_${message.guild.id}_add_status_1`);
                    await db.delete(`stats_${message.guild.id}_add_status_2`);
                    await db.delete(`stats_${message.guild.id}_add_status_activate`);
                    await message.channel.send(`:white_check_mark: ทำการลบตั้งค่าเสร็จเรียบร้อยค่ะ`);
                    return;
                }
                await db.delete(`stats_${message.guild.id}_add_status_1`);
                await db.delete(`stats_${message.guild.id}_add_status_2`);
                await db.delete(`stats_${message.guild.id}_add_status_activate`);
                await message.channel.send(`:white_check_mark: ทำการลบการตั้งค่าออกจากฐานข้อมูลเรียบร้อยค่ะ`);
                return;
            }
            else{
                return message.channel.send(`โปรดพิมพ์ \`confirm\` ตามหลังเพื่อยืนยันค่ะ`);
            }
        }
        else{
            return message.channel.send(`โปรดระบุสิ่งที่ต้องการจะลบให้ถูกต้องด้วยน่ะคะ`);
        }
    }
}