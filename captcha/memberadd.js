const { Captcha, CaptchaGenerator } = require('captcha-canvas');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('../database/quickmongo.js');
const randomColor = require('randomcolor');
const radom_Color = randomColor({
    luminosity: 'bright',
    hue: 'random'
 });

module.exports = async(client, member) =>{
    const roleID = await db.get(`captcha_${member.guild.id}_roleid`);
    const roleRemoveID = await db.get(`captcha_${member.guild.id}_roleremoveid`);
    const guildLogCh = await db.get(`captcha_${member.guild.id}_guildlogch`);
    if(member.user.bot == false){
        const captcha = new Captcha();
        captcha.async = true;
        captcha.addDecoy();
        captcha.drawTrace();
        captcha.drawCaptcha();


        const attachment = new MessageAttachment(await captcha.png, `captcha.png`);

        const embed = new MessageEmbed()
            .setColor(radom_Color)
            .setDescription(`โปรดพิมพ์สิ่งที่คุณเห็นในภาพนี้เพื่อยืนยันตัวตน\nโดย \`มีเวลา 45 วินาที\` ในการยืนยันค่ะ`)
            .attachFiles(attachment)
            .setImage('attachment://captcha.png')
            .setFooter('K w a n')
            .setTimestamp()

        const msg = await member.send(embed);

        const filter = (message) =>{
            if(message.author.id !== member.id) return;
            if(message.content === captcha.text) return true;
            else member.send(':x: การยืนยันตัวตนผิดพลาด โปรดลองอีกครั้งค่ะ');
        }

        try{
            const response = await msg.channel.awaitMessages(filter,{
                max: 1,
                time: 45000,
                errors: ["time"],
            });
            if(response){
                member.send(':white_check_mark: การยืนยันตัวตนถูกต้องค่ะ!');
                if(roleID !== null){
                    let checkrole = member.guild.roles.cache.find(r => r.id === roleID);
                    if(member.guild.me.roles.highest.position > checkrole.rawPosition){
                        if(checkrole){
                            if(!member.roles.cache.has(checkrole.id)){
                                await member.roles.add(checkrole.id);
                                member.send(`:inbox_tray: ได้ทำการเพิ่มยศ ${checkrole.name} ให้เรียบร้อยค่ะ`);
                            }
                        }
                    }
                }
                if(roleRemoveID !== null){
                    let checkroleremove = member.guild.roles.cache.find(r => r.id === roleRemoveID);
                    if(member.guild.me.roles.highest.position > checkroleremove.rawPosition){
                        if(checkroleremove){
                            if(member.roles.cache.has(checkroleremove.id)){
                                await member.roles.remove(checkroleremove.id);
                                member.send(`:outbox_tray: ได้ทำการนำยศ ${checkroleremove.name} ออกเรียบร้อยค่ะ`);
                            }
                        }
                    }
                }
                if(guildLogCh !== null){
                    const guildlog = member.guild.channels.cache.get(guildLogCh);
                    if(guildlog){
                        const logembed = new MessageEmbed()
                            .setColor('#425bff')    
                            .setTitle('บันทึกการยืนยันตัวตน')
                            .setDescription(`\`\`\`asciidoc
สมาชิก    :: ${member.user.username}
ไอดี      :: ${member.user.id}
การยืนยัน  :: ยืนยันเเล้ว
รหัสยืนยัน  :: ${captcha.text}
\`\`\``)
                            .setFooter('K w a n')
                            .setTimestamp()
                        await guildlog.send(logembed);
                    }
                }
            }
        }
        catch(err){
            await member.send(':warning: เนื่องจากคุณหมดเวลาในการยืนยันตัวตนเเล้ว จำเป็นต้องเตะคุณออกจากเซิฟเวอร์นี้ค่ะ');
            await member.kick('หมดเวลายืนยันตัวตน');
        }
    }
}