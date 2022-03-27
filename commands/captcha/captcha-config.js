const { MessageActionRow, MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const db = require('../../database/quickmongo.js');
const quickdb = require('quick.db');
const { PREFIX } = require('../../config.js');


module.exports = {
    config: {
        name: 'captcha-config',
        aliases: [],
        description: 'configuration guild chaptcha',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        const checkActivate = await db.get(`captcha_${message.guild.id}_activate`);
        if(checkActivate == null) return message.lineReplyNoMention('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้ทำการตั้งค่าเลยน่ะคะ');

        let prefix;
        let fetched = await quickdb.fetch(`prefix_${message.guild.id}`);
        if (fetched === null) {
            prefix = PREFIX;
        } else {
            prefix = fetched;
        }

        const roleID = await db.get(`captcha_${message.guild.id}_roleid`);
        const roleRemoveID = await db.get(`captcha_${message.guild.id}_roleremoveid`);
        const guildLogCh = await db.get(`captcha_${message.guild.id}_guildlogch`);
        const checkRole = message.guild.roles.cache.find(r => r.id === roleID);
        const checkRoleRemove = message.guild.roles.cache.find(r => r.id === roleRemoveID);
        const checkGuildLogCh = message.guild.channels.cache.get(guildLogCh);
        let role;
        let roleRemove;
        let guildLog;
        if(checkRole) role = checkRole.name;
        else role = null;
        if(checkRoleRemove) roleRemove = checkRoleRemove.name;
        else roleRemove = null;
        if(checkGuildLogCh) guildLog = checkGuildLogCh.name;
        else guildLog = null;

        const embed = new MessageEmbed()
            .setColor('#ff42f9')
            .setAuthor('หน้าต่างการตั้งค่าระบบยืนยันตัวตน',message.guild.iconURL)
            .addField(`:gear: เพิ่มยศอัตโนมัติ : ${role || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}captcha-config -role  < ยศที่ต้องการ > \``, false)
            .addField(`:gear: นำยศออกอัตโนมัติ : ${roleRemove || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}captcha-config -removerole  < ยศที่ต้องการ > \``, false)
            .addField(`:gear: ช่องเเจ้งเตือน : ${guildLog || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}captcha-config -log  < ช่องที่ต้องการ > \``, false)
            .addField(`:recycle: ลบการตั้งค่า :`,`\` ${prefix}captcha-config -remove  < ตั้งค่าที่ต้องการลบ > \``, false)
            .setFooter('K w a n')
            .setTimestamp()
        if(!args[0]) return message.channel.send(embed);

        if(args[0].toLowerCase() === '-role'){
            if(roleID !== null) return message.lineReplyNoMention('คุณได้ทำการตั้งค่าเพิ่มยศอัตโนมัติไปเเล้วน่ะคะ');
            if(!args[1]) return message.lineReplyNoMention('โปรดระบุยศที่ต้องการจะตั้งค่าด้วยค่ะ');
            const getrole = message.guild.roles.cache.find(role => role.name === args[1]) || message.mentions.roles.first();
            if(!getrole) return message.lineReplyNoMention('โปรดระบุยศที่ต้องการให้ถูกต้องด้วยน่ะคะ');

            await db.set(`captcha_${message.guild.id}_roleid`,getrole.id).then(() =>{
                message.channel.send(`:white_check_mark: ทำการตั้งค่า <@&${getrole.id}> เรียบร้อยเเล้วค่ะ`);
            });
        }
        else if(args[0].toLowerCase() === '-removerole'){
            if(roleRemoveID !== null) return message.lineReplyNoMention('คุณได้ทำการตั้งค่านำยศออกอัตโนมัติไปเเล้วน่ะคะ');
            if(!args[1]) return message.lineReplyNoMention('โปรดระบุยศที่ต้องการจะตั้งค่าด้วยค่ะ');
            const getroleremove = message.guild.roles.cache.find(role => role.name === args[1]) || message.mentions.roles.first();
            if(!getroleremove) return message.lineReplyNoMention('โปรดระบุยศที่ต้องการให้ถูกต้องด้วยน่ะคะ');

            await db.set(`captcha_${message.guild.id}_roleremoveid`,getroleremove.id).then(() =>{
                message.channel.send(`:white_check_mark: ทำการตั้งค่า <@&${getroleremove.id}> เรียบร้อยเเล้วค่ะ`);
            });
        }
        else if(args[0].toLowerCase() === '-log'){
            if(guildLogCh !== null) return message.lineReplyNoMention('คุณได้ทำการตั้งค่าช่องเเจ้งเตือนไปเเล้วน่ะคะ');
            if(!args[1]) return message.lineReplyNoMention('โปรดระบุช่องที่ต้องการจะตั้งค่าด้วยค่ะ');
            const getguildlogch = message.guild.channels.cache.get(args[1]) || message.mentions.channels.first();
            if(!getguildlogch) return message.lineReplyNoMention('โปรดระบุช่องที่ต้องการให้ถูกต้องด้วยน่ะคะ');
            if(getguildlogch.type !== 'text') return message.lineReplyNoMention('โปรดระบุเป็นช่องข้อความเท่านั้นน่ะคะ');

            await db.set(`captcha_${message.guild.id}_guildlogch`,getguildlogch.id).then(() =>{
                message.channel.send(`:white_check_mark: ทำการตั้งค่าช่อง \` ${getguildlogch.name} \` เรียบร้อยเเล้วค่ะ`);
            });
        }
        else if(args[0].toLowerCase() === '-remove'){
            if(!args[1]) return message.lineReplyNoMention('โปรดเลือกการตั้งค่าที่ต้องการจะนำออกด้วยค่ะ');
            if(args[1].toLowerCase() === '-role'){
                if(roleID == null) return message.lineReplyNoMention('คุณยังไม่ได้ทำการตั้งค่าการเพิ่มยศอัตโนมัติเลยน่ะคะ');
                await db.delete(`captcha_${message.guild.id}_roleid`).then(() =>{
                    message.channel.send(':white_check_mark: ได้ทำการลบการตั้งค่าเพิ่มยศอัตโนมัติเรียบร้อยค่ะ');
                });
            }
            if(args[1].toLowerCase() === '-removerole'){
                if(roleRemoveID == null) return message.lineReplyNoMention('คุณยังไม่ได้ทำการตั้งค่าการลบยศอัตโนมัติเลยน่ะคะ');
                await db.delete(`captcha_${message.guild.id}_roleremoveid`).then(() =>{
                    message.channel.send(':white_check_mark: ได้ทำการลบการตั้งค่าลบยศอัตโนมัติเรียบร้อยค่ะ');
                });
            }
            if(args[1].toLowerCase() === '-log'){
                if(guildLogCh == null) return message.lineReplyNoMention('คุณยังไม่ได้ทำการตั้งค่าการเเจ้งเตือนเลยน่ะคะ');
                await db.delete(`captcha_${message.guild.id}_guildlogch`).then(() =>{
                    message.channel.send(':white_check_mark: ได้ทำการลบการตั้งค่าการเเจ้งเตือนเรียบร้อยค่ะ');
                });
            }
        }
        else{
            message.lineReplyNoMention('โปรดระบุตัวเลือกการตั้งค่าให้ถูกต้องด้วยน่ะคะ');
        }
    }
}