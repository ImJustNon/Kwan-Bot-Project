const { MessageEmbed } = require('discord.js');
const db = require('../../database/quickmongo.js');
const quickdb = require('quick.db');
const { PREFIX } = require('../../config.js');

module.exports = {
    config: {
        name: 'welcome-disable',
        aliases: ['welcome-remove', 'welcome-delete'],
        description: 'disable welcome message channel',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        const welcomeActivate = await db.get(`welcome_${message.guild.id}_activate`);
        const welcomeChannel = await db.get(`welcome_${message.guild.id}_welcomechannel`);
        const welcomeMessage = await db.get(`welcome_${message.guild.id}_message`);
        const welcomeBackgroundActivate = await db.get(`welcome_${message.guild.id}_backgroundimage_activate`);
        const welcomeBackground = await db.get(`welcome_${message.guild.id}_backgroundimage`);
        const welcomeFontColor = await db.get(`welcome_${message.guild.id}_fontcolor`);
        const welcomeTextInImage = await db.get(`welcome_${message.guild.id}_textinimage`);


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
            .addField(`:recycle: ปิดการใช้งาน :`,`\` ${prefix}welcome-disable -all \``,false)
            .addField(`:recycle: ลบตั้งค่าภาพ :`,`\` ${prefix}welcome-disable -image \``,false)
            .addField(`:recycle: ลบตั้งค่าข้อความ :`,`\` ${prefix}welcome-disable -message \``,false)
            .addField(`:recycle: ลบตั้งค่าสีฟอนท์ :`,`\` ${prefix}welcome-disable -fontcolor \``,false)
            .addField(`:recycle: ลบตั้งค่าข้อความในภาพ :`,`\` ${prefix}welcome-disable -textinimage \``,false)
            .setFooter('K w a n')
            .setTimestamp()

        if(!args[0]) return message.lineReplyNoMention(page);
        if(welcomeActivate == null) return message.lineReplyNoMention('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้ตั้งค่าระบบส่งข้อความต้อนรับเลยน่ะคะ');

        if(args[0].toLowerCase() == '-all'){
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`confirm\` เพื่อทำการยืนยันด้วยค่ะ`);
            await db.delete(`welcome_${message.guild.id}_activate`);
            await db.delete(`welcome_${message.guild.id}_welcomechannel`);
            await db.delete(`welcome_${message.guild.id}_message`);
            await db.delete(`welcome_${message.guild.id}_backgroundimage_activate`);
            await db.delete(`welcome_${message.guild.id}_backgroundimage`);
            await db.delete(`welcome_${message.guild.id}_fontcolor`);
            await db.delete(`welcome_${message.guild.id}_textinimage`);
            await message.channel.send(':white_check_mark: ทำการลบการตั้งค่ทั้งหมดเรียบร้อย');
        }
        else if(args[0].toLowerCase() == '-image'){
            if(welcomeBackgroundActivate == null) return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าเปิดใช้งานส่งภาพต้อนรับเลยน่ะคะ');
            if(welcomeBackgroundActivate == null) return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าเปิดใช้งานส่งภาพต้อนรับเลยน่ะคะ');
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`confirm\` เพื่อทำการยืนยันด้วยค่ะ`);
            await db.delete(`welcome_${message.guild.id}_backgroundimage_activate`);
            await db.delete(`welcome_${message.guild.id}_backgroundimage`);
            await db.delete(`welcome_${message.guild.id}_fontcolor`);
            await db.delete(`welcome_${message.guild.id}_textinimage`);
            await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าภาพเรียบร้อย');
        }
        else if(args[0].toLowerCase() == '-message'){
            if(welcomeMessage == null) return message.lineReplyNoMention('คุณยังไม่ได้มีการตั้งค่าข้อความต้อนรับเลยน่ะคะ')
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`confirm\` เพื่อทำการยืนยันด้วยค่ะ`);
            await db.delete(`welcome_${message.guild.id}_message`);
            await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าข้อความเรียบร้อย');
        }
        else if(args[0].toLowerCase() == '-fontcolor'){
            if(welcomeBackgroundActivate == null) return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าเปิดใช้งานส่งภาพต้อนรับเลยน่ะคะ');
            if(welcomeFontColor == null) return message.lineReplyNoMention('คุณยังไม่ได้มีการตั้งค่าสีฟอนท์เลยน่ะคะ');
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`confirm\` เพื่อทำการยืนยันด้วยค่ะ`);
            await db.delete(`welcome_${message.guild.id}_fontcolor`);
            await message.channel.send(':white_check_mark: ทำการลบการตั้งค่าสีฟอนท์เรียบร้อย');
        }
        else if(args[0].toLowerCase() == '-textinimage'){
            if(welcomeBackgroundActivate == null) return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าเปิดใช้งานส่งภาพต้อนรับเลยน่ะคะ');
            if(welcomeTextInImage == null) return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าข้อความในภาพเลยน่ะคะ');
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`confirm\` เพื่อทำการยืนยันด้วยค่ะ`);
            await db.delete(`welcome_${message.guild.id}_textinimage`);
        }
        else{
            return message.lineReplyNoMention('โปรดระบุตัวเลือกที่มีให้เท่านั้นน่ะคะ');
        }
    }
}