var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");
const setting = require('../../data/setting.js');
const Enbed_Color = '#92eb34';
const disbut = require('discord.js');
const { MessageMenuOption, MessageActionRow, MessageMenu } = require('discord-buttons');
const { MessageSelectMenu } = require('discord.js')
const e = require('express'); 




module.exports = {
    config: {
        name: "testhelp",
        description: "Help Menu",
        usage: "1) m/help \n2) m/help [module name]\n3) m/help [command (name or alias)]",
        example: "1) m/help\n2) m/help utility\n3) m/help ban",
        aliases: []
    },
    run: async (bot, message, args) => {
        let prefix;
        if (message.author.bot || message.channel.type === "dm") return;
            try {
                let fetched = await db.fetch(`prefix_${message.guild.id}`);
                if (fetched == null) {
                    prefix = PREFIX 
                } else {
                    prefix = fetched
                }
            } catch (e) {
                console.log(e)
        };


        if(message.content.toLowerCase() === `${prefix}help`) {
            //-------------------embed-------------------
            const aboutbot = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับบอท')
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}help \`**`,`การช่วยเหลือเกี่ยวกับคำสั่งบอท`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}invite \`**`,`เชิญบอทเข้าเซิฟเวอร์`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}uptime \`**`,`เช็คเวลาออนไลน์บอท`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}prefix \`**`,`คำสั่งบอท`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}reloadmod \`**`,`รีโหลด`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}stats \`**`,`สถานะบอท`,true)
                .setFooter('K w a n')
                .setTimestamp()

            const discord_activity = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับเกม')
                .addField(`${setting.emoji.rocket}  |  **YouTube-Together**`,`\` ${prefix}youtubetogether \` \n\` ${prefix}ytt \``,true)
                .addField(`${setting.emoji.rocket}  |  **Betrayal.io**`,`\` ${prefix}betrayal \` \n\` ${prefix}bt \``,true)
                .addField(`${setting.emoji.rocket}  |  **Poker Night**`,`\` ${prefix}pokernight \` \n\` ${prefix}pn \``,true)
                .addField(`${setting.emoji.rocket}  |  **Fishington.io**`,`\` ${prefix}fishington \` \n\` ${prefix}ft \``,true)
                .addField(`${setting.emoji.rocket}  |  **Chess In The Park**`,`\` ${prefix}chessinthepark \` \n\` ${prefix}chess \``,true)
                .addField(`${setting.emoji.rocket}  |  **Chess In The Park Development**`,`\` ${prefix}chessdevelopment \` \n\` ${prefix}chessdev \``,true)
                .addField(`${setting.emoji.rocket}  |  **Watch Together Dev**`,`\` ${prefix}watchtogetherdev \``,true)
                .addField(`${setting.emoji.rocket}  |  **Doodle Crew**`,`\` ${prefix}doodlecrew \``,true)
                .addField(`${setting.emoji.rocket}  |  **Word Snacks**`,`\` ${prefix}wordsnacks \``,true)
                .addField(`${setting.emoji.rocket}  |  **Letter Tile**`,`\` ${prefix}lettertile \``,true)
                .setFooter('K w a n')
                .setTimestamp()

            const image = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับตัดต่อรูปภาพ')
                .addField(`${setting.emoji.pic}  |  **\` ${prefix}distort \`**`,`ภาพที่มีการม้วน`,true)
                .setFooter('K w a n')
                .setTimestamp()

            const tools = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับเครื่องมือ')
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}calculate \`**`,`คำนวนเลข`,true)
                .setFooter('K w a n')
                .setTimestamp()

            const search = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับการค้นหา')
                .addField(`${setting.emoji.search}  |  **\` ${prefix}anime \`**`,`ค้นหารายระเอียดอนิเมะ`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}whois \`**`,`รายระเอียดผู้ใช้`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}gif \`**`,`ค้นหาภาพ Gif`, true)
                .setFooter('K w a n')
                .setTimestamp()

            const music = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับการค้นหา')
                .addField(`${setting.emoji.music}  |  **\` ${prefix}clearqueue \`**`,`ล้างคิว`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}loop \`**`,`วนซ้ำ`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}lyrics \`**`,`ค้นหาเนื้อเพลง`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}nowplaying \`**`,`เพลงที่เล่นอยู่`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}pause \`**`,`หยุดชั่วคราว`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}resume \`**`,`ดำเนิดเพลงต่อ`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}play \`**`,`เล่น`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}queue \`**`,`เเสดงรายการคิว`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}remove \`**`,`นำออก`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}removedupes \`**`,`เลือกสิ่งที่จะนำออก`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}search \`**`,`ค้นหาก่อนเปิด`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}seek \`**`,`ข้าม`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}shuffle \`**`,`สลับ`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}skip \`**`,`ข้ามเพลงปัจจุบัน`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}stop \`**`,`หยุด`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}volume \`**`,`ความดังเสียง`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}connect \`**`,`เชื่อมต่อช่องเสียง`, true)
                .setFooter('K w a n')
                .setTimestamp()

            //  <= If want more add here
            let option1 = new MessageMenuOption()
                .setLabel('option1')
                .setEmoji('✨')
                .setValue('option1')
                .setDescription('this is option 1')
            let option2 = new MessageMenuOption()
                .setLabel('option2')
                .setEmoji('✨')
                .setValue('option2')
                .setDescription('this is option 2')
            let option3 = new MessageMenuOption()
                .setLabel('option3')
                .setEmoji('✨')
                .setValue('option3')
                .setDescription('this is option 3')
            let option4 = new MessageMenuOption()
                .setLabel('option4')
                .setEmoji('✨')
                .setValue('option4')
                .setDescription('this is option 4')
            let option5 = new MessageMenuOption()
                .setLabel('option5')
                .setEmoji('✨')
                .setValue('option5')
                .setDescription('this is option 5')

            let select = new MessageMenu()
                .setID('selector')
                .setPlaceholder('Click Me')
                .setMaxValues(1)
                .setMintValue(1)
                .addOption(option1, option2, option3, option4, option5)

            const Sendmenu = await message.channel.send(aboutbot, select)

            const filter = ( button ) => button.clicker.user.id === message.author.id

            let collector = Sendmenu.createMenuCollector(filter, { time : 180000})

            collector.on("collect" , (b) => {
                if (b.values[0] == "option1") {
                    Sendmenu.edit(aboutbot, select)
                }
                if (b.values[0] == "option2") {
                    Sendmenu.edit(discord_activity, select)
                }
                if (b.values[0] == "option3") {
                    Sendmenu.edit(image, select)
                }
                if (b.values[0] == "option4") {
                    Sendmenu.edit(tools, select)
                }
                if (b.values[0] == "option5") {
                    Sendmenu.edit(music, select)
                }

                b.reply.defer()
            })


            collector.on("end" , (b) => {
                Sendmenu.edit('end')
            })
            //-------------------buttons-------------------
            
            

        }
    }
}
