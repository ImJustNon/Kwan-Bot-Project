const db = require('../../database/quickmongo.js');
const database = require('quick.db');
const { PREFIX } = require('../../config.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'ss-add',
        aliases: [],
        description: 'add more option , and create channel , and category',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        let prefix;
        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await database.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX 
            } 
            else {
                prefix = fetched
            }
        } 
        catch (e) {
            console.log(e)
        };
        
        const activate = await db.get(`stats_${message.guild.id}`);
        const memberstatus = await db.get(`stats_${message.guild.id}_add_status_1`);
        const statspage = new MessageEmbed()
        .setAuthor(`หน้าต่างการตั้งค่าเพิ่มเติมของ ${message.guild.name}`, message.guild.iconURL())
        .setColor('#fcba03')    
        .addField(`:green_circle: สถานะสมาชิก : ${memberstatus || ' \❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}ss-add -status  < voice/text > \``, false)

        .setFooter('K w a n')
        .setTimestamp()
        
        if(activate == null) return message.channel.send('โปรดทำการตั้งค่าระบบหลักก่อนตั้งค่ารระบบเสริมน่ะคะ')
        if(!args[0]) return message.channel.send(statspage);
        if(args[0].toLowerCase() == '-status'){
            if(memberstatus !== null) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะได้ทำการตั้งค่าเอาไว้เเล้วน่ะคะ');
            if(!args[1]) return message.channel.send('โปรดระบุประเภทช่องที่ต้องการด้วยน่ะคะ');
            if(args[1].toLowerCase() == 'voice'){
                await message.guild.channels.create(`🟢 | ${message.guild.members.cache.filter(m => m.presence?.status == 'online').size} ➖ ⛔ | ${message.guild.members.cache.filter(m => m.presence?.status == 'dnd').size}`,{
                    type: `voice`,
                })
                .then(async (channel) => {
                    await db.set(`stats_${message.guild.id}_add_status_1`,channel.id);
                    await channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, CONNECT: false });
                });
                await message.guild.channels.create(`🌙 | ${message.guild.members.cache.filter(m => m.presence?.status == 'idle').size} ➖ ⚫ | ${message.guild.members.cache.filter(m => m.presence?.status == 'offline' || !m.presence).size}`,{
                    type: `voice`,
                })
                .then(async (channel) => {
                    await db.set(`stats_${message.guild.id}_add_status_2`,channel.id);
                    await channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, CONNECT: false });
                });
                await db.set(`stats_${message.guild.id}_add_status_activate`,'true').then(async()=>{
                    await message.channel.send(`:white_check_mark: ทำการตั้งค่าเสร็จเรียบร้อยค่ะ`);
                });
            }
            else if(args[1].toLowerCase() == 'text' || 'txt'){
                await message.guild.channels.create(`🟢${message.guild.members.cache.filter(m => m.presence?.status == 'online').size}-⛔${message.guild.members.cache.filter(m => m.presence?.status == 'dnd').size}`,{
                    type: `text`,
                })
                .then(async (channel) => {
                    await db.set(`stats_${message.guild.id}_add_status_1`,channel.id);
                    await channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });
                });
                await message.guild.channels.create(`🌙${message.guild.members.cache.filter(m => m.presence?.status == 'idle').size}-⚫${message.guild.members.cache.filter(m => m.presence?.status == 'offline' || !m.presence).size}`,{
                    type: `text`,
                })
                .then(async (channel) => {
                    await db.set(`stats_${message.guild.id}_add_status_2`,channel.id);
                    await channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });
                });
                await db.set(`stats_${message.guild.id}_add_status_activate`,'true').then(async()=>{
                    await message.channel.send(`:white_check_mark: ทำการตั้งค่าเสร็จเรียบร้อยค่ะ`);
                });
            }
            else{
                return message.channel.send(`คุณสามารถระบุได้เฉพาะ \`voice\` หรือ \`text\` เท่านั้นน่ะคะ`);
            }
        }
        else if(args[0].toLowerCase() == '-role'){
            return;
        }
        else{
            return;
        }
    }
}