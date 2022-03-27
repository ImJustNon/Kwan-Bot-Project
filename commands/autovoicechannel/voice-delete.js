const { Database } = require("quickmongo");
const db = require('../../database/quickmongo.js');
const { MessageEmbed } = require('discord.js');
const { MessageMenuOption, MessageMenu } = require("discord-buttons");

module.exports = {
    config: {
        name: 'voice-delete',
        aliases: ['v-delete','voice-remove','v-remove','vc-remove','vc-delete'],
    },
    run: async(bot, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้น่ะคะ**")
            const channel_1 = await message.guild.channels.cache.get(await db.get(`voice_${message.guild.id}_1`));
            const channel_2 = await message.guild.channels.cache.get(await db.get(`voice_${message.guild.id}_2`));
            const channel_3 = await message.guild.channels.cache.get(await db.get(`voice_${message.guild.id}_3`));
            let out_1;
            let out_2;
            let out_3;

            if (!channel_1) out_1 = 'ยังไม่ได้ตั้งค่า';else out_1 = channel_1.name;

            if (!channel_2) out_2 = 'ยังไม่ได้ตั้งค่า';else out_2 = channel_2.name;

            if (!channel_3) out_3 = 'ยังไม่ได้ตั้งค่า';else out_3 = channel_3.name;
            
            const embed = new MessageEmbed()
                .setColor('#20f7e9')
                .setAuthor(`รายการช่องอัตโนมัติของเซิฟเวอร์ ${message.guild.name}`,message.guild.iconURL())
                .addField('ช่องเสียงอัตโนมัติ [1] :',`${out_1}`,false)
                .addField('ช่องเสียงอัตโนมัติ [2] :',`${out_2}`,false)
                .addField('ช่องเสียงอัตโนมัติ [3] :',`${out_3}`,false)
                .setFooter('K w a n')
                .setTimestamp()
            
            //------------------------------Menu option---------------------------
            let bone = new MessageMenuOption()
                .setLabel('ลบช่องเสียงอัตโนมัติ [1] ')
                .setEmoji("1️⃣")
                .setValue("del_one")
                .setDescription('หลังจากทำการกดเมนูนี้จะทำการลบทันทีค่ะ')
            let btwo = new MessageMenuOption()
                .setLabel('ลบช่องเสียงอัตโนมัติ [2] ')
                .setEmoji("2️⃣")
                .setValue("del_two")
                .setDescription('หลังจากทำการกดเมนูนี้จะทำการลบทันทีค่ะ')
            let bthree = new MessageMenuOption()
                .setLabel('ลบช่องเสียงอัตโนมัติ [3] ')
                .setEmoji("3️⃣")
                .setValue("del_three")
                .setDescription('หลังจากทำการกดเมนูนี้จะทำการลบทันทีค่ะ')

            let select = new MessageMenu()
                .setID('selector')
                .setPlaceholder('เลือกลบตรงนี้ได้เลยค่ะ')
                .setMaxValues(1)
                .setMinValues(1)
                .addOptions(bone,btwo,bthree)

            const Sendmenu = await message.channel.send(embed, select);
            const filter = ( button ) => button.clicker.user.id === message.author.id;
            let collector = Sendmenu.createMenuCollector(filter, { time : 45000 });
            collector.on("collect", async(b, menu) => {
                if(b.values[0] == "del_one") {
                    if (await db.get(`voice_${message.guild.id}_1`) == null ) message.reply('เอ๊ะ! ยังไม่ได้มีการตั้งค่าช่องเสี่ยงอัตโนมัติ [1] เลยน่ะคะ');
                    else { 
                        db.delete(`voice_${message.guild.id}_1`).then(()=>{
                            message.channel.send('ได้ทำการลบช่องเสียงอัตโนมัติ [1] เรียบร้อยเเล้วค่ะ');
                        });
                    }
                }
                else if(b.values[0] == "del_two") {
                    if (await db.get(`voice_${message.guild.id}_2`) == null ) message.reply('เอ๊ะ! ยังไม่ได้มีการตั้งค่าช่องเสี่ยงอัตโนมัติ [2] เลยน่ะคะ');
                    else { 
                        db.delete(`voice_${message.guild.id}_2`).then(()=>{
                            message.channel.send('ได้ทำการลบช่องเสียงอัตโนมัติ [2] เรียบร้อยเเล้วค่ะ');
                        });
                    }
                }
                else if(b.values[0] == "del_three") {
                    if (await db.get(`voice_${message.guild.id}_3`) == null ) message.reply('เอ๊ะ! ยังไม่ได้มีการตั้งค่าช่องเสี่ยงอัตโนมัติ [3] เลยน่ะคะ');
                    else { 
                        db.delete(`voice_${message.guild.id}_3`).then(()=>{
                            message.channel.send('ได้ทำการลบช่องเสียงอัตโนมัติ [3] เรียบร้อยเเล้วค่ะ');
                        });
                    }
                }
                b.reply.defer();
            });
            collector.on("end", (b) => {
                Sendmenu.edit(`เอ๊ะ! ดูเหมือนว่าจะหมดเวลาในการใช้งานเเล้วน่ะคะ`).then(msg => { 
                    msg.delete({ timeout : 10000 });
                });
            });
        //db.delete(`voice_${message.guild.id}_1`);
        }
        catch (err){
            console.log(err);
        }
    }
}