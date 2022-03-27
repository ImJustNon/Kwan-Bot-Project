const db = require('../../database/quickmongo.js');
const { MessageEmbed } = require('discord.js');
const quickdb = require('quick.db');
const { PREFIX } = require('../../config.js');
const validUrl = require('valid-url');
const isHexcolor = require('is-hexcolor');

module.exports = {
    config: {
        name: 'goodbye-config',
        aliases: [],
        description: 'config goodbye message channel',
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
        if(goodbyeActivate == null) return message.lineReplyNoMention('เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้ตั้งค่าเปิดใช้งานเลยน่ะคะ');
        
        let goodbyeCh;
        let goodbyeBgActivate;
        if(goodbyeCh !== null){
            const checkchannel = await message.guild.channels.cache.get(goodbyeChannel);
            if(checkchannel) goodbyeCh = checkchannel.name;
        }
        else goodbyeCh = null;
        if(goodbyeBackgroundActivate !== null) goodbyeBgActivate = 'เปิดใช้งาน';
        else goodbyeBgActivate = null;

        let prefix;
        let fetched = await quickdb.fetch(`prefix_${message.guild.id}`);
        if (fetched === null) {
            prefix = PREFIX;
        } else {
            prefix = fetched;
        }

        const configEmbed = new MessageEmbed()
        .setColor(goodbyeFontColor || '#ff0a43')
        .setAuthor(`หน้าต่างการตั้งค่าข้อความลาสมาชิก`, message.guild.iconURL())    
        .addField(`:gear: ข้อความลาสมาชิก : ${goodbyeMessage || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}goodbye-config -message  < ข้อความที่ต้องการ > \``,false)
        .addField(`:gear: เปิดใช้งานภาพ : ${goodbyeBgActivate || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}goodbye-config -image true \``,false)
        .addField(`:gear: ภาพพื้นหลัง : ${goodbyeBackground || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}goodbye-config -image -background  < URL ภาพที่ต้องการ > \``, false)
        .addField(`:gear: ข้อความบนภาพ : ${goodbyeTextInImage || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}goodbye-config -image -text  < ข้อความที่ต้องการ > \``, false)
        .addField(`:gear: สีฟอนท์ : ${goodbyeFontColor || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}goodbye-config -image -fontcolor  < โค้ดสีที่ต้องการ > \``, false)
        .addField(`:gear: ช่องส่งข้อความ : ${goodbyeCh || '\❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}goodbye-config -channel  < ช่องที่ต้องการ > \``, false)
        .setFooter('K w a n')
        .setTimestamp()

        if(!args[0]) return message.channel.send(configEmbed);

        if(args[0].toLowerCase() === '-message'){
            if(!args[1]) return message.lineReplyNoMention('โปรดระบุ ข้อความที่ต้องการจะตั้งค่าด้วยค่ะ')
            const text = args.slice(1).join(" ");
            await db.set(`goodbye_${message.guild.id}_message`, text).then(() =>{
                message.channel.send(`:white_check_mark: ทำการตั้งค่าข้อความเรียบร้อยค่ะ`);
            });
        }
        else if(args[0].toLowerCase() === '-image'){
            if(!args[1]) return message.lineReplyNoMention(`โปรดพิมพ์ \`true\` เพื่อทำการเปิดใช้งานเเละ URL ภาพที่ต้องการค่ะ`);
            if(args[1].toLowerCase() == 'true') {
                await db.set(`goodbye_${message.guild.id}_backgroundimage_activate`, 'true').then(() =>{
                    message.channel.send(`:white_check_mark: ทำการเปิดใช้งานภาพเรียบร้อยค่ะ`);
                });
            }
            else if(args[1].toLowerCase() == '-background'){
                if(goodbyeBackgroundActivate == null) return message.lineReplyNoMention('โปรดเปิดใช้งานก่อนน่ะคะ');
                if(!args[2]) return message.lineReplyNoMention('โปรดระบุ URL ภาพที่ต้องการด้วยน่ะคะ');
                if(validUrl.isUri(args[2])){
                    await db.set(`goodbye_${message.guild.id}_backgroundimage`, args[2]).then(() =>{
                        message.channel.send(`:white_check_mark: ทำการตั้งค่าภาพพื้นหลังเรียบร้อยค่ะ`);
                    });
                }   
                else{
                    return message.lineReplyNoMention('โปรดระบุ URL ภาพที่ต้องการให้ถูกต้องด้วยน่ะคะ');
                }
            }
            else if(args[1].toLowerCase() == '-text'){
                if(goodbyeBackgroundActivate == null) return message.lineReplyNoMention('โปรดเปิดใช้งานก่อนน่ะคะ');
                let txt = args.slice(2).join(" ");
                if(!args[2]) return message.lineReplyNoMention('โปรดระบุ ข้อความที่ต้องการใส่ลงไปในภาพด้วยค่ะ');
                await db.set(`goodbye_${message.guild.id}_textinimage`, txt).then(() =>{
                    message.channel.send(`:white_check_mark: ทำการตั้งค่าภาพพื้นหลังเรียบร้อยค่ะ`);
                });
            }
            else if(args[1].toLowerCase() === '-fontcolor'){
                if(goodbyeBackgroundActivate == null) return message.lineReplyNoMention('โปรดเปิดใช้งานก่อนน่ะคะ');
                if(!args[2]) return message.lineReplyNoMention('โปรดระบุ สีฟอนท์ที่ต้องการด้วยค่ะ');
                if(!isHexcolor(args[2])) return message.lineReplyNoMention('โปรดระบุ โค้ดสีที่ให้ถูกต้องด้วยค่ะ');
                await db.set(`goodbye_${message.guild.id}_fontcolor`, args[2]).then(() =>{
                    message.channel.send(new MessageEmbed()
                        .setDescription(`:white_check_mark: ทำการตั้งค่าสีฟอนท์รับเรียบร้อยค่ะ`)
                        .setColor(args[2])
                    );
                });
            }
            else{
                message.lineReplyNoMention(`โปรดระบุคำสั่งตามที่มีให้ในตัวเลือกน่ะคะ`);
            }
        }
        else if(args[0].toLowerCase() === '-channel'){
            if(!args[1]) return message.lineReplyNoMention('โปรดระบุ ช่องข้อความที่ต้องการจะตั้งค่าด้วยค่ะ');
            const checkNewCh = message.guild.channels.cache.get(args[1]) || message.mentions.channels.first();
            if(!checkNewCh) return message.lineReplyNoMention('โปรดระบุ ช่องที่ต้องการให้ถูกต้องด้วยน่ะคะ');
            if(checkNewCh.type !== 'text') return message.lineReplyNoMention('โปรดระบุ ช่องที่เป็นช่องส่งข้อความเท่านั้นน่ะคะ');
            await db.set(`goodbye_${message.guild.id}_goodbyechannel`, checkNewCh.id).then(() =>{
                message.channel.send(`:white_check_mark: ทำการตั้งค่าช่อง \`${checkNewCh.name}\` เป็นช่องส่งข้อความลาสมาชิกเรียบร้อยค่ะ`);
            });
        }
        else{
            return message.lineReplyNoMention('โปรดระบุการตั้งค่าที่มีในตั้งเลือกเท่านั้นน่ะคะ');
        }
    }
}