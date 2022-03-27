const db = require('../../database/quickmongo.js');
const { MessageEmbed } = require('discord.js');
const quickdb = require('quick.db');
const { PREFIX } = require('../../config.js');

module.exports = {
    config: {
        name: 'welcome-setup',
        aliases: [],
        description: 'setup welcome message channel',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        const welcomeActivate = await db.get(`welcome_${message.guild.id}_activate`);
        const welcomeChannel = await db.get(`welcome_${message.guild.id}_welcomechannel`);
        

        let prefix;
        let fetched = await quickdb.fetch(`prefix_${message.guild.id}`);
        if (fetched === null) {
            prefix = PREFIX;
        } else {
            prefix = fetched;
        }

        const checkWelcomeCH = message.guild.channels.cache.get(welcomeChannel);
        let welcomeCH;
        if(checkWelcomeCH) welcomeCH = checkWelcomeCH.name;
        else welcomeCH = null;

        const embedPage = new MessageEmbed()
            .setAuthor(`ช่องที่ตั้งค่า`, message.guild.iconURL())
            .setColor('#fcbe03')
            .addField(`:tada: ช่องต้อนรับ : ${welcomeCH || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}welcome-setup  < ช่องที่ต้องการ > \``, false)
            .setFooter('K w a n')
            .setTimestamp()
        if(!args[0]) return message.channel.send(embedPage);
        if(welcomeActivate !== null) return message.lineReplyNoMention('เอ๊ะ! ดูเหมือนว่าคุณจะได้ตั้งค่าเอาไว้เเล้วน่ะคะ');
        //chech enabled
        const getCH = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
        if(!getCH) return message.lineReplyNoMention('โปรดระบุช่องให้ถูกต้องด้วยน่ะคะ');
        if(getCH.type !== 'text') return message.lineReplyNoMention('โปรดระบุช่องที่เป็นช่องข้อความเท่านั้นน่ะคะ');

        await db.set(`welcome_${message.guild.id}_activate`, 'true');
        await db.set(`welcome_${message.guild.id}_welcomechannel`, getCH.id);
        await db.set(`welcome_${message.guild.id}_message`, 'ยินดีต้อนรับค่ะ');
        await message.channel.send(`:white_check_mark: ได้ทำการตั้งค่าช่อง \`${getCH.name}\` เป็นช่องต้อนรับเรียบร้อยเเล้วค่ะ`);
    }
}