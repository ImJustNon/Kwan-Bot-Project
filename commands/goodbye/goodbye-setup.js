const db = require('../../database/quickmongo.js');
const { MessageEmbed } = require('discord.js');
const quickdb = require('quick.db');
const { PREFIX } = require('../../config.js');

module.exports = {
    config: {
        name: 'goodbye-setup',
        aliases: [],
        description: 'setup goodbye message channel',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        const goodbyeActivate = await db.get(`goodbye_${message.guild.id}_activate`);
        const goodbyeChannel = await db.get(`goodbye_${message.guild.id}_goodbyechannel`);
        

        let prefix;
        let fetched = await quickdb.fetch(`prefix_${message.guild.id}`);
        if (fetched === null) {
            prefix = PREFIX;
        } else {
            prefix = fetched;
        }

        const checkGoodbyeCH = message.guild.channels.cache.get(goodbyeChannel);
        let goodbyeCH;
        if(checkGoodbyeCH) goodbyeCH = checkGoodbyeCH.name;
        else goodbyeCH = null;

        const embedPage = new MessageEmbed()
            .setAuthor(`ช่องที่ตั้งค่า`, message.guild.iconURL())
            .setColor('#fcbe03')
            .addField(`:tada: ช่องต้อนรับ : ${goodbyeCH || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}goodbye-setup  < ช่องที่ต้องการ > \``, false)
            .setFooter('K w a n')
            .setTimestamp()
        if(!args[0]) return message.channel.send(embedPage);
        if(goodbyeActivate !== null) return message.lineReplyNoMention('เอ๊ะ! ดูเหมือนว่าคุณจะได้ตั้งค่าเอาไว้เเล้วน่ะคะ');
        //chech enabled
        const getCH = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
        if(!getCH) return message.lineReplyNoMention('โปรดระบุช่องให้ถูกต้องด้วยน่ะคะ');
        if(getCH.type !== 'text') return message.lineReplyNoMention('โปรดระบุช่องที่เป็นช่องข้อความเท่านั้นน่ะคะ');

        await db.set(`goodbye_${message.guild.id}_activate`, 'true');
        await db.set(`goodbye_${message.guild.id}_goodbyechannel`, getCH.id);
        await db.set(`goodbye_${message.guild.id}_message`, 'ลาก่อน ;-;');
        await message.channel.send(`:white_check_mark: ได้ทำการตั้งค่าช่อง \`${getCH.name}\` เป็นช่องลาสมาชิกเรียบร้อยเเล้วค่ะ`);
    }
}