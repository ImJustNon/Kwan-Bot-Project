const { MessageEmbed, MessageFlags } = require('discord.js');
const db = require('../../database/quickmongo.js');
const { PREFIX } = require('../../config.js');
const quickdb = require('quick.db');

module.exports = {
    config: {
        name: 'command-channel',
        aliases: ['cmd-channel','cmd-ch','command-ch'],
        description: 'set specified commands channel',
    },
    run: async(bot, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
            let prefix;
            let fetched = await quickdb.fetch(`prefix_${message.guild.id}`);
            if (fetched === null) {
                prefix = PREFIX;
            } else {
                prefix = fetched;
            }
            let CMDch_data_id = await db.get(`cmdch_${message.guild.id}`);
            let NSFWch_data_id = await db.get(`cmdch_${message.guild.id}_nsfw`);
            let CMDch_channelname_data;
            let NSFWch_channelname_data;
            if(CMDch_data_id !== null){
                let CH_Data = await message.guild.channels.cache.get(CMDch_data_id);
                CMDch_channelname_data = CH_Data.name;
            }
            else{
                CMDch_channelname_data = null;
            }
            if(NSFWch_data_id !== null){
                let CH_Data = await message.guild.channels.cache.get(NSFWch_data_id);
                NSFWch_channelname_data = CH_Data.name;
            }
            else{
                NSFWch_channelname_data = null;
            }

            const embed = new MessageEmbed()
                .setColor('#fffb19') //yellow
                .addField(`:gear: คำสั่งตั้งค่าห้องใช้คำสั่ง ทั่วไป : ${CMDch_channelname_data || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}cmd-channel -set -common  < ช่องที่ต้องการ > \``, false)
                .addField(`:gear: คำสั่งตั้งค่าห้องใช้คำสั่ง NSFW : ${NSFWch_channelname_data || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}cmd-channel -set -nsfw  < ช่องที่ต้องการ > \``, false)
                .addField(`:recycle: คำสั่งลบตั้งค่าห้องใช้คำสั่ง :`,`\` ${prefix}cmd-channel -remove \``, false)
                .setFooter('K w a n')
                .setTimestamp()
            const remove_embed = new MessageEmbed()
                .setColor('#fffb19')
                .addField(`:recycle: ลบเฉพาะช่องคำสั่ง ทั่วไป`,`\` ${prefix}cmd-channel -remove -common confirm \``,false)
                .addField(`:recycle: ลบเฉพาะช่องคำสั่ง NSFW`,`\` ${prefix}cmd-channel -remove -nsfw confirm \``,false)
                .addField(`:recycle: ลบการตั้งค่าช่องคำสั่ง ทั้งหมด`,`\` ${prefix}cmd-channel -remove -all confirm \``,false)
                .setFooter('K w a n')
                .setTimestamp()

            if(!args[0]) return message.channel.send(embed);

            if(args[0].toLowerCase() === '-set'){
                if(!args[1]) return message.channel.send(`โปรดเลือกการตั้งค่าระหว่าง \`common\` เเละ \`nsfw\` ค้วยน่ะคะ`);
                if(args[1].toLowerCase() == '-common'){
                    let cmdCH = await db.get(`cmdch_${message.guild.id}`);
                    if(cmdCH !== null) return message.channel.send(`เอ๊ะ! ดูเหมือนว่าคุณจะได้ทำการตั้งค่าไปเเล้วน่ะคะ หากต้องการจะตั้งค่าใหม่ทำการลบการตั้งก่อนน่ะคะ`);
                    if(!args[2]) return message.channel.send(`โปรดระบุช่องที่ต้องการจะตั้งค่าด้วยน่ะคะ`);
                    let channel = await message.guild.channels.cache.get(args[2]) || message.mentions.channels.first();
                    if(!channel) return message.channel.send(`โปรดระบุช่องที่ต้องการจะตั้งค่าให้ถูกต้องด้วยน่ะคะ`);
                    if(channel.type !== 'text') return message.channel.send(`โปรดระบุเเค่ช่องข้อความเท่านั้นนะคะ`);
                    await db.set(`cmdch_${message.guild.id}`, channel.id).then(()=>{
                        message.channel.send(`:white_check_mark: ได้ทำการตั้งค่าช่อง **\`${channel.name}\`** เป็นช่องใช้คำสั่งเรียบร้อยค่ะ`);
                    });
                }
                else if(args[1].toLowerCase() == '-nsfw'){
                    let nsfwCH = await db.get(`cmdch_${message.guild.id}_nsfw`);
                    if(nsfwCH !== null) return message.channel.send(`เอ๊ะ! ดูเหมือนว่าคุณจะได้ทำการตั้งค่าไปเเล้วน่ะคะ หากต้องการจะตั้งค่าใหม่ทำการลบการตั้งก่อนน่ะคะ`);
                    if(!args[2]) return message.channel.send(`โปรดระบุช่องที่ต้องการจะตั้งค่าด้วยน่ะคะ`);
                    let channel = await message.guild.channels.cache.get(args[2]) || message.mentions.channels.first();
                    if(!channel) return message.channel.send(`โปรดระบุช่องที่ต้องการจะตั้งค่าให้ถูกต้องด้วยน่ะคะ`);
                    if(channel.type !== 'text') return message.channel.send(`โปรดระบุเเค่ช่องข้อความเท่านั้นนะคะ`);
                    if(!channel.nsfw) return message.channel.send(`คูณสามารถตั้งค่าได้เฉพาะช่องเเชทประเภท NSFW เท่านั้นน่ะคะ`);
                    await db.set(`cmdch_${message.guild.id}_nsfw`, channel.id).then(()=>{
                        message.channel.send(`:white_check_mark: ได้ทำการตั้งค่าช่อง **\`${channel.name}\`** เป็นช่องใช้คำสั่ง NSFW เรียบร้อยค่ะ`);
                    });
                }
                else{
                    return message.channel.send(`คุณสามารถเลือกการตั้งค่าได้เฉพาะ \`common\` เเละ \`nsfw\` เท่านั้นน่ะคะ`);
                }
            }
            else if(args[0].toLowerCase() === '-delete' || args[0].toLowerCase() === '-remove'){
                if(!args[1]) return message.channel.send(remove_embed);
                if(args[1].toLowerCase() == '-common'){
                    let cmdCH = await db.get(`cmdch_${message.guild.id}`);
                    if(cmdCH == null) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้มีการตั้งค่าช่องคำสั่งเลยน่ะคะ');
                    if(!args[2]) return message.channel.send(`โปรดพิมพ์ **\`confirm\`** ตามท้ายเพื่อทำการยืนยันค่ะ`);
                    if(args[2].toLowerCase() !== 'confirm') return message.channel.send(`โปรดพิมพ์ **\`confirm\`** ตามท้ายเพื่อทำการยืนยันค่ะ`);
                    await db.delete(`cmdch_${message.guild.id}`).then(()=>{
                        message.channel.send(':white_check_mark: ได้ทำการลบการตั้งค่าช่องใช้คำสั่ง ทั่วไป เรียบร้อยค่ะ');
                    });
                }
                else if(args[1].toLowerCase() == '-nsfw'){
                    let nsfwCH = await db.get(`cmdch_${message.guild.id}_nsfw`);
                    if(nsfwCH == null) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้มีการตั้งค่าช่องคำสั่งเลยน่ะคะ');
                    if(!args[2]) return message.channel.send(`โปรดพิมพ์ **\`confirm\`** ตามท้ายเพื่อทำการยืนยันค่ะ`);
                    if(args[2].toLowerCase() !== 'confirm') return message.channel.send(`โปรดพิมพ์ **\`confirm\`** ตามท้ายเพื่อทำการยืนยันค่ะ`);
                    await db.delete(`cmdch_${message.guild.id}_nsfw`).then(()=>{
                        message.channel.send(':white_check_mark: ได้ทำการลบการตั้งค่าช่องใช้คำสั่ง NSFW เรียบร้อยค่ะ');
                    });
                }
                else if(args[1].toLowerCase() == '-all'){
                    if(!args[2]) return message.channel.send(`โปรดพิมพ์ **\`confirm\`** ตามท้ายเพื่อทำการยืนยันค่ะ`);
                    if(args[2].toLowerCase() !== 'confirm') return message.channel.send(`โปรดพิมพ์ **\`confirm\`** ตามท้ายเพื่อทำการยืนยันค่ะ`);
                    let cmdCH = await db.get(`cmdch_${message.guild.id}`);
                    let nsfwCH = await db.get(`cmdch_${message.guild.id}_nsfw`);
                    if(cmdCH !== null){
                        await db.delete(`cmdch_${message.guild.id}`);
                        await message.channel.send(':white_check_mark: ได้ทำการลบการตั้งค่าช่องใช้คำสั่ง ทั่วไป เรียบร้อยค่ะ');
                    }
                    if(nsfwCH !== null){
                        await db.delete(`cmdch_${message.guild.id}_nsfw`);
                        await message.channel.send(':white_check_mark: ได้ทำการลบการตั้งค่าช่องใช้คำสั่ง NSFW เรียบร้อยค่ะ');
                    }
                    if(cmdCH == null && nsfwCH == null){
                        return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้ทำการตั้งค่าช่องใช้คำสั่งอะไรเลยน่ะคะ');
                    }
                }
            }
            else{
                return;
            }
        }
        catch(err){
            console.log(err);
        }
    }
}