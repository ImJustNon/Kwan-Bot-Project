const { MessageEmbed } = require('discord.js');
const db = require('../../database/quickmongo.js');
const quickdb = require('quick.db');
const { PREFIX } = require('../../config.js');

module.exports = {
    config: {
        name: 'goodbye-disable',
        aliases: ['goodbye-remove', 'goodbye-delete'],
        description: 'disable goodbye message channel',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        const goodbyeActivate = await db.get(`goodbye_${message.guild.id}_activate`);
        const goodbyeChannel = await db.get(`goodbye_${message.guild.id}_goodbyechannel`);
        const goodbyeMessage = await db.get(`goodbye_${message.guild.id}_message`);
        const goodbyeBackgroundActivate = await db.get(`goodbye_${message.guild.id}_backgroundimage_activate`);
        const goodbyeBackground = await db.get(`goodbye_${message.guild.id}_backgroundimage`);
        const goodbyeFontColor = await db.get(`goodbye_${message.guild.id}_fontcolor`);
        const goodbyeTextInImage = await db.get(`goodbye_${message.guild.id}_textinimage`);


        let prefix;
        let fetched = await quickdb.fetch(`prefix_${message.guild.id}`);
        if (fetched === null) {
            prefix = PREFIX;
        } else {
            prefix = fetched;
        }

        const page = new MessageEmbed()
            .setAuthor(`ตัวเลือกลบการตั้งค่า`, message.guild.iconURL())
            .setColor('#ffd417')
            .addField(`:recycle: ปิดการใช้งาน :`,`\` ${prefix}goodbye-disable -all \``,false)
            .addField(`:recycle: ลบตั้งค่าภาพ :`,`\` ${prefix}goodbye-disable -image \``,false)
            .addField(`:recycle: ลบตั้งค่าข้อความ :`,`\` ${prefix}goodbye-disable -message \``,false)
            .addField(`:recycle: ลบตั้งค่าสีฟอนท์ :`,`\` ${prefix}goodbye-disable -fontcolor \``,false)
            .addField(`:recycle: ลบตั้งค่าข้อความในภาพ :`,`\` ${prefix}goodbye-disable -textinimage \``,false)
            .setFooter('K w a n')
            .setTimestamp()

        if(!args[0]) return message.lineReplyNoMention(page);
        if(goodbyeActivate == null) return message.lineReplyNoMention('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้ตั้งค่าระบบส่งข้อความลาสมาชิกเลยน่ะคะ');

        if(args[0].toLowerCase() == '-all'){
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`confirm\` เพื่อทำการยืนยันด้วยค่ะ`);
            await db.delete(`goodbye_${message.guild.id}_activate`);
            await db.delete(`goodbye_${message.guild.id}_goodbyechannel`);
            await db.delete(`goodbye_${message.guild.id}_message`);
            await db.delete(`goodbye_${message.guild.id}_backgroundimage_activate`);
            await db.delete(`goodbye_${message.guild.id}_backgroundimage`);
            await db.delete(`goodbye_${message.guild.id}_fontcolor`);
            await db.delete(`goodbye_${message.guild.id}_textinimage`);
            await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าทั้งหมดเรียบร้อย');
        }
        else if(args[0].toLowerCase() == '-image'){
            if(goodbyeBackgroundActivate == null) return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าเปิดใช้งานส่งภาพลาสมาชิกเลยน่ะคะ');
            if(goodbyeBackgroundActivate == null) return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าเปิดใช้งานส่งภาพลาสมาชิกเลยน่ะคะ');
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`confirm\` เพื่อทำการยืนยันด้วยค่ะ`);
            await db.delete(`goodbye_${message.guild.id}_backgroundimage_activate`);
            await db.delete(`goodbye_${message.guild.id}_backgroundimage`);
            await db.delete(`goodbye_${message.guild.id}_fontcolor`);
            await db.delete(`goodbye_${message.guild.id}_textinimage`);
            await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าภาพเรียบร้อย');
        }
        else if(args[0].toLowerCase() == '-message'){
            if(goodbyeMessage == null) return message.lineReplyNoMention('คุณยังไม่ได้มีการตั้งค่าข้อความลาสมาชิกเลยน่ะคะ')
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`confirm\` เพื่อทำการยืนยันด้วยค่ะ`);
            await db.delete(`goodbye_${message.guild.id}_message`);
            await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าข้อความเรียบร้อย');
        }
        else if(args[0].toLowerCase() == '-fontcolor'){
            if(goodbyeBackgroundActivate == null) return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าเปิดใช้งานส่งภาพลาสมาชิกเลยน่ะคะ');
            if(goodbyeFontColor == null) return message.lineReplyNoMention('คุณยังไม่ได้มีการตั้งค่าสีฟอนท์เลยน่ะคะ');
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`confirm\` เพื่อทำการยืนยันด้วยค่ะ`);
            await db.delete(`goodbye_${message.guild.id}_fontcolor`);
            await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าสีฟอนท์เรียบร้อย');
        }
        else if(args[0].toLowerCase() == '-textinimage'){
            if(goodbyeBackgroundActivate == null) return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าเปิดใช้งานส่งภาพลาสมาชิกเลยน่ะคะ');
            if(goodbyeTextInImage == null) return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าข้อความในภาพเลยน่ะคะ');
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`confirm\` เพื่อทำการยืนยันด้วยค่ะ`);
            await db.delete(`goodbye_${message.guild.id}_textinimage`);
        }
        else{
            return message.lineReplyNoMention('โปรดระบุตัวเลือกที่มีให้เท่านั้นน่ะคะ');
        }
    }
}