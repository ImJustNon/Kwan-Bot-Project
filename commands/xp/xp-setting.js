const validUrl = require('valid-url');
const isHexcolor = require('is-hexcolor');
const db = require('../../database/quickmongo.js'); 
const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');


module.exports = {
    config: {
        name: 'xp-setting',
        aliases: ['xp-set'],
        description: 'show user level',
    },
    run: async(bot, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");

            let prefix;
            if (message.author.bot || message.channel.type === "dm") return;
            try {
                let fetched = await db.fetch(`prefix_${message.guild.id}`);
                if (fetched == null) {
                    prefix = PREFIX;
                } 
                else {
                    prefix = fetched;
                }
            } 
            catch (e) {
                console.log(e);
            };
            
            const backgroundimage = await db.get(`xp_${message.guild.id}_background_image`);
            const backgroundcolor = await db.get(`xp_${message.guild.id}_background_color`);
            const color = await db.get(`xp_${message.guild.id}_color`);
            const overlay = await db.get(`xp_${message.guild.id}_overlay`);
            const overlaycolor = await db.get(`xp_${message.guild.id}_overlay_color`);
            const overlayvisible = await db.get(`xp_${message.guild.id}_overlay_visible`);
            const status = await db.get(`xp_${message.guild.id}_status`);

            const settingpage = new MessageEmbed()
                .setAuthor(`หน้าต่างการตั้งค่าเเรงค์การ์ดของเซิฟเวอร์  ${message.guild.name}`, message.guild.iconURL())
                .setColor(color || 'RANDOM')
                .addField(`:frame_photo: Background Image : ${backgroundimage || ' \❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}xp-set -setbackground -setimage  < URLภาพที่ต้องการ > \``, false)
                .addField(`:frame_photo: Background Color : ${backgroundcolor || ' \❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}xp-set -setbackground -setcolor  < โค้ดสีที่ต้องการ > \``,false)
                .addField(`:art: Color : ${color || ' \❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}xp-set -setcolor  < โค้ดสีที่ต้องการ > \``,false)
                .addField(`:gear: Overlay : ${overlay || ' \❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}xp-set -setoverlay  < true/false > \``,false)
                .addField(`:art: Overlay Color : ${overlaycolor || ' \❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}xp-set -setoverlay true  < โค้ดสีที่ต้องการ > \``,false)
                .addField(`:art: Overlay Visible : ${overlayvisible || ' \❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}xp-set -setoverlay true  < โค้ดสีที่ต้องการ >  < ความโปร่งของสี >\``,false)
                .addField(`:green_circle: Status : ${status || ' \❌ ยังไม่ได้ตั้งค่า'}`,`\` ${prefix}xp-set -setstatus  < true/false > \``, false)
                .addField(`:recycle: Reset : `, `\` ${prefix}xp-set reset \``, false)
                .setFooter('K w a n')
                .setTimestamp()
            

            if(!args[0]) return message.channel.send(settingpage);

            if(args[0].toLowerCase() == '-setbackground'){
                if(!args[1]) return message.channel.send('โปรดระบุประเภทของพื้นหลังที่คุณต้องการด้วยน่ะคะ');
                if(args[1]){
                    if(args[1].toLowerCase() == '-setimage'){
                        if(validUrl.isUri(args[2])){
                            await db.set(`xp_${message.guild.id}_background_image`,args[2]);
                            await message.channel.send(':white_check_mark: ได้ทำการตั้งค่าภาพพื้นหลังเรียบร้อยเเล้วค่ะ');
                            if(await db.get(`xp_${message.guild.id}_background_color`) !== null){
                                await db.delete(`xp_${message.guild.id}_background_color`);
                            }
                        }
                        else{
                            return message.channel.send('โปรดระบุ URL ของภาพที่คุณต้องการให้ถูกต้องด้วยน่ะคะ');
                        }
                    }
                    if(args[1].toLowerCase() == '-setcolor'){
                        if(isHexcolor(args[2])){
                            await db.set(`xp_${message.guild.id}_background`,args[2]);
                            await message.channel.send(':white_check_mark: ได้ทำการตั้งค่าสีพื้นหลังเรียบร้อยเเล้วค่ะ');
                            if(await db.get(`xp_${message.guild.id}_background_image`) !== null){
                                await db.delete(`xp_${message.guild.id}_background_image`);
                            }
                        }
                        else{
                            return message.channel.send('คุณสามารถระบุได้เฉพาะโค้ดสีเท่านั้นน่ะคะ');
                        }
                    }
                }
            }
            else if(args[0].toLowerCase() == '-setcolor'){
                if(!args[1]) return message.channel.send('โปรดระบุ สี(hexcolor) ที่คุณต้องการด้วยน่ะคะ');
                if(isHexcolor(args[1])){
                    await db.set(`xp_${message.guild.id}_color`,args[1]);
                    await message.channel.send(':white_check_mark: ได้ทำการตั้งค่าสีเรียบร้อยเเล้วค่ะ');
                }
                else{
                    return message.channel.send('โปรดระบุ สี(hexcolor) ที่คุณต้องการให้ถูกต้องด้วยน่ะคะ');
                }
            }
            else if(args[0].toLowerCase() == '-setoverlay'){
                if(!args[1]) return message.channel.send('โปรดระบุ true เพื่อเปิดใช้งานหรือ false เพื่อปิดใช้งานด้วยน่ะคะ');
                if(args[1].toLowerCase() == 'true'){
                    await db.set(`xp_${message.guild.id}_overlay`,'true');
                    if(args[2]){
                        if(isHexcolor(args[2])){
                            await db.set(`xp_${message.guild.id}_overlay_color`,args[2]);
                            await message.channel.send(':white_check_mark: ได้ทำการตั้งค่าใช้งานเเละตั้งค่าสีเรียบร้อยเเล้วค่ะ');
                            if(args[3]){
                                if(!isNaN(args[3])){
                                    if(0 <= parseFloat(args[3]) && 1 <= parseFloat(args[3])){
                                    await db.set(`xp_${message.guild.id}_overlay_visible`,args[3]);
                                    await message.channel.send(':white_check_mark: ได้ทำการตั้งค่าใช้งานเเละตั้งค่าสีเรียบร้อยเเล้วค่ะ');
                                    }
                                    else{
                                        return message.channel.send('คุณสามารถระบุได้เฉพาะตัวเลข 0 - 1 เท่านั้นน่ะคะ เช่น(0.2, 0.5, 0.7)');
                                    }
                                }
                                else{
                                    return message.channel.send('คุณสามารถระบุได้เฉพาะตัวเลขเท่านั้นน่ะคะ');
                                }
                            }
                        }
                        else{
                            return message.channel.send('คุณสามารถระบุได้เฉพาะโค้ดสีเท่านั้นน่ะคะ');
                        }
                    }
                }
                else if(args[1].toLowerCase() == 'false'){
                    await db.set(`xp_${message.guild.id}_overlay`,'false');
                }
                else{
                    return message.channel.send('โปรดระบุ true เพื่อเปิดใช้งานหรือ false เพื่อปิดใช้งานเท่านั้นน่ะคะ');
                }
                await message.channel.send(':white_check_mark: ได้ทำการตั้งค่าเรียบร้อยเเล้วค่ะ');
            }
            else if(args[0].toLowerCase() == '-setstatus'){
                if(!args[1]) return message.channel.send('โปรดระบุ true เพื่อเปิดใช้งานหรือ false เพื่อปิดใช้งานด้วยน่ะคะ');
                if(args[1].toLowerCase() == 'true'){
                    let checdatastatus = await db.get(`xp_${message.guild.id}_status`);
                    if(checdatastatus !== null) return message.channel.send(`เอ๊ะ! ดูเหมือนว่าคุณจะได้ทำการตั้งค่าเอาไว้เเล้วน่ะคะ`);
                    await db.set(`xp_${message.guild.id}_status`, 'true');
                    await message.channel.send(':white_check_mark: ได้ทำการตั้งค่าใช้งานเรียบร้อยเเล้วค่ะ')
                }
                else if(args[1].toLowerCase() == 'false'){
                    let checkdatastatus = await db.get(`xp_${message.guild.id}_status`);
                    if(checkdatastatus == null) return message.channel.send(`เอ๊ะ! ดูเหมือนว่าคุณจะยังไม่ได้ทำการตั้งค่าเลยน่ะคะ`);
                    await db.delete(`xp_${message.guild.id}_status`);
                    await message.channel.send(':white_check_mark: ได้ทำการลบตั้งค่าเรียบร้อยเเล้วค่ะ')
                }
                else{
                    return message.channel.send('โปรดระบุ true เพื่อเปิดใช้งานหรือ false เพื่อปิดใช้งานเท่านั้นน่ะคะ');
                }
            }
            else if(args[0].toLowerCase() == 'reset') {
                const embed = new MessageEmbed()
                    .setColor('#ff1c59')
                    .setTitle(`หากต้องการรีเซ็ตการตั้งค่าให้กด \`ยืนยัน\` \nหากต้องการยกเลิกให้กด \`ยกเลิก\``)
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
                        await deletedata(message);
                    }
                    if(b.id == 'no'){
                        await message.channel.send('ทำการยกเลิกรายการเรียบร้อยค่ะ');
                        await MESSAGE.delete();
                    }
                    await b.reply.defer()
                });
                async function deletedata(message){
                    await db.delete(`xp_${message.guild.id}_background_image`);
                    await db.delete(`xp_${message.guild.id}_background_color`);
                    await db.delete(`xp_${message.guild.id}_color`);
                    await db.delete(`xp_${message.guild.id}_overlay`);
                    await db.delete(`xp_${message.guild.id}_overlay_color`);
                    await db.delete(`xp_${message.guild.id}_overlay_visible`);
                    await message.channel.send(':white_check_mark: ได้รีเซ็ตการตั้งค่าเรียบร้อยค่ะ');
                    await MESSAGE.delete();
                }
            }
        }
        catch(err){
            console.log(err);
        }
    }
}